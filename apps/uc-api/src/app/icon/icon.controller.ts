import { Controller, Get, Param } from "@nestjs/common";
import { Icon } from "./icon.schema";
import { IconService } from "./icon.service";

@Controller()
export class IconController {
    constructor(private readonly iconService: IconService) {}

    @Get('icons')
    async getIcons(): Promise<Icon[]> {
        return await this.iconService.getIcons();
    }

    @Get('icon/:iconId')
    async getIconById(@Param('iconId') iconId: string): Promise<Icon> {
        return await this.iconService.getIconById(iconId);
    }
}