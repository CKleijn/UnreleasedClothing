import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RatingController } from "./rating.controller";
import { Rating, RatingSchema } from "./rating.schema";
import { RatingService } from "./rating.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }])],
    controllers: [RatingController],
    providers: [RatingService],
    exports: [RatingService]
})

export class RatingModule {};