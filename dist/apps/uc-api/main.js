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
const product_module_1 = __webpack_require__("./apps/uc-api/src/app/product/product.module.ts");
const user_module_1 = __webpack_require__("./apps/uc-api/src/app/user/user.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/uc-db'), auth_module_1.AuthModule, user_module_1.UserModule, product_module_1.ProductModule, category_module_1.CategoryModule],
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
                signOptions: { expiresIn: '1h' },
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
                    return yield this.userService.registerUser(registerUserDto);
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
                const passwordValid = yield bcrypt.compare(password, user.password);
                if (user && passwordValid)
                    return user;
            }
            return null;
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

/***/ "./apps/uc-api/src/app/auth/strategies/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'S1e2C3r4E5t',
        });
    }
    validate(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { name: user.name, role: user.role };
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
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
            const user = yield this.authService.validate(username, password);
            if (!user)
                throw new common_1.UnauthorizedException({ message: "This user doesn't exists or your password is wrong!" });
            return user;
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
                return yield this.categoryService.getCategorieById(categoryId);
            }
            catch (error) {
                this.generateCategoryExceptions(error);
            }
        });
    }
    createCategory(categoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.categoryService.createCategory(categoryDto);
            }
            catch (error) {
                this.generateCategoryExceptions(error);
            }
        });
    }
    updateCategory(categoryId, newCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.categoryService.updateCategory(categoryId, newCategory);
            }
            catch (error) {
                this.generateCategoryExceptions(error);
            }
        });
    }
    deleteCategory(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.categoryService.deleteCategory(categoryId);
            }
            catch (error) {
                this.generateCategoryExceptions(error);
            }
        });
    }
    generateCategoryExceptions(error) {
        if (error.name === 'CastError')
            throw new common_1.HttpException('This ObjectId doesnt exists!', common_1.HttpStatus.NOT_FOUND);
        if (error.errors.title)
            throw new common_1.HttpException(error.errors.title.message, common_1.HttpStatus.CONFLICT);
        if (error.errors.description)
            throw new common_1.HttpException(error.errors.description.message, common_1.HttpStatus.CONFLICT);
        if (error.errors.icon)
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
    (0, common_1.Post)('category'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof category_dto_1.CategoryDto !== "undefined" && category_dto_1.CategoryDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CategoryController.prototype, "createCategory", null);
tslib_1.__decorate([
    (0, common_1.Put)('category/:categoryId'),
    tslib_1.__param(0, (0, common_1.Param)('categoryId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof Partial !== "undefined" && Partial) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CategoryController.prototype, "updateCategory", null);
tslib_1.__decorate([
    (0, common_1.Delete)('category/:categoryId'),
    tslib_1.__param(0, (0, common_1.Param)('categoryId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
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
const category_repository_1 = __webpack_require__("./apps/uc-api/src/app/category/category.repository.ts");
const category_schema_1 = __webpack_require__("./apps/uc-api/src/app/category/category.schema.ts");
const category_service_1 = __webpack_require__("./apps/uc-api/src/app/category/category.service.ts");
let CategoryModule = class CategoryModule {
};
CategoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema }])],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService, category_repository_1.CategoryRepository],
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
;


/***/ }),

/***/ "./apps/uc-api/src/app/category/category.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const category_schema_1 = __webpack_require__("./apps/uc-api/src/app/category/category.schema.ts");
let CategoryRepository = class CategoryRepository {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    getAllCategories() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.find();
        });
    }
    getCategoryById(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.findById({ _id: categoryId });
        });
    }
    createCategory(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.create(category);
        });
    }
    updateCategory(categoryId, newCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.findOneAndUpdate({ _id: categoryId }, newCategory, { new: true });
        });
    }
    deleteCategory(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.findOneAndDelete({ _id: categoryId });
        });
    }
};
CategoryRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;


/***/ }),

/***/ "./apps/uc-api/src/app/category/category.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategorySchema = exports.Category = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let Category = class Category {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Title is required!'],
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Description is required!'],
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Icon is required!'],
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "icon", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Category.prototype, "createdAt", void 0);
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
const category_repository_1 = __webpack_require__("./apps/uc-api/src/app/category/category.repository.ts");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    getAllCategories() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.getAllCategories();
        });
    }
    getCategorieById(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.getCategoryById(categoryId);
        });
    }
    createCategory(categoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.createCategory({
                title: categoryDto.title,
                description: categoryDto.description,
                icon: categoryDto.icon,
                createdAt: new Date()
            });
        });
    }
    updateCategory(categoryId, newCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.updateCategory(categoryId, newCategory);
        });
    }
    deleteCategory(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.deleteCategory(categoryId);
        });
    }
};
CategoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof category_repository_1.CategoryRepository !== "undefined" && category_repository_1.CategoryRepository) === "function" ? _a : Object])
], CategoryService);
exports.CategoryService = CategoryService;


/***/ }),

/***/ "./apps/uc-api/src/app/product/product.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
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
    createProduct(productDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productService.createProduct(productDto);
            }
            catch (error) {
                this.generateProductExceptions(error);
            }
        });
    }
    updateProduct(productId, newProduct) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productService.updateProduct(productId, newProduct);
            }
            catch (error) {
                this.generateProductExceptions(error);
            }
        });
    }
    deleteProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productService.deleteProduct(productId);
            }
            catch (error) {
                this.generateProductExceptions(error);
            }
        });
    }
    generateProductExceptions(error) {
        if (error.name === 'CastError')
            throw new common_1.HttpException('This ObjectId doesnt exists!', common_1.HttpStatus.NOT_FOUND);
        if (error.errors.name)
            throw new common_1.HttpException(error.errors.name.message, common_1.HttpStatus.CONFLICT);
        if (error.errors.picture)
            throw new common_1.HttpException(error.errors.picture.message, common_1.HttpStatus.CONFLICT);
        if (error.errors.price)
            throw new common_1.HttpException(error.errors.price.message, common_1.HttpStatus.CONFLICT);
        if (error.errors.description)
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
    (0, common_1.Post)('product'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof product_dto_1.ProductDto !== "undefined" && product_dto_1.ProductDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProductController.prototype, "createProduct", null);
tslib_1.__decorate([
    (0, common_1.Put)('product/:productId'),
    tslib_1.__param(0, (0, common_1.Param)('productId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof Partial !== "undefined" && Partial) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ProductController.prototype, "updateProduct", null);
tslib_1.__decorate([
    (0, common_1.Delete)('product/:productId'),
    tslib_1.__param(0, (0, common_1.Param)('productId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
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
const product_controller_1 = __webpack_require__("./apps/uc-api/src/app/product/product.controller.ts");
const product_repository_1 = __webpack_require__("./apps/uc-api/src/app/product/product.repository.ts");
const product_schema_1 = __webpack_require__("./apps/uc-api/src/app/product/product.schema.ts");
const product_service_1 = __webpack_require__("./apps/uc-api/src/app/product/product.service.ts");
let ProductModule = class ProductModule {
};
ProductModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }])],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, product_repository_1.ProductRepository],
    })
], ProductModule);
exports.ProductModule = ProductModule;
;


/***/ }),

/***/ "./apps/uc-api/src/app/product/product.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const product_schema_1 = __webpack_require__("./apps/uc-api/src/app/product/product.schema.ts");
let ProductRepository = class ProductRepository {
    constructor(productModel) {
        this.productModel = productModel;
    }
    getAllProducts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.find();
        });
    }
    getProductById(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.findById({ _id: productId });
        });
    }
    createProduct(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.create(product);
        });
    }
    updateProduct(productId, newProduct) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.findOneAndUpdate({ _id: productId }, newProduct, { new: true });
        });
    }
    deleteProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.findOneAndDelete({ _id: productId });
        });
    }
};
ProductRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ProductRepository);
exports.ProductRepository = ProductRepository;


/***/ }),

/***/ "./apps/uc-api/src/app/product/product.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchema = exports.Product = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let Product = class Product {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Name is required!'],
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Picture is required!'],
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "picture", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Price is required!'],
    }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "price", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Description is required!'],
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Product.prototype, "createdAt", void 0);
Product = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);


/***/ }),

