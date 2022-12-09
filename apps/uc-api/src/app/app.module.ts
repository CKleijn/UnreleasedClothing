import { Module } from '@nestjs/common';
import { environment } from '../environments/environment';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { ProductModule } from './product/product.module';
import { IconModule } from './icon/icon.module';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  imports: [MongooseModule.forRoot(environment.MONGO_DB), AuthModule, UserModule, ProductModule, CategoryModule, CommentModule, IconModule,
  // Neo4jModule.forRoot({
  //   scheme: 'bolt',
  //   host: '127.0.0.1',
  //   port: 7687,
  //   username: 'neo4j',
  //   password: 'password',
  // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
