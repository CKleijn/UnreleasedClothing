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
const product_module_1 = __webpack_require__("./apps/uc-api/src/app/product/product.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/uc-db'), product_module_1.ProductModule],
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

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

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