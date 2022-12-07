import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IconController } from "./icon.controller";
import { Icon, IconSchema } from "./icon.schema";
import { IconService } from "./icon.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Icon.name, schema: IconSchema }])],
    controllers: [IconController],
    providers: [IconService],
    exports: [IconService]
})

export class IconModule {};