import { Test, TestingModule } from '@nestjs/testing';
import { IconService } from "./icon.service";
import { IconController } from "./icon.controller";
import { Icon } from '../icon/icon.schema';
import mongoose from 'mongoose';

describe('IconController - Integration Tests', () => {
    let app: TestingModule;
    let iconController: IconController;
    let iconService: IconService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [IconController],
            providers: [{
                provide: IconService,
                useValue: {
                    getIcons: jest.fn(),
                    getIconById: jest.fn(),
                },
            }],
        }).compile();

        iconController = app.get<IconController>(IconController);
        iconService = app.get<IconService>(IconService);
    });

    describe('getIcons', () => {
        it('should call getIcons on the service', async () => {
            const exampleIcons: Icon[] = [{
                _id: new mongoose.Types.ObjectId('6348acd2e1a47ca32e79f46f'),
                title: "Jackets",
                icon: 'https://www.simplelaw.com/hubfs/Blog_Media/cdn2.hubspot.nethubfs5154887Blog_Mediaimage_not_found.png',
            }]

            const getIcons = jest.spyOn(iconService, 'getIcons')
                .mockImplementation(async () => exampleIcons);

            const results = await iconController.getIcons();

            expect(getIcons).toBeCalledTimes(1);
            expect(results).toHaveLength(1);
            expect(results[0]).toHaveProperty('_id', exampleIcons[0]._id);
            expect(results[0]).toHaveProperty('title', exampleIcons[0].title);
            expect(results[0]).toHaveProperty('icon', exampleIcons[0].icon);
        });
    });

    describe('getIconById', () => {
        it('should call getIconById on the service', async () => {
            const exampleIcons: Icon = {
                _id: new mongoose.Types.ObjectId('6348acd2e1a47ca32e79f46f'),
                title: "Jackets",
                icon: 'https://www.simplelaw.com/hubfs/Blog_Media/cdn2.hubspot.nethubfs5154887Blog_Mediaimage_not_found.png',
            }

            const getIconById = jest.spyOn(iconService, 'getIconById')
                .mockImplementation(async () => exampleIcons);

            const result = await iconController.getIconById('6348acd2e1a47ca32e79f46f');

            expect(getIconById).toBeCalledTimes(1);
            expect(result).toHaveProperty('_id', exampleIcons._id);
            expect(result).toHaveProperty('title', exampleIcons.title);
            expect(result).toHaveProperty('icon', exampleIcons.icon);
        });
    });
});