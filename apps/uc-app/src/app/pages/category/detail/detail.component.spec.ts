import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { CategoryDetailComponent } from './detail.component';
import { CategoryService } from '../category.service';
import { AuthService } from '../../../auth/auth.service';
import { Category } from '../category.model';
import { Icon } from '../../../shared/icon/icon.model';
import { User } from '../../user/user.model';
import { ActivatedRoute, convertToParamMap, ParamMap, Router } from '@angular/router';


describe('CategoryDetailComponent', () => {
    let component: CategoryDetailComponent;
    let fixture: ComponentFixture<CategoryDetailComponent>;
    let fakeCategoryServiceMock: any;
    let fakeAuthServiceMock: any;
    let fakeActivatedRouteMock: any;
    let fakeRouterMock: any;
    let currentUser = new BehaviorSubject<User | undefined>(undefined);
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

    beforeEach(async () => {
        fakeCategoryServiceMock = {
            getCategoryById: jest.fn().mockReturnValue(of(category)),
            deleteCategory: jest.fn().mockReturnValue(of({
                status: 200,
                message: 'Category has been succesfully deleted!'
            }))
        }

        fakeAuthServiceMock = {
            currentUser$: currentUser
        }

        fakeActivatedRouteMock = {
            paramMap: of(convertToParamMap({ categoryId: '6391333037ceb01d296c5982' }))
        };

        fakeRouterMock = {
            ['navigate']: jest.fn()
        }

        await TestBed.configureTestingModule({
            declarations: [CategoryDetailComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: CategoryService, useValue: fakeCategoryServiceMock },
                { provide: AuthService, useValue: fakeAuthServiceMock },
                { provide: ActivatedRoute, useValue: fakeActivatedRouteMock },
                { provide: Router, useValue: fakeRouterMock },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('Should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('Should call categoryById', (done) => {
        component.ngOnInit();
        expect(component.categoryId).toEqual(category._id);
        expect(component.category).toEqual(category);
        expect(fakeCategoryServiceMock.getCategoryById).toBeCalled();
        expect(fakeCategoryServiceMock.getCategoryById).toBeTruthy();
        done();
    });

    it('Should call current user', (done) => {
        component.ngOnInit();
        expect(fakeAuthServiceMock.currentUser$).toBeTruthy();
        done();
    });

    it('Should delete category', (done) => {
        component.delete();
        expect(fakeCategoryServiceMock.deleteCategory).toBeCalled();
        expect(fakeCategoryServiceMock.deleteCategory).toBeTruthy();
        expect(fakeRouterMock.navigate).toBeCalled();
        expect(fakeRouterMock.navigate).toBeTruthy();
        done();
    });
})