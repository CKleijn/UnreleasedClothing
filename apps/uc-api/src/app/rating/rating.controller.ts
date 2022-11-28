import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { Rating } from "./rating.schema";
import { RatingService } from "./rating.service";

@Controller()
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Get('ratings')
    async getAllRatings(): Promise<Rating[]> {
        return await this.ratingService.getAllRatings();
    }

    @Get('rating/:ratingId')
    async getRatingById(@Param('ratingId') ratingId: string): Promise<Rating> {
        try {
            return await this.ratingService.getRatingById(ratingId);
        } catch (error) {
            if(error?.response)
                throw new HttpException(`This rating doesn't exists!`, HttpStatus.NOT_FOUND)
        }
    }
}