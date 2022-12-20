import request = require('supertest');
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { disconnect } from "mongoose";
import { AuthModule } from './app/auth/auth.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UserModule } from './app/user/user.module';
import { CategoryModule } from './app/category/category.module';
import { CommentModule } from './app/comment/comment.module';
import { ProductModule } from './app/product/product.module';
import { IconModule } from './app/icon/icon.module';
import { Neo4jModule } from './app/neo4j/neo4j.module';
import { RegisterUserDto } from './app/user/dtos/registerUser.dto';
import { Role } from './app/auth/roles/role.enum';
import { LoginUserDto } from './app/user/dtos/loginUser.dto';
import { ProductDto } from './app/product/product.dto';
import { CategoryDto } from './app/category/category.dto';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                return { uri };
            },
        }),
        AuthModule,
        UserModule,
        ProductModule,
        CategoryModule,
        CommentModule,
        IconModule,
        Neo4jModule.forRoot({
            scheme: 'bolt',
            host: '127.0.0.1',
            port: 7687,
            username: 'neo4j',
            password: 'password',
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }

describe('end-to-end tests of data API', () => {
    let app: INestApplication;
    let server;
    let module: TestingModule;
    let mongoc: MongoClient;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        mongoc = new MongoClient(uri);
        await mongoc.connect();

        server = app.getHttpServer();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('products').deleteMany({});
        await mongoc.db('test').collection('categories').deleteMany({});
        await mongoc.db('test').collection('icons').deleteMany({});
        await mongoc.db('test').collection('ratings').deleteMany({});
        await mongoc.db('test').collection('users').deleteMany({});
        await mongoc.db('test').collection('icons').insertOne({
            title: 'Jackets',
            icon: 'https://cdn-icons-png.flaticon.com/512/1926/1926409.png'
        })
    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    let customerLoginCredentials: LoginUserDto;
    let customerRegisterCredentials: RegisterUserDto;
    let brandLoginCredentials: LoginUserDto;
    let brandRegisterCredentials: RegisterUserDto;
    let productCredentials: ProductDto;

    beforeEach(() => {
        customerLoginCredentials = {
            username: 'test@test.nl',
            password: 'password',
        };

        customerRegisterCredentials = {
            name: 'Test',
            age: 1,
            emailAddress: 'test@test.nl',
            picture: 'test_picture',
            role: Role.CUSTOMER,
            password: 'password',
        };

        brandLoginCredentials = {
            username: 'test2@test.nl',
            password: 'password',
        };

        brandRegisterCredentials = {
            name: 'Test2',
            age: 2,
            emailAddress: 'test2@test.nl',
            picture: 'test_picture',
            role: Role.BRAND,
            password: 'password',
        };
    });

    it('customer registers and logs in', async () => {
        const register = await request(server)
            .post('/user/register')
            .send(customerRegisterCredentials);

        expect(register.status).toEqual(201);
        expect(register.body.status).toEqual(201);
        expect(register.body.message).toEqual('User has been successfully registered!');

        const login = await request(server)
            .post('/user/login')
            .send(customerLoginCredentials);

        expect(login.status).toEqual(201);
        expect(login.body.message).toEqual('You are successfully logged in!');
        expect(login.body).toHaveProperty('jwt_token');
    });

    it('first customer registers, logs in, and there are no products yet', async () => {
        const register = await request(server)
            .post('/user/register')
            .send(customerRegisterCredentials);

        expect(register.status).toEqual(201);
        expect(register.body.status).toEqual(201);
        expect(register.body.message).toEqual('User has been successfully registered!');

        const login = await request(server)
            .post('/user/login')
            .send(customerLoginCredentials);

        expect(login.status).toEqual(201);
        expect(login.body.message).toEqual('You are successfully logged in!');
        expect(login.body).toHaveProperty('jwt_token');

        const token = login.body.jwt_token;

        const products = await request(server)
            .get('/products')

        expect(products.status).toBe(200);
        expect(products.body).toEqual([]);
    });

    it('first brand registers, logs in, creates his first category', async () => {
        const register = await request(server)
            .post('/user/register')
            .send(brandRegisterCredentials);

        expect(register.status).toEqual(201);
        expect(register.body.status).toEqual(201);
        expect(register.body.message).toEqual('User has been successfully registered!');

        const login = await request(server)
            .post('/user/login')
            .send(brandLoginCredentials);

        expect(login.status).toEqual(201);
        expect(login.body.message).toEqual('You are successfully logged in!');
        expect(login.body).toHaveProperty('jwt_token');

        const token = login.body.jwt_token;

        const icons = await request(server)
            .get('/icons')

        const iconId = icons.body[0]._id;

        const categoryCredentials: CategoryDto = {
            title: 'Category1',
            description: 'Lorem ipsum',
            icon: iconId,
            isActive: true
        }

        const category = await request(server)
            .post('/category')
            .set('Authorization', 'bearer ' + token)
            .send(categoryCredentials);

        const categories = await request(server)
            .get('/categories')

        expect(categories.status).toEqual(200);
        expect(categories.body[0]).toHaveProperty('_id');
        expect(categories.body[0]).toHaveProperty('title');
        expect(categories.body[0]).toHaveProperty('description');
        expect(categories.body[0]).toHaveProperty('icon');
        expect(categories.body[0]).toHaveProperty('isActive');
        expect(categories.body[0]).toHaveProperty('createdBy');
        expect(categories.body[0].title).toEqual('Category1');
        expect(categories.body[0].description).toEqual('Lorem ipsum');
        expect(categories.body[0].icon).toEqual(icons.body[0]);
        expect(categories.body[0].isActive).toEqual(true)
    });

    it('first brand registers, logs in, creates his first category and creates his first product', async () => {
        const register = await request(server)
            .post('/user/register')
            .send(brandRegisterCredentials);

        expect(register.status).toEqual(201);
        expect(register.body.status).toEqual(201);
        expect(register.body.message).toEqual('User has been successfully registered!');

        const login = await request(server)
            .post('/user/login')
            .send(brandLoginCredentials);

        expect(login.status).toEqual(201);
        expect(login.body.message).toEqual('You are successfully logged in!');
        expect(login.body).toHaveProperty('jwt_token');

        const token = login.body.jwt_token;

        const icons = await request(server)
            .get('/icons')

        const iconId = icons.body[0]._id;

        const categoryCredentials: CategoryDto = {
            title: 'Category1',
            description: 'Lorem ipsum',
            icon: iconId,
            isActive: true
        }

        const category = await request(server)
            .post('/category')
            .set('Authorization', 'bearer ' + token)
            .send(categoryCredentials);

        const categories = await request(server)
            .get('/categories')

        const categoryId = categories.body[0]._id;

        productCredentials = {
            name: 'Product1',
            picture: 'product1_picture',
            price: 99,
            description: 'Lorem ipsum',
            category: categoryId,
            comments: null
        }

        const product = await request(server)
            .post('/product')
            .set('Authorization', 'bearer ' + token)
            .send(productCredentials)

        expect(product.status).toEqual(201);
        expect(product.body.status).toEqual(201);
        expect(product.body.message).toEqual('Product has been successfully created!');
    });

    it('first brand registers, logs in, creates his first category and creates his first product and update afterwards', async () => {
        const register = await request(server)
            .post('/user/register')
            .send(brandRegisterCredentials);

        expect(register.status).toEqual(201);
        expect(register.body.status).toEqual(201);
        expect(register.body.message).toEqual('User has been successfully registered!');

        const login = await request(server)
            .post('/user/login')
            .send(brandLoginCredentials);

        expect(login.status).toEqual(201);
        expect(login.body.message).toEqual('You are successfully logged in!');
        expect(login.body).toHaveProperty('jwt_token');

        const token = login.body.jwt_token;

        const icons = await request(server)
            .get('/icons')

        const iconId = icons.body[0]._id;

        const categoryCredentials: CategoryDto = {
            title: 'Category1',
            description: 'Lorem ipsum',
            icon: iconId,
            isActive: true
        }

        const category = await request(server)
            .post('/category')
            .set('Authorization', 'bearer ' + token)
            .send(categoryCredentials);

        const categories = await request(server)
            .get('/categories')

        const categoryId = categories.body[0]._id;

        productCredentials = {
            name: 'Product1',
            picture: 'product1_picture',
            price: 99,
            description: 'Lorem ipsum',
            category: categoryId,
            comments: null
        }

        const product = await request(server)
            .post('/product')
            .set('Authorization', 'bearer ' + token)
            .send(productCredentials)

        const products = await request(server)
            .get('/products')

        const productId = products.body[0]._id;

        productCredentials.price = 22;

        const updatedProduct = await request(server)
            .put('/product/' + productId)
            .set('Authorization', 'bearer ' + token)
            .send(productCredentials)

        expect(updatedProduct.status).toEqual(200);
        expect(updatedProduct.body.status).toEqual(200);
        expect(updatedProduct.body.message).toEqual('Product has been successfully updated!');
    });

    it('first brand registers, logs in, creates his first category and creates his first product and delete afterwards', async () => {
        const register = await request(server)
            .post('/user/register')
            .send(brandRegisterCredentials);

        expect(register.status).toEqual(201);
        expect(register.body.status).toEqual(201);
        expect(register.body.message).toEqual('User has been successfully registered!');

        const login = await request(server)
            .post('/user/login')
            .send(brandLoginCredentials);

        expect(login.status).toEqual(201);
        expect(login.body.message).toEqual('You are successfully logged in!');
        expect(login.body).toHaveProperty('jwt_token');

        const token = login.body.jwt_token;

        const icons = await request(server)
            .get('/icons')

        const iconId = icons.body[0]._id;

        const categoryCredentials: CategoryDto = {
            title: 'Category1',
            description: 'Lorem ipsum',
            icon: iconId,
            isActive: true
        }

        const category = await request(server)
            .post('/category')
            .set('Authorization', 'bearer ' + token)
            .send(categoryCredentials);

        const categories = await request(server)
            .get('/categories')

        const categoryId = categories.body[0]._id;

        productCredentials = {
            name: 'Product1',
            picture: 'product1_picture',
            price: 99,
            description: 'Lorem ipsum',
            category: categoryId,
            comments: null
        }

        const product = await request(server)
            .post('/product')
            .set('Authorization', 'bearer ' + token)
            .send(productCredentials)

        const products = await request(server)
            .get('/products')

        const productId = products.body[0]._id;

        const deleteProduct = await request(server)
            .delete('/product/' + productId)
            .set('Authorization', 'bearer ' + token)

        expect(deleteProduct.status).toEqual(200);
        expect(deleteProduct.body.status).toEqual(200);
        expect(deleteProduct.body.message).toEqual('Product has been successfully deleted!');
    });
});