/***/ "./apps/uc-api/src/app/product/product.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import { User } from "./user.schema";
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const product_repository_1 = __webpack_require__("./apps/uc-api/src/app/product/product.repository.ts");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    getAllProducts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getAllProducts();
        });
    }
    getProductById(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getProductById(productId);
        });
    }
    createProduct(productDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.createProduct({
                name: productDto.name,
                picture: productDto.picture,
                price: productDto.price,
                description: productDto.description,
                isActive: true,
                createdAt: new Date()
            });
        });
    }
    updateProduct(productId, newProduct) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.updateProduct(productId, newProduct);
        });
    }
    deleteProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.deleteProduct(productId);
        });
    }
};
ProductService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof product_repository_1.ProductRepository !== "undefined" && product_repository_1.ProductRepository) === "function" ? _a : Object])
], ProductService);
exports.ProductService = ProductService;


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
        this.picture;
        this.role = role;
        this.password = password;
    }
}
exports.RegisterUserDto = RegisterUserDto;


/***/ }),

/***/ "./apps/uc-api/src/app/user/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const auth_service_1 = __webpack_require__("./apps/uc-api/src/app/auth/auth.service.ts");
const loginUser_dto_1 = __webpack_require__("./apps/uc-api/src/app/user/dtos/loginUser.dto.ts");
const registerUser_dto_1 = __webpack_require__("./apps/uc-api/src/app/user/dtos/registerUser.dto.ts");
let UserController = class UserController {
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(Role.BRAND)
    constructor(authService) {
        this.authService = authService;
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
                return yield this.authService.register(registerUserDto);
            }
            catch (error) {
                this.generateUserExceptions(error);
            }
        });
    }
    generateUserExceptions(error) {
        var _a, _b, _c, _d, _e;
        if ((error === null || error === void 0 ? void 0 : error.response) === `This user doesn't exists or your password is wrong!`)
            throw new common_1.UnauthorizedException(error.response);
        if ((error === null || error === void 0 ? void 0 : error.response) === 'This user already exists!')
            throw new common_1.HttpException(error.response, common_1.HttpStatus.CONFLICT);
        if ((error === null || error === void 0 ? void 0 : error.response) === 'Password is required!')
            throw new common_1.HttpException(error.response, common_1.HttpStatus.CONFLICT);
        if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError')
            throw new common_1.HttpException('This ObjectId doesnt exists!', common_1.HttpStatus.NOT_FOUND);
        if ((_a = error === null || error === void 0 ? void 0 : error.errors) === null || _a === void 0 ? void 0 : _a.name)
            throw new common_1.HttpException(error.errors.name.message, common_1.HttpStatus.CONFLICT);
        if ((_b = error === null || error === void 0 ? void 0 : error.errors) === null || _b === void 0 ? void 0 : _b.emailAddress)
            throw new common_1.HttpException(error.errors.emailAddress.message, common_1.HttpStatus.CONFLICT);
        if ((_c = error === null || error === void 0 ? void 0 : error.errors) === null || _c === void 0 ? void 0 : _c.picture)
            throw new common_1.HttpException(error.errors.picture.message, common_1.HttpStatus.CONFLICT);
        if ((_d = error === null || error === void 0 ? void 0 : error.errors) === null || _d === void 0 ? void 0 : _d.role)
            throw new common_1.HttpException(error.errors.role.message, common_1.HttpStatus.CONFLICT);
        if ((_e = error === null || error === void 0 ? void 0 : error.errors) === null || _e === void 0 ? void 0 : _e.password)
            throw new common_1.HttpException(error.errors.password.message, common_1.HttpStatus.CONFLICT);
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof loginUser_dto_1.LoginUserDto !== "undefined" && loginUser_dto_1.LoginUserDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof registerUser_dto_1.RegisterUserDto !== "undefined" && registerUser_dto_1.RegisterUserDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
UserController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
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


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const role_enum_1 = __webpack_require__("./apps/uc-api/src/app/auth/roles/role.enum.ts");
let User = class User {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Name is required!'],
    }),
    tslib_1.__metadata("design:type", String)
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
    tslib_1.__metadata("design:type", String)
], User.prototype, "emailAddress", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Picture is required!'],
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "picture", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Role is required!'],
        enum: {
            values: [role_enum_1.Role.BRAND, role_enum_1.Role.CUSTOMER],
            message: 'Choose between a customer or a brand as role!'
        }
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Password is required!'],
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
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
    getUserByEmailAddress(emailAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ emailAddress });
        });
    }
    registerUser(registerUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = Object.assign(Object.assign({}, registerUserDto), { 'createdAt': new Date() });
            return yield this.userModel.create(user);
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
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
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