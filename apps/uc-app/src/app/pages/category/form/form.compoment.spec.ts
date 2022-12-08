import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { CategoryService } from '../category.service';
import { AuthService } from '../../../auth/auth.service';
import { Category } from '../category.model';
import { Icon } from '../../../shared/icon/icon.model';
import { User } from '../../user/user.model';
import { ActivatedRoute, convertToParamMap, ParamMap, Router } from '@angular/router';
import { CategoryFormComponent } from './form.component';
import { FormsModule } from '@angular/forms';


describe('CategoryFormComponent', () => {
    let component: CategoryFormComponent;
    let fixture: ComponentFixture<CategoryFormComponent>;
    let fakeCategoryServiceMock: any;
    let fakeActivatedRouteMock: any;
    let fakeRouterMock: any;
    let category: Category =
    {
        _id: '6391333037ceb01d296c5982',
        title: 'Lorem1',
        description: 'Lorem ipsum1',
        icon: new Icon(),
        isActive: true,
        createdAt: new Date("2022-12-08T01:05:17.761Z"),
        createdBy: new User()
    }

    let icons: Icon[] = [
        {
            _id: '6391333037ceb01d296c5982',
            title: 'Lorem1',
            icon: 'url1',
        },
        {
            _id: '23523523kahfs98231js2124',
            title: 'Lorem2',
            icon: 'url2',
        },
    ]

    let createResponse: Object = {
        status: 201,
        message: 'Category has been succesfully created!'
    };

    let updateResponse: Object = {
        status: 200,
        message: 'Category has been succesfully updated!'
    };

    beforeEach(async () => {
        fakeCategoryServiceMock = {
            getCategoryById: jest.fn().mockReturnValue(of(category)),
            getIcons: jest.fn().mockReturnValue(of(icons)),
            createCategory: jest.fn().mockReturnValue(of(createResponse)),
            updateCategory: jest.fn().mockReturnValue(of(updateResponse)),
        }

        fakeActivatedRouteMock = {
            paramMap: of(convertToParamMap({ categoryId: '6391333037ceb01d296c5982' }))
        };

        fakeRouterMock = {
            ['navigate']: jest.fn()
        }

        await TestBed.configureTestingModule({
            declarations: [CategoryFormComponent],
            imports: [HttpClientTestingModule, FormsModule],
            providers: [
                { provide: CategoryService, useValue: fakeCategoryServiceMock },
                { provide: ActivatedRoute, useValue: fakeActivatedRouteMock },
                { provide: Router, useValue: fakeRouterMock },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('Should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('Should call categoryById', (done) => {
        component.ngOnInit();
        expect(fakeCategoryServiceMock.getCategoryById).toBeCalled();
        expect(fakeCategoryServiceMock.getCategoryById).toBeTruthy();
        done();
    });

    it('Should call getIcons', (done) => {
        component.ngOnInit();
        expect(fakeCategoryServiceMock.getIcons).toBeCalled();
        expect(fakeCategoryServiceMock.getIcons).toBeTruthy();
        done();
    });

    it('Should call createCategory', (done) => {
        component.categoryId = null;
        component.onSubmit();
        expect(fakeCategoryServiceMock.createCategory).toBeCalled();
        expect(fakeCategoryServiceMock.createCategory).toBeTruthy();
        expect(fakeRouterMock.navigate).toBeCalled();
        expect(fakeRouterMock.navigate).toBeTruthy();
        done();
    });

    it('Should call updateCategory', (done) => {
        component.categoryId = '6391333037ceb01d296c5982';
        component.onSubmit();
        expect(fakeCategoryServiceMock.updateCategory).toBeCalled();
        expect(fakeCategoryServiceMock.updateCategory).toBeTruthy();
        expect(fakeRouterMock.navigate).toBeCalled();
        expect(fakeRouterMock.navigate).toBeTruthy();
        done();
    });
})