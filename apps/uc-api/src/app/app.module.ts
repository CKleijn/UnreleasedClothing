import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/uc-db'), AuthModule, UserModule, ProductModule, CategoryModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
