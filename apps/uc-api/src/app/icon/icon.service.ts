import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Icon } from "./icon.schema";

@Injectable()
export class IconService {
    constructor(@InjectModel(Icon.name) private iconModel: Model<Icon>) {}

    async getIcons(): Promise<Icon[]> {
        return await this.iconModel.find({});
    }

    async getIconById(iconId: string): Promise<Icon> {
        return await this.iconModel.findById({ _id: iconId });
    }
}