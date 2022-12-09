import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../auth/auth.service';
import { CategoryComponent } from "./category.component";
import { CategoryService } from './category.service';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../user/user.model';
import { Category } from './category.model';
import { Icon } from '../../shared/icon/icon.model';

describe('CategoryListComponent', () => {
    let component: CategoryComponent;
    let fixture: ComponentFixture<CategoryComponent>;
    let fakeCategoryServiceMock: any;
    let fakeAuthServiceMock: any;
    let currentUser = new BehaviorSubject<User | undefined>(undefined);
    let categories: Category[] = [
        {
            _id: '6391333037ceb01d296c5982',
            title: 'Lorem1',
            description: 'Lorem ipsum1',
            icon: new Icon(),
            isActive: true,
            createdAt: new Date("2022-12-08T01:05:17.761Z"),
            createdBy: new User()
        },
        {
            _id: '6391333037ceb01d296c5236',
            title: 'Lorem2',
            description: 'Lorem ipsum2',
            icon: new Icon(),
            isActive: true,
            createdAt: new Date("2022-12-08T01:05:17.761Z"),
            createdBy: new User()
        }
    ]

    beforeEach(async () => {
        fakeCategoryServiceMock = {
            getCategories: jest.fn().mockReturnValue(of(categories))
        }

        fakeAuthServiceMock = {
            currentUser$: currentUser
        }

        await TestBed.configureTestingModule({
            declarations: [CategoryComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: CategoryService, useValue: fakeCategoryServiceMock },
                { provide: AuthService, useValue: fakeAuthServiceMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('Should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('Should call list of categories', (done) => {
        component.ngOnInit();
        component.categories$?.subscribe((c) => {
            expect(c).toEqual(categories);
            expect(c.length).toBe(2);
            done();
        })
        expect(fakeCategoryServiceMock.getCategories).toBeTruthy();
        expect(fakeCategoryServiceMock.getCategories).toBeCalled();
    });

    it('Should call current user', () => {
        component.ngOnInit();
        expect(fakeAuthServiceMock.currentUser$).toBeTruthy();
    });
})