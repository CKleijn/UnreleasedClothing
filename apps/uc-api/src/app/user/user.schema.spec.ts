import { Test } from '@nestjs/testing';
import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User, UserSchema } from "./user.schema";
import { Role } from '../auth/roles/role.enum';

describe('User schema - Unit tests', () => {
  let mongod: MongoMemoryServer;
  let userModel: Model<User>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return {uri};
          },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
      ],
    }).compile();

    userModel = app.get<Model<User>>(getModelToken(User.name));

    await userModel.ensureIndexes();
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('has a required name', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.name).toBeInstanceOf(Error);
  });

  it('has a required age', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.age).toBeInstanceOf(Error);
  });

  it('has a required email address', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.emailAddress).toBeInstanceOf(Error);
  });

  it('has a invalid email address', async () => {
    const original = new userModel({emailAddress: 'henk'});

    const err = original.validateSync();
    
    expect(err.errors.emailAddress).toBeInstanceOf(Error);
  });

  it('has a valid email address', async () => {
    const original = new userModel({emailAddress: 'henk@gmail.com'});

    const err = original.validateSync();
    
    expect(err.errors.emailAddress).toBe(undefined)
  });

  it('has a default picture', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(model.picture).toBe('https://cdn-icons-png.flaticon.com/512/149/149071.png')
  });

  it('has a required role', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.role).toBeInstanceOf(Error);
  });

  it('has a invalid role', async () => {
    const original = new userModel({role: 'INVALID'});

    const err = original.validateSync();
    
    expect(err.errors.role).toBeInstanceOf(Error);
  });

  it('has a valid role', async () => {
    const original = new userModel({role: Role.BRAND});

    const err = original.validateSync();

    expect(err.errors.role).toBe(undefined);
  });

  it('has an empty following list by default', () => {
    const model = new userModel();

    expect(model.following).toStrictEqual([]);
  });

  it('has a required password', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.password).toBeInstanceOf(Error);
  });

  it('has a createdAt without required', () => {
    const model = new userModel();

    const err = model.validateSync();

    expect(err.errors.createdAt).toBe(undefined)
  });
});