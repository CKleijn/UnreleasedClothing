import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { ProductModule } from './product/product.module';
import { IconModule } from './icon/icon.module';
import { environment } from '../environments/environment';


@Module({
  imports: [MongooseModule.forRoot(environment.MONGO_DB), AuthModule, UserModule, ProductModule, CategoryModule, CommentModule, IconModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
