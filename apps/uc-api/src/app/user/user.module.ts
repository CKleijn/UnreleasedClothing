import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport"
import { AuthModule } from "../auth/auth.module";
import { Neo4jModule } from "../neo4j/neo4j.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), forwardRef(() => AuthModule), PassportModule, JwtModule.register({
        secret: 'S1e2C3r4E5t',
        signOptions: { expiresIn: '7d' },
    })],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { };