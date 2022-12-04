/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/uc-api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/uc-api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/uc-api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const app_controller_1 = __webpack_require__("./apps/uc-api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/uc-api/src/app/app.service.ts");
const auth_module_1 = __webpack_require__("./apps/uc-api/src/app/auth/auth.module.ts");
const category_module_1 = __webpack_require__("./apps/uc-api/src/app/category/category.module.ts");
const comment_module_1 = __webpack_require__("./apps/uc-api/src/app/comment/comment.module.ts");
const product_module_1 = __webpack_require__("./apps/uc-api/src/app/product/product.module.ts");
const rating_module_1 = __webpack_require__("./apps/uc-api/src/app/rating/rating.module.ts");
const user_module_1 = __webpack_require__("./apps/uc-api/src/app/user/user.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/uc-db'), auth_module_1.AuthModule, user_module_1.UserModule, product_module_1.ProductModule, category_module_1.CategoryModule, comment_module_1.CommentModule, rating_module_1.RatingModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/uc-api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to uc-api!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/uc-api/src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const passport_1 = __webpack_require__("@nestjs/passport");
const user_module_1 = __webpack_require__("./apps/uc-api/src/app/user/user.module.ts");
const user_schema_1 = __webpack_require__("./apps/uc-api/src/app/user/user.schema.ts");
const auth_service_1 = __webpack_require__("./apps/uc-api/src/app/auth/auth.service.ts");
const jwt_strategy_1 = __webpack_require__("./apps/uc-api/src/app/auth/strategies/jwt.strategy.ts");
const local_strategy_1 = __webpack_require__("./apps/uc-api/src/app/auth/strategies/local.strategy.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]), (0, common_1.forwardRef)(() => user_module_1.UserModule), passport_1.PassportModule, jwt_1.JwtModule.register({
                secret: 'S1e2C3r4E5t',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/uc-api/src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const user_service_1 = __webpack_require__("./apps/uc-api/src/app/user/user.service.ts");
const bcrypt = __webpack_require__("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    login(loginUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.jwtService.signAsync({ name: loginUserDto.username });
        });
    }
    register(registerUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmailAddress(registerUserDto.emailAddress);
            if (!user) {
                if (registerUserDto.password !== undefined) {
                    registerUserDto.password = yield bcrypt.hash(registerUserDto.password, 10);
                    yield this.userService.registerUser(registerUserDto);
                }
                else {
                    throw new common_1.HttpException('Password is required!', common_1.HttpStatus.CONFLICT);
                }
            }
            else {
                throw new common_1.HttpException('This user already exists!', common_1.HttpStatus.CONFLICT);
            }
        });
    }
    validate(emailAddress, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmailAddress(emailAddress);
            if (user) {
                const passwordValid = yield bcrypt.compare(password, user.password.toString());
                if (!passwordValid)
                    throw new common_1.HttpException({ message: `This password isn't correct!` }, common_1.HttpStatus.CONFLICT);
                return user;
            }
            throw new common_1.HttpException({ message: `This user doesn't exists!` }, common_1.HttpStatus.NOT_FOUND);
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/uc-api/src/app/auth/roles/role.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["CUSTOMER"] = "customer";
    Role["BRAND"] = "brand";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./apps/uc-api/src/app/auth/roles/roles.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const Roles = (role) => (0, common_1.SetMetadata)('role', role);
exports.Roles = Roles;


/***/ }),

/***/ "./apps/uc-api/src/app/auth/roles/roles.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requireRole = this.reflector.getAllAndOverride('role', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requireRole)
            return true;
        const { user } = context.switchToHttp().getRequest();
        return requireRole === (user === null || user === void 0 ? void 0 : user.role);
    }
};
RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),

/***/ "./apps/uc-api/src/app/auth/strategies/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const user_service_1 = __webpack_require__("./apps/uc-api/src/app/user/user.service.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'S1e2C3r4E5t',
        });
        this.userService = userService;
    }
    validate(loginUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmailAddress(loginUser.name);
            return {
                _id: user._id,
                name: user.name,
                emailAddress: user.emailAddress,
                role: user.role
            };
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./apps/uc-api/src/app/auth/strategies/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_local_1 = __webpack_require__("passport-local");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/uc-api/src/app/auth/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    validate(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.validate(username, password);
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./apps/uc-api/src/app/category/category.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const role_enum_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/role.enum.ts");
const roles_decorator_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/roles.decorator.ts");
const roles_guard_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/roles.guard.ts");
const category_dto_1 = __webpack_require__("./apps/uc-api/src/app/category/category.dto.ts");
const category_service_1 = __webpack_require__("./apps/uc-api/src/app/category/category.service.ts");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getAllCategories() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryService.getAllCategories();
        });
    }
    getCategoryById(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.categoryService.getCategoryById(categoryId);
            }
            catch (error) {
                this.generateCategoryExceptions(error);
            }
        });
    }
    createCategory(req, categoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.categoryService.createCategory(req.user, categoryDto);
                return {
                    status: 201,
                    message: 'Category has been succesfully created!'
                };
            }
            catch (error) {
                this.generateCategoryExceptions(error);
            }
        });
    }
    updateCategory(req, categoryId, newCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.categoryService.updateCategory(req.user, categoryId, newCategory);
                return {
                    status: 200,
                    message: 'Category has been succesfully updated!'
                };
            }
            catch (error) {
                this.generateCategoryExceptions(error);
            }
        });
    }
    deleteCategory(req, categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.categoryService.deleteCategory(req.user, categoryId);
                return {
                    status: 200,
                    message: 'Category has been succesfully deleted!'
                };
            }
            catch (error) {
                this.generateCategoryExceptions(error);
            }
        });
    }
    generateCategoryExceptions(error) {
        var _a, _b, _c, _d, _e;
        if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError')
            throw new common_1.HttpException(`This category doesn't exists!`, common_1.HttpStatus.NOT_FOUND);
        if ((error === null || error === void 0 ? void 0 : error.response) === 'This category title already exists!')
            throw new common_1.HttpException('This category title already exists!', common_1.HttpStatus.CONFLICT);
        if ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.message)
            throw new common_1.UnauthorizedException((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.message);
        if ((_c = error === null || error === void 0 ? void 0 : error.errors) === null || _c === void 0 ? void 0 : _c.title)
            throw new common_1.HttpException(error.errors.title.message, common_1.HttpStatus.CONFLICT);
        if ((_d = error === null || error === void 0 ? void 0 : error.errors) === null || _d === void 0 ? void 0 : _d.description)
            throw new common_1.HttpException(error.errors.description.message, common_1.HttpStatus.CONFLICT);
        if ((_e = error === null || error === void 0 ? void 0 : error.errors) === null || _e === void 0 ? void 0 : _e.icon)
            throw new common_1.HttpException(error.errors.icon.message, common_1.HttpStatus.CONFLICT);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('categories'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CategoryController.prototype, "getAllCategories", null);
tslib_1.__decorate([
    (0, common_1.Get)('category/:categoryId'),
    tslib_1.__param(0, (0, common_1.Param)('categoryId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CategoryController.prototype, "getCategoryById", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.BRAND),
    (0, common_1.Post)('category'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_d = typeof category_dto_1.CategoryDto !== "undefined" && category_dto_1.CategoryDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CategoryController.prototype, "createCategory", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.BRAND),
    (0, common_1.Put)('category/:categoryId'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('categoryId')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, typeof (_f = typeof Partial !== "undefined" && Partial) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CategoryController.prototype, "updateCategory", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.BRAND),
    (0, common_1.Delete)('category/:categoryId'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('categoryId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CategoryController.prototype, "deleteCategory", null);
CategoryController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" ? _a : Object])
], CategoryController);
exports.CategoryController = CategoryController;


/***/ }),

/***/ "./apps/uc-api/src/app/category/category.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryDto = void 0;
class CategoryDto {
}
exports.CategoryDto = CategoryDto;


/***/ }),

/***/ "./apps/uc-api/src/app/category/category.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const category_controller_1 = __webpack_require__("./apps/uc-api/src/app/category/category.controller.ts");
const category_schema_1 = __webpack_require__("./apps/uc-api/src/app/category/category.schema.ts");
const category_service_1 = __webpack_require__("./apps/uc-api/src/app/category/category.service.ts");
let CategoryModule = class CategoryModule {
};
CategoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema }])],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService],
        exports: [category_service_1.CategoryService]
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
;


/***/ }),

/***/ "./apps/uc-api/src/app/category/category.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategorySchema = exports.Category = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Category = class Category {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Title is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof String !== "undefined" && String) === "function" ? _a : Object)
], Category.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Description is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof String !== "undefined" && String) === "function" ? _b : Object)
], Category.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Icon is required!'],
        default: 'https://www.simplelaw.com/hubfs/Blog_Media/cdn2.hubspot.nethubfs5154887Blog_Mediaimage_not_found.png'
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof String !== "undefined" && String) === "function" ? _c : Object)
], Category.prototype, "icon", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Category.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User'
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof mongoose_2.ObjectId !== "undefined" && mongoose_2.ObjectId) === "function" ? _e : Object)
], Category.prototype, "createdBy", void 0);
Category = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Category);
exports.Category = Category;
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(Category);


/***/ }),

/***/ "./apps/uc-api/src/app/category/category.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const category_schema_1 = __webpack_require__("./apps/uc-api/src/app/category/category.schema.ts");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    getAllCategories() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.find({}).populate('createdBy');
        });
    }
    getCategoryById(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findById({ _id: new mongoose_2.default.Types.ObjectId(categoryId) }).populate('createdBy');
            if (!category)
                throw new common_1.HttpException(`This category doesn't exists!`, common_1.HttpStatus.NOT_FOUND);
            return category;
        });
    }
    createCategory(user, categoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const uniqueCategory = yield this.categoryModel.findOne({ title: categoryDto.title });
            if (uniqueCategory)
                throw new common_1.HttpException('This category title already exists!', common_1.HttpStatus.CONFLICT);
            yield this.categoryModel.create(Object.assign(Object.assign({}, categoryDto), { createdAt: new Date(), createdBy: user._id }));
        });
    }
    updateCategory(user, categoryId, newCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findById({ _id: categoryId });
            const uniqueCategory = yield this.categoryModel.findOne({ title: newCategory === null || newCategory === void 0 ? void 0 : newCategory.title });
            if (!user._id.equals(category.createdBy))
                throw new common_1.UnauthorizedException({ message: `This user don't have access to this method!` });
            if (uniqueCategory && (newCategory === null || newCategory === void 0 ? void 0 : newCategory.title) !== category.title)
                throw new common_1.HttpException('This category title already exists!', common_1.HttpStatus.CONFLICT);
            yield this.categoryModel.findOneAndUpdate({ _id: categoryId }, newCategory, {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true
            });
        });
    }
    deleteCategory(user, categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findById({ _id: categoryId });
            if (!user._id.equals(category.createdBy))
                throw new common_1.UnauthorizedException({ message: `This user don't have access to this method!` });
            yield this.categoryModel.findOneAndDelete({ _id: categoryId });
        });
    }
};
CategoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CategoryService);
exports.CategoryService = CategoryService;


/***/ }),

/***/ "./apps/uc-api/src/app/comment/comment.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const role_enum_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/role.enum.ts");
const roles_decorator_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/roles.decorator.ts");
const roles_guard_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/roles.guard.ts");
const comment_dto_1 = __webpack_require__("./apps/uc-api/src/app/comment/comment.dto.ts");
const comment_service_1 = __webpack_require__("./apps/uc-api/src/app/comment/comment.service.ts");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    getAllComments() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.getAllComments();
        });
    }
    getAllCommentsFromUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.getAllCommentsFromUser(userId);
        });
    }
    getAllCommentsFromProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.commentService.getAllCommentsFromProduct(productId);
        });
    }
    getCommentById(productId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.commentService.getCommentById(productId, commentId);
            }
            catch (error) {
                this.generateCommentExceptions(error);
            }
        });
    }
    createComment(req, productId, commentDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.commentService.createComment(req.user, productId, commentDto);
                return {
                    status: 201,
                    message: 'Comment has been succesfully created!'
                };
            }
            catch (error) {
                this.generateCommentExceptions(error);
            }
        });
    }
    updateComment(req, productId, commentId, newComment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.commentService.updateComment(req.user, productId, commentId, newComment);
                return {
                    status: 200,
                    message: 'Comment has been succesfully updated!'
                };
            }
            catch (error) {
                this.generateCommentExceptions(error);
            }
        });
    }
    deleteComment(req, productId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.commentService.deleteComment(req.user, productId, commentId);
                return {
                    status: 200,
                    message: 'Comment has been succesfully deleted!'
                };
            }
            catch (error) {
                this.generateCommentExceptions(error);
            }
        });
    }
    generateCommentExceptions(error) {
        var _a, _b, _c, _d, _e;
        if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError')
            throw new common_1.HttpException(`This comment doesn't exists!`, common_1.HttpStatus.NOT_FOUND);
        if ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.message)
            throw new common_1.UnauthorizedException((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.message);
        if ((_c = error === null || error === void 0 ? void 0 : error.errors) === null || _c === void 0 ? void 0 : _c.title)
            throw new common_1.HttpException(error.errors.title.message, common_1.HttpStatus.CONFLICT);
        if ((_d = error === null || error === void 0 ? void 0 : error.errors) === null || _d === void 0 ? void 0 : _d.body)
            throw new common_1.HttpException(error.errors.body.message, common_1.HttpStatus.CONFLICT);
        if ((_e = error === null || error === void 0 ? void 0 : error.errors) === null || _e === void 0 ? void 0 : _e.rating)
            throw new common_1.HttpException(error.errors.rating.message, common_1.HttpStatus.CONFLICT);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('comments'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CommentController.prototype, "getAllComments", null);
tslib_1.__decorate([
    (0, common_1.Get)('comments/:userId'),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CommentController.prototype, "getAllCommentsFromUser", null);
tslib_1.__decorate([
    (0, common_1.Get)('product/:productId/comments'),
    tslib_1.__param(0, (0, common_1.Param)('productId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CommentController.prototype, "getAllCommentsFromProduct", null);
tslib_1.__decorate([
    (0, common_1.Get)('product/:productId/comment/:commentId'),
    tslib_1.__param(0, (0, common_1.Param)('productId')),
    tslib_1.__param(1, (0, common_1.Param)('commentId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CommentController.prototype, "getCommentById", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.CUSTOMER),
    (0, common_1.Post)('product/:productId/comment'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('productId')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, typeof (_f = typeof comment_dto_1.CommentDto !== "undefined" && comment_dto_1.CommentDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CommentController.prototype, "createComment", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.CUSTOMER),
    (0, common_1.Put)('product/:productId/comment/:commentId'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('productId')),
    tslib_1.__param(2, (0, common_1.Param)('commentId')),
    tslib_1.__param(3, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String, typeof (_h = typeof Partial !== "undefined" && Partial) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], CommentController.prototype, "updateComment", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.CUSTOMER),
    (0, common_1.Delete)('product/:productId/comment/:commentId'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('productId')),
    tslib_1.__param(2, (0, common_1.Param)('commentId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], CommentController.prototype, "deleteComment", null);
CommentController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof comment_service_1.CommentService !== "undefined" && comment_service_1.CommentService) === "function" ? _a : Object])
], CommentController);
exports.CommentController = CommentController;


/***/ }),

/***/ "./apps/uc-api/src/app/comment/comment.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentDto = void 0;
class CommentDto {
}
exports.CommentDto = CommentDto;


/***/ }),

/***/ "./apps/uc-api/src/app/comment/comment.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const product_module_1 = __webpack_require__("./apps/uc-api/src/app/product/product.module.ts");
const rating_module_1 = __webpack_require__("./apps/uc-api/src/app/rating/rating.module.ts");
const comment_controller_1 = __webpack_require__("./apps/uc-api/src/app/comment/comment.controller.ts");
const comment_service_1 = __webpack_require__("./apps/uc-api/src/app/comment/comment.service.ts");
let CommentModule = class CommentModule {
};
CommentModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [product_module_1.ProductModule, rating_module_1.RatingModule],
        controllers: [comment_controller_1.CommentController],
        providers: [comment_service_1.CommentService],
        exports: [comment_service_1.CommentService]
    })
], CommentModule);
exports.CommentModule = CommentModule;
;


/***/ }),

/***/ "./apps/uc-api/src/app/comment/comment.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const product_service_1 = __webpack_require__("./apps/uc-api/src/app/product/product.service.ts");
const rating_service_1 = __webpack_require__("./apps/uc-api/src/app/rating/rating.service.ts");
let CommentService = class CommentService {
    constructor(ratingService, productService) {
        this.ratingService = ratingService;
        this.productService = productService;
    }
    getAllComments() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.getAllComments();
        });
    }
    getAllCommentsFromUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.getAllCommentsFromUser(userId);
        });
    }
    getAllCommentsFromProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.getAllCommentsFromProduct(productId);
        });
    }
    getCommentById(productId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.getCommentById(productId, commentId);
        });
    }
    createComment(user, productId, commentDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const comment = {
                _id: new mongoose_1.default.Types.ObjectId(),
                title: commentDto.title,
                body: commentDto.body,
                rating: yield this.ratingService.getRatingById(commentDto.rating.toString()),
                createdBy: user._id,
                createdAt: new Date()
            };
            yield this.productService.addCommentToProduct(productId, comment);
        });
    }
    updateComment(user, productId, commentId, newComment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (newComment === null || newComment === void 0 ? void 0 : newComment.rating)
                newComment.rating = yield this.ratingService.getRatingById(newComment.rating.toString());
            yield this.productService.updateCommentFromProduct(user, productId, commentId, newComment);
        });
    }
    deleteComment(user, productId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.deleteCommentFromProduct(user, productId, commentId);
        });
    }
};
CommentService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof rating_service_1.RatingService !== "undefined" && rating_service_1.RatingService) === "function" ? _a : Object, typeof (_b = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _b : Object])
], CommentService);
exports.CommentService = CommentService;


/***/ }),

/***/ "./apps/uc-api/src/app/product/product.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const role_enum_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/role.enum.ts");
const roles_decorator_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/roles.decorator.ts");
const roles_guard_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/roles.guard.ts");
const product_dto_1 = __webpack_require__("./apps/uc-api/src/app/product/product.dto.ts");
const product_service_1 = __webpack_require__("./apps/uc-api/src/app/product/product.service.ts");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAllProducts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productService.getAllProducts();
        });
    }
    getProductById(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productService.getProductById(productId);
            }
            catch (error) {
                this.generateProductExceptions(error);
            }
        });
    }
    createProduct(req, productDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productService.createProduct(req.user, productDto);
                return {
                    status: 201,
                    message: 'Product has been successfully created!'
                };
            }
            catch (error) {
                this.generateProductExceptions(error);
            }
        });
    }
    updateProduct(req, productId, newProduct) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productService.updateProduct(req.user, productId, newProduct);
                return {
                    status: 200,
                    message: 'Product has been successfully updated!'
                };
            }
            catch (error) {
                this.generateProductExceptions(error);
            }
        });
    }
    deleteProduct(req, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productService.deleteProduct(req.user, productId);
                return {
                    status: 200,
                    message: 'Product has been successfully deleted!'
                };
            }
            catch (error) {
                this.generateProductExceptions(error);
            }
        });
    }
    generateProductExceptions(error) {
        var _a, _b, _c, _d, _e, _f;
        if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError')
            throw new common_1.HttpException(`This product doesn't exists!`, common_1.HttpStatus.NOT_FOUND);
        if ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.message)
            throw new common_1.UnauthorizedException((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.message);
        if ((_c = error === null || error === void 0 ? void 0 : error.errors) === null || _c === void 0 ? void 0 : _c.name)
            throw new common_1.HttpException(error.errors.name.message, common_1.HttpStatus.CONFLICT);
        if ((_d = error === null || error === void 0 ? void 0 : error.errors) === null || _d === void 0 ? void 0 : _d.picture)
            throw new common_1.HttpException(error.errors.picture.message, common_1.HttpStatus.CONFLICT);
        if ((_e = error === null || error === void 0 ? void 0 : error.errors) === null || _e === void 0 ? void 0 : _e.price)
            throw new common_1.HttpException(error.errors.price.message, common_1.HttpStatus.CONFLICT);
        if ((_f = error === null || error === void 0 ? void 0 : error.errors) === null || _f === void 0 ? void 0 : _f.description)
            throw new common_1.HttpException(error.errors.description.message, common_1.HttpStatus.CONFLICT);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('products'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ProductController.prototype, "getAllProducts", null);
tslib_1.__decorate([
    (0, common_1.Get)('product/:productId'),
    tslib_1.__param(0, (0, common_1.Param)('productId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProductController.prototype, "getProductById", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.BRAND),
    (0, common_1.Post)('product'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_d = typeof product_dto_1.ProductDto !== "undefined" && product_dto_1.ProductDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProductController.prototype, "createProduct", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.BRAND),
    (0, common_1.Put)('product/:productId'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('productId')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, typeof (_f = typeof Partial !== "undefined" && Partial) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ProductController.prototype, "updateProduct", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.BRAND),
    (0, common_1.Delete)('product/:productId'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('productId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ProductController.prototype, "deleteProduct", null);
ProductController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);
exports.ProductController = ProductController;


/***/ }),

/***/ "./apps/uc-api/src/app/product/product.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductDto = void 0;
class ProductDto {
}
exports.ProductDto = ProductDto;


/***/ }),

/***/ "./apps/uc-api/src/app/product/product.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const category_module_1 = __webpack_require__("./apps/uc-api/src/app/category/category.module.ts");
const rating_module_1 = __webpack_require__("./apps/uc-api/src/app/rating/rating.module.ts");
const user_module_1 = __webpack_require__("./apps/uc-api/src/app/user/user.module.ts");
const product_controller_1 = __webpack_require__("./apps/uc-api/src/app/product/product.controller.ts");
const product_schema_1 = __webpack_require__("./apps/uc-api/src/app/product/product.schema.ts");
const product_service_1 = __webpack_require__("./apps/uc-api/src/app/product/product.service.ts");
let ProductModule = class ProductModule {
};
ProductModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]), (0, common_1.forwardRef)(() => user_module_1.UserModule), category_module_1.CategoryModule, rating_module_1.RatingModule],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
        exports: [product_service_1.ProductService]
    })
], ProductModule);
exports.ProductModule = ProductModule;
;


/***/ }),

/***/ "./apps/uc-api/src/app/product/product.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchema = exports.Product = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const category_schema_1 = __webpack_require__("./apps/uc-api/src/app/category/category.schema.ts");
const user_schema_1 = __webpack_require__("./apps/uc-api/src/app/user/user.schema.ts");
let Product = class Product {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Name is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof String !== "undefined" && String) === "function" ? _a : Object)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Picture is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof String !== "undefined" && String) === "function" ? _b : Object)
], Product.prototype, "picture", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Price is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Number !== "undefined" && Number) === "function" ? _c : Object)
], Product.prototype, "price", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Description is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof String !== "undefined" && String) === "function" ? _d : Object)
], Product.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof category_schema_1.Category !== "undefined" && category_schema_1.Category) === "function" ? _e : Object)
], Product.prototype, "category", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof Boolean !== "undefined" && Boolean) === "function" ? _f : Object)
], Product.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_g = typeof user_schema_1.User !== "undefined" && user_schema_1.User) === "function" ? _g : Object)
], Product.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], Product.prototype, "createdAt", void 0);
Product = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);


/***/ }),

/***/ "./apps/uc-api/src/app/product/product.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const category_service_1 = __webpack_require__("./apps/uc-api/src/app/category/category.service.ts");
const user_service_1 = __webpack_require__("./apps/uc-api/src/app/user/user.service.ts");
const product_schema_1 = __webpack_require__("./apps/uc-api/src/app/product/product.schema.ts");
let ProductService = class ProductService {
    constructor(productModel, categoryService, userService) {
        this.productModel = productModel;
        this.categoryService = categoryService;
        this.userService = userService;
    }
    getAllProducts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.aggregate([
                {
                    '$unwind': {
                        'path': '$comments',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'category.createdBy',
                        'foreignField': '_id',
                        'as': 'category.createdBy'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'comments.createdBy',
                        'foreignField': '_id',
                        'as': 'comment.createdBy'
                    }
                }, {
                    '$set': {
                        'category.createdBy': {
                            '$first': '$category.createdBy'
                        },
                        'comments.createdBy': {
                            '$first': '$comment.createdBy'
                        }
                    }
                }, {
                    '$group': {
                        '_id': '$_id',
                        'name': {
                            '$first': '$name'
                        },
                        'picture': {
                            '$first': '$picture'
                        },
                        'price': {
                            '$first': '$price'
                        },
                        'description': {
                            '$first': '$description'
                        },
                        'category': {
                            '$first': '$category'
                        },
                        'comments': {
                            '$push': '$comments'
                        },
                        'isActive': {
                            '$first': '$isActive'
                        },
                        'createdBy': {
                            '$first': '$createdBy'
                        },
                        'createdAt': {
                            '$first': '$createdAt'
                        },
                        '__v': {
                            '$first': '$__v'
                        }
                    }
                }, {
                    '$sort': {
                        'createdAt': -1
                    }
                }
            ]);
            return products;
        });
    }
    getAllComments() {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const comments = yield this.productModel.aggregate([
                {
                    '$unwind': {
                        'path': '$comments'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'comments.createdBy',
                        'foreignField': '_id',
                        'as': 'comment.createdBy'
                    }
                }, {
                    '$set': {
                        'comments.createdBy': {
                            '$first': '$comment.createdBy'
                        }
                    }
                }, {
                    '$group': {
                        '_id': '$_id',
                        'comments': {
                            '$push': '$comments'
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0,
                        'comments': 1
                    }
                }
            ]);
            return (_a = comments[0]) === null || _a === void 0 ? void 0 : _a.comments;
        });
    }
    getAllCommentsFromUser(userId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const comments = yield this.productModel.aggregate([
                {
                    '$unwind': {
                        'path': '$comments'
                    }
                }, {
                    '$match': {
                        'comments.createdBy': new mongoose_2.default.Types.ObjectId(userId)
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'comments.createdBy',
                        'foreignField': '_id',
                        'as': 'comment.createdBy'
                    }
                }, {
                    '$set': {
                        'comments.createdBy': {
                            '$first': '$comment.createdBy'
                        }
                    }
                }, {
                    '$group': {
                        '_id': '$_id',
                        'comments': {
                            '$push': '$comments'
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0,
                        'comments': 1
                    }
                }
            ]);
            return (_a = comments[0]) === null || _a === void 0 ? void 0 : _a.comments;
        });
    }
    getAllCommentsFromProduct(productId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const comments = yield this.productModel.aggregate([
                {
                    '$match': {
                        '_id': new mongoose_2.default.Types.ObjectId(productId)
                    }
                }, {
                    '$unwind': {
                        'path': '$comments'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'comments.createdBy',
                        'foreignField': '_id',
                        'as': 'comment.createdBy'
                    }
                }, {
                    '$set': {
                        'comments.createdBy': {
                            '$first': '$comment.createdBy'
                        }
                    }
                }, {
                    '$group': {
                        '_id': new mongoose_2.default.Types.ObjectId(productId),
                        'comments': {
                            '$push': '$comments'
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0,
                        'comments': 1
                    }
                }
            ]);
            return (_a = comments[0]) === null || _a === void 0 ? void 0 : _a.comments;
        });
    }
    getProductById(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.aggregate([
                {
                    '$match': {
                        '_id': new mongoose_2.default.Types.ObjectId(productId)
                    }
                },
                {
                    '$unwind': {
                        'path': '$comments',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'category.createdBy',
                        'foreignField': '_id',
                        'as': 'category.createdBy'
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'comments.createdBy',
                        'foreignField': '_id',
                        'as': 'comment.createdBy'
                    }
                }, {
                    '$set': {
                        'category.createdBy': {
                            '$first': '$category.createdBy'
                        },
                        'comments.createdBy': {
                            '$first': '$comment.createdBy'
                        }
                    }
                }, {
                    '$group': {
                        '_id': '$_id',
                        'name': {
                            $first: '$name'
                        },
                        'picture': {
                            $first: '$picture'
                        },
                        'price': {
                            $first: '$price'
                        },
                        'description': {
                            $first: '$description'
                        },
                        'category': {
                            $first: '$category'
                        },
                        'comments': {
                            '$push': '$comments'
                        },
                        'isActive': {
                            $first: '$isActive'
                        },
                        'createdBy': {
                            $first: '$createdBy'
                        },
                        'createdAt': {
                            $first: '$createdAt'
                        },
                        '__v': {
                            $first: '$__v'
                        }
                    }
                }
            ]);
            if (!product[0])
                throw new common_1.HttpException(`This product doesn't exists!`, common_1.HttpStatus.NOT_FOUND);
            return product[0];
        });
    }
    getCommentById(productId, commentId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const comment = yield this.productModel.aggregate([
                {
                    '$match': {
                        '_id': new mongoose_2.default.Types.ObjectId(productId)
                    }
                }, {
                    '$unwind': {
                        'path': '$comments'
                    }
                }, {
                    '$match': {
                        'comments._id': new mongoose_2.default.Types.ObjectId(commentId)
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'comments.createdBy',
                        'foreignField': '_id',
                        'as': 'comment.createdBy'
                    }
                }, {
                    '$set': {
                        'comments.createdBy': {
                            '$first': '$comment.createdBy'
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0,
                        'comments': 1
                    }
                }
            ]);
            if (!((_a = comment[0]) === null || _a === void 0 ? void 0 : _a.comments) || !comment[0])
                throw new common_1.HttpException(`This comment doesn't exists!`, common_1.HttpStatus.NOT_FOUND);
            return comment[0].comments;
        });
    }
    createProduct(user, productDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.productModel.create({
                name: productDto.name,
                picture: productDto.picture,
                price: productDto.price,
                description: productDto.description,
                category: yield this.categoryService.getCategoryById(productDto.category),
                comments: [],
                isActive: true,
                createdAt: new Date(),
                createdBy: yield this.userService.getUserByEmailAddress(user.emailAddress)
            });
        });
    }
    addCommentToProduct(productId, newComment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.productModel.findOneAndUpdate({ _id: productId }, { $push: { comments: newComment } }, {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true
            });
        });
    }
    updateProduct(user, productId, newProduct) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findById({ _id: productId });
            if (!user._id.equals(product.createdBy._id))
                throw new common_1.UnauthorizedException({ message: `This user don't have access to this method!` });
            if (product)
                product.name = newProduct === null || newProduct === void 0 ? void 0 : newProduct.name;
            product.picture = newProduct === null || newProduct === void 0 ? void 0 : newProduct.picture;
            product.price = newProduct === null || newProduct === void 0 ? void 0 : newProduct.price;
            product.description = newProduct === null || newProduct === void 0 ? void 0 : newProduct.description;
            product.category = yield this.categoryService.getCategoryById(newProduct.category);
            yield this.productModel.findOneAndUpdate({ _id: productId }, product, {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true
            });
        });
    }
    updateCommentFromProduct(user, productId, commentId, newComment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldComment = yield this.getCommentById(productId, commentId);
            if (!user._id.equals(oldComment.createdBy._id))
                throw new common_1.UnauthorizedException({ message: `This user don't have access to this method!` });
            yield this.productModel.findOneAndUpdate({ _id: productId, 'comments._id': new mongoose_2.default.Types.ObjectId(commentId) }, { $set: { 'comments.$.title': newComment === null || newComment === void 0 ? void 0 : newComment.title, 'comments.$.body': newComment === null || newComment === void 0 ? void 0 : newComment.body, 'comments.$.rating': newComment === null || newComment === void 0 ? void 0 : newComment.rating } }, {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true
            });
        });
    }
    deleteProduct(user, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findById({ _id: productId });
            if (!user._id.equals(product.createdBy._id))
                throw new common_1.UnauthorizedException({ message: `This user don't have access to this method!` });
            yield this.productModel.findOneAndDelete({ _id: productId });
        });
    }
    deleteCommentFromProduct(user, productId, commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const comment = yield this.getCommentById(productId, commentId);
            if (!user._id.equals(comment.createdBy._id))
                throw new common_1.UnauthorizedException({ message: `This user don't have access to this method!` });
            yield this.productModel.findOneAndUpdate({ _id: productId, 'comments._id': new mongoose_2.default.Types.ObjectId(commentId) }, { $pull: { 'comments': { _id: new mongoose_2.default.Types.ObjectId(commentId) } } }, {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true
            });
        });
    }
};
ProductService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" ? _b : Object, typeof (_c = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _c : Object])
], ProductService);
exports.ProductService = ProductService;


/***/ }),

/***/ "./apps/uc-api/src/app/rating/rating.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const rating_service_1 = __webpack_require__("./apps/uc-api/src/app/rating/rating.service.ts");
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    getAllRatings() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.ratingService.getAllRatings();
        });
    }
    getRatingById(ratingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ratingService.getRatingById(ratingId);
            }
            catch (error) {
                if (error === null || error === void 0 ? void 0 : error.response)
                    throw new common_1.HttpException(`This rating doesn't exists!`, common_1.HttpStatus.NOT_FOUND);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('ratings'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], RatingController.prototype, "getAllRatings", null);
tslib_1.__decorate([
    (0, common_1.Get)('rating/:ratingId'),
    tslib_1.__param(0, (0, common_1.Param)('ratingId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], RatingController.prototype, "getRatingById", null);
RatingController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof rating_service_1.RatingService !== "undefined" && rating_service_1.RatingService) === "function" ? _a : Object])
], RatingController);
exports.RatingController = RatingController;


/***/ }),

/***/ "./apps/uc-api/src/app/rating/rating.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const rating_controller_1 = __webpack_require__("./apps/uc-api/src/app/rating/rating.controller.ts");
const rating_schema_1 = __webpack_require__("./apps/uc-api/src/app/rating/rating.schema.ts");
const rating_service_1 = __webpack_require__("./apps/uc-api/src/app/rating/rating.service.ts");
let RatingModule = class RatingModule {
};
RatingModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: rating_schema_1.Rating.name, schema: rating_schema_1.RatingSchema }])],
        controllers: [rating_controller_1.RatingController],
        providers: [rating_service_1.RatingService],
        exports: [rating_service_1.RatingService]
    })
], RatingModule);
exports.RatingModule = RatingModule;
;


/***/ }),

/***/ "./apps/uc-api/src/app/rating/rating.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingSchema = exports.Rating = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Rating = class Rating {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.ObjectId !== "undefined" && mongoose_2.ObjectId) === "function" ? _a : Object)
], Rating.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Title is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof String !== "undefined" && String) === "function" ? _b : Object)
], Rating.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Picture is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof String !== "undefined" && String) === "function" ? _c : Object)
], Rating.prototype, "picture", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Mark is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Number !== "undefined" && Number) === "function" ? _d : Object)
], Rating.prototype, "grade", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Description is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof String !== "undefined" && String) === "function" ? _e : Object)
], Rating.prototype, "description", void 0);
Rating = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Rating);
exports.Rating = Rating;
exports.RatingSchema = mongoose_1.SchemaFactory.createForClass(Rating);


/***/ }),

/***/ "./apps/uc-api/src/app/rating/rating.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const rating_schema_1 = __webpack_require__("./apps/uc-api/src/app/rating/rating.schema.ts");
let RatingService = class RatingService {
    constructor(ratingModel) {
        this.ratingModel = ratingModel;
    }
    getAllRatings() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.ratingModel.find();
        });
    }
    getRatingById(ratingId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rating = yield this.ratingModel.findById({ _id: ratingId });
            if (!rating)
                throw new common_1.HttpException(`This rating doesn't exists!`, common_1.HttpStatus.NOT_FOUND);
            return rating;
        });
    }
};
RatingService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(rating_schema_1.Rating.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], RatingService);
exports.RatingService = RatingService;


/***/ }),

/***/ "./apps/uc-api/src/app/user/dtos/loginUser.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUserDto = void 0;
class LoginUserDto {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
exports.LoginUserDto = LoginUserDto;


/***/ }),

/***/ "./apps/uc-api/src/app/user/dtos/registerUser.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterUserDto = void 0;
class RegisterUserDto {
    constructor(name, emailAddress, picture, role, password) {
        this.name = name;
        this.emailAddress = emailAddress;
        this.picture = picture;
        this.role = role;
        this.password = password;
    }
}
exports.RegisterUserDto = RegisterUserDto;


/***/ }),

/***/ "./apps/uc-api/src/app/user/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const auth_service_1 = __webpack_require__("./apps/uc-api/src/app/auth/auth.service.ts");
const role_enum_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/role.enum.ts");
const roles_decorator_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/roles.decorator.ts");
const roles_guard_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/roles.guard.ts");
const loginUser_dto_1 = __webpack_require__("./apps/uc-api/src/app/user/dtos/loginUser.dto.ts");
const registerUser_dto_1 = __webpack_require__("./apps/uc-api/src/app/user/dtos/registerUser.dto.ts");
const user_service_1 = __webpack_require__("./apps/uc-api/src/app/user/user.service.ts");
let UserController = class UserController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    login(loginUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.authService.login(loginUserDto);
                return {
                    'message': 'You are successfully logged in!',
                    'jwt_token': token
                };
            }
            catch (error) {
                this.generateUserExceptions(error);
            }
        });
    }
    register(registerUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authService.register(registerUserDto);
                return {
                    status: 201,
                    message: 'User has been successfully registered!'
                };
            }
            catch (error) {
                this.generateUserExceptions(error);
            }
        });
    }
    getProfile(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getUserByEmailAddress(req.user.emailAddress);
        });
    }
    getUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userService.getUserById(userId);
            }
            catch (error) {
                this.generateUserExceptions(error);
            }
        });
    }
    followUser(req, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.followUser(req.user.emailAddress, userId);
                return {
                    status: 200,
                    message: 'User has been successfully followed!'
                };
            }
            catch (error) {
                this.generateUserExceptions(error);
            }
        });
    }
    unfollowUser(req, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.unfollowUser(req.user.emailAddress, userId);
                return {
                    status: 200,
                    message: 'User has been successfully unfollowed!'
                };
            }
            catch (error) {
                this.generateUserExceptions(error);
            }
        });
    }
    generateUserExceptions(error) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError')
            throw new common_1.HttpException(`This user doesn't exists!`, common_1.HttpStatus.NOT_FOUND);
        if ((error === null || error === void 0 ? void 0 : error.response) === 'This user already exists!')
            throw new common_1.HttpException(`This user already exists!`, common_1.HttpStatus.CONFLICT);
        if (((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.message) === `You don't follow this customer!`)
            throw new common_1.HttpException(`You don't follow this customer!`, common_1.HttpStatus.CONFLICT);
        if (((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.message) === `You can only follow other customers!`)
            throw new common_1.HttpException(`You can only follow other customers!`, common_1.HttpStatus.BAD_REQUEST);
        if (((_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.message) === `You already follow this customer!`)
            throw new common_1.HttpException(`You already follow this customer!`, common_1.HttpStatus.BAD_REQUEST);
        if ((_d = error === null || error === void 0 ? void 0 : error.errors) === null || _d === void 0 ? void 0 : _d.name)
            throw new common_1.HttpException(error.errors.name.message, common_1.HttpStatus.CONFLICT);
        if ((_e = error === null || error === void 0 ? void 0 : error.errors) === null || _e === void 0 ? void 0 : _e.emailAddress)
            throw new common_1.HttpException(error.errors.emailAddress.message, common_1.HttpStatus.CONFLICT);
        if ((_f = error === null || error === void 0 ? void 0 : error.errors) === null || _f === void 0 ? void 0 : _f.picture)
            throw new common_1.HttpException(error.errors.picture.message, common_1.HttpStatus.CONFLICT);
        if ((_g = error === null || error === void 0 ? void 0 : error.errors) === null || _g === void 0 ? void 0 : _g.role)
            throw new common_1.HttpException(error.errors.role.message, common_1.HttpStatus.CONFLICT);
        if ((_h = error === null || error === void 0 ? void 0 : error.errors) === null || _h === void 0 ? void 0 : _h.password)
            throw new common_1.HttpException(error.errors.password.message, common_1.HttpStatus.CONFLICT);
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof loginUser_dto_1.LoginUserDto !== "undefined" && loginUser_dto_1.LoginUserDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof registerUser_dto_1.RegisterUserDto !== "undefined" && registerUser_dto_1.RegisterUserDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('profile'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserController.prototype, "getProfile", null);
tslib_1.__decorate([
    (0, common_1.Get)(':userId'),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "getUser", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.CUSTOMER),
    (0, common_1.Post)(':userId/follow'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UserController.prototype, "followUser", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.CUSTOMER),
    (0, common_1.Post)(':userId/unfollow'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Param)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserController.prototype, "unfollowUser", null);
UserController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./apps/uc-api/src/app/user/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_controller_1 = __webpack_require__("./apps/uc-api/src/app/user/user.controller.ts");
const user_schema_1 = __webpack_require__("./apps/uc-api/src/app/user/user.schema.ts");
const user_service_1 = __webpack_require__("./apps/uc-api/src/app/user/user.service.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const auth_module_1 = __webpack_require__("./apps/uc-api/src/app/auth/auth.module.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]), (0, common_1.forwardRef)(() => auth_module_1.AuthModule), passport_1.PassportModule, jwt_1.JwtModule.register({
                secret: 'S1e2C3r4E5t',
                signOptions: { expiresIn: '1h' },
            })],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
;


/***/ }),

/***/ "./apps/uc-api/src/app/user/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const role_enum_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/role.enum.ts");
let User = class User {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.ObjectId !== "undefined" && mongoose_2.ObjectId) === "function" ? _a : Object)
], User.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Name is required!'],
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof String !== "undefined" && String) === "function" ? _b : Object)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Emailaddress is required!'],
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Use a correct emailaddress like j.doe@gmail.com!',
        },
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof String !== "undefined" && String) === "function" ? _c : Object)
], User.prototype, "emailAddress", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Picture is required!'],
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    }),
    tslib_1.__metadata("design:type", typeof (_d = typeof String !== "undefined" && String) === "function" ? _d : Object)
], User.prototype, "picture", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User'
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "following", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Role is required!'],
        enum: {
            values: [role_enum_1.Role.BRAND, role_enum_1.Role.CUSTOMER],
            message: 'Choose between a customer or a brand as role!'
        }
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof String !== "undefined" && String) === "function" ? _e : Object)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Password is required!'],
        min: [8, 'Password needs atleast 8 characters!']
    }),
    tslib_1.__metadata("design:type", typeof (_f = typeof String !== "undefined" && String) === "function" ? _f : Object)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: true
    }),
    tslib_1.__metadata("design:type", typeof (_g = typeof Boolean !== "undefined" && Boolean) === "function" ? _g : Object)
], User.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], User.prototype, "createdAt", void 0);
User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./apps/uc-api/src/app/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const user_schema_1 = __webpack_require__("./apps/uc-api/src/app/user/user.schema.ts");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getUserById(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ _id: userId }).populate('following');
            if (!user)
                throw new common_1.HttpException({ message: `This user doesn't exists!` }, common_1.HttpStatus.NOT_FOUND);
            return user;
        });
    }
    getUserByEmailAddress(emailAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ emailAddress }).populate('following');
        });
    }
    registerUser(registerUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.create(Object.assign(Object.assign({ _id: new mongoose_2.default.Types.ObjectId() }, registerUserDto), { createdAt: new Date() }));
        });
    }
    followUser(emailAddress, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentUser = yield this.getUserByEmailAddress(emailAddress);
            const followUser = yield this.getUserById(userId);
            const followedUser = yield this.userModel.aggregate([
                {
                    '$unwind': {
                        'path': '$following'
                    }
                }, {
                    '$match': {
                        'following': userId
                    }
                }
            ]);
            if (followUser.role === 'customer') {
                if (followedUser.length === 0) {
                    return yield this.userModel.findOneAndUpdate({ emailAddress }, { $push: { following: new mongoose_2.default.Types.ObjectId(userId) } });
                }
                else {
                    throw new common_1.HttpException({ message: `You already follow this customer!` }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException({ message: `You can only follow other customers!` }, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    unfollowUser(emailAddress, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentUser = yield this.getUserByEmailAddress(emailAddress);
            const followUser = yield this.getUserById(userId);
            const followedUser = yield this.userModel.aggregate([
                {
                    '$unwind': {
                        'path': '$following'
                    }
                }, {
                    '$match': {
                        'following': userId
                    }
                }
            ]);
            if (followedUser.length > 0)
                return yield this.userModel.findOneAndUpdate({ emailAddress }, { $pull: { following: new mongoose_2.default.Types.ObjectId(userId) } });
            throw new common_1.HttpException({ message: `You don't follow this customer!` }, common_1.HttpStatus.CONFLICT);
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/uc-api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map