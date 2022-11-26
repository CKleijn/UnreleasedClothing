import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rating } from "./rating.schema";

@Injectable()
export class RatingService {
    constructor(@InjectModel(Rating.name) private ratingModel: Model<Rating>) {}

    async getAllRatings(): Promise<Rating[]> {
        return await this.ratingModel.find();
    }

    async getRatingById(ratingId: string): Promise<Rating> {
        const rating = await this.ratingModel.findById({ _id: ratingId });

        if(!rating)
            throw new HttpException('This rating doesnt exists!', HttpStatus.NOT_FOUND)

        return rating;
    }
}