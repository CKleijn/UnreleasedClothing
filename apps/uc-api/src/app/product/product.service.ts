import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CategoryService } from "../category/category.service";
import { Comment } from "../comment/comment.schema";
import { CommentDto } from "../comment/comment.dto";
import { UserService } from "../user/user.service";
import { ProductDto } from "./product.dto";
import { Product } from "./product.schema";
import { CategoryDto } from "../category/category.dto";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>, @Inject(forwardRef(() => CategoryService)) private categoryService: CategoryService, @Inject(forwardRef(() => UserService)) private userService: UserService) { }

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productModel.aggregate([
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
    }

    async getAllProductsFromBrand(brandId: string): Promise<Product[]> {
        return await this.productModel.find({ 'createdBy._id': brandId });
    }

    async getAllProductsFromCategory(categoryId: string): Promise<Product[]> {
        return await this.productModel.find({ 'category._id': categoryId });
    }

    async getAllComments(): Promise<Comment[]> {
        const comments = await this.productModel.aggregate([
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

        return comments[0]?.comments;
    }

    async getAllCommentsFromUser(userId: string): Promise<Comment[]> {
        const comments = await this.productModel.aggregate([
            {
                '$unwind': {
                    'path': '$comments'
                }
            }, {
                '$match': {
                    'comments.createdBy': new mongoose.Types.ObjectId(userId)
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

        return comments[0]?.comments;
    }

    async getAllCommentsFromProduct(productId: string): Promise<Comment[]> {
        const comments = await this.productModel.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(productId)
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
                    '_id': new mongoose.Types.ObjectId(productId),
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

        return comments[0]?.comments;
    }

    async getProductById(productId: string): Promise<Product> {
        const product = await this.productModel.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(productId)
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
            throw new HttpException(`This product doesn't exists!`, HttpStatus.NOT_FOUND)

        return product[0];
    }

    async getCommentById(productId: string, commentId: string): Promise<Comment> {
        const comment = await this.productModel.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(productId)
                }
            }, {
                '$unwind': {
                    'path': '$comments'
                }
            }, {
                '$match': {
                    'comments._id': new mongoose.Types.ObjectId(commentId)
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

        if (!comment[0]?.comments || !comment[0])
            throw new HttpException(`This comment doesn't exists!`, HttpStatus.NOT_FOUND)

        return comment[0].comments;
    }

    async calculateAdvice(productId: string): Promise<Object> {
        let advice: string;
        const avg = await this.productModel.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(productId)
                }
            }, {
                '$project': {
                    'avg': {
                        '$avg': '$comments.rating'
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'avg': {
                        '$round': [
                            '$avg', 2
                        ]
                    }
                }
            }
        ]);

        if(avg[0]?.avg > 8) {
            advice = 'The customers wants this product right now!'
        } else if(avg[0]?.avg > 5.1) {
            advice = 'Most of the customers wants this product on the market!'
        } else if(avg[0]?.avg > 3) {
            advice = `Most of the customers don't want this product on the market!`
        } else if(avg[0]?.avg > 1) {
            advice = `The customers don't want this product!`
        } else {
            advice = `No advice yet, because no comments!`
        }

        return {
            avg: avg[0].avg,
            advice
        };
    }

    async createProduct(user: any, productDto: ProductDto): Promise<void> {
        await this.productModel.create({
            _id: new mongoose.Types.ObjectId(),
            name: productDto.name,
            picture: productDto.picture,
            price: productDto.price,
            description: productDto.description,
            category: await this.categoryService.getCategoryById(productDto.category),
            comments: [],
            createdAt: new Date(),
            createdBy: await this.userService.getUserByEmailAddress(user.emailAddress)
        });
    }

    async addCommentToProduct(productId: string, newComment: Partial<CommentDto>): Promise<void> {
        await this.productModel.findOneAndUpdate({ _id: productId }, { $push: { comments: newComment } }, {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true
        });
    }

    async updateProduct(user: any, productId: string, newProduct: Partial<ProductDto>): Promise<void> {
        const product = await this.productModel.findById({ _id: productId })

        if (!user._id.equals(product.createdBy._id))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });

        if (product)
            product.name = newProduct?.name;
            product.picture = newProduct?.picture;
            product.price = newProduct?.price;
            product.description = newProduct?.description;
            product.category = await this.categoryService.getCategoryById(newProduct.category);

        await this.productModel.findOneAndUpdate({ _id: productId }, product, {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true
        });
    }

    async updateCategoryFromNestedProducts(newCategory: Partial<CategoryDto>, products: Product[]): Promise<void> {
        products.forEach(async product => {
            await this.productModel.findOneAndUpdate({ 'category._id': product.category._id },
                {
                    'category.title': newCategory?.title,
                    'category.description': newCategory?.description,
                    'category.icon': newCategory?.icon,
                }, {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true
            })
        });
    }

    async updateCommentFromProduct(user: any, productId: string, commentId: string, newComment: Partial<CommentDto>): Promise<void> {
        const oldComment = await this.getCommentById(productId, commentId);

        if (!user._id.equals(oldComment.createdBy._id))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });

        await this.productModel.findOneAndUpdate({ _id: productId, 'comments._id': new mongoose.Types.ObjectId(commentId) }, { $set: { 'comments.$.title': newComment?.title, 'comments.$.body': newComment?.body, 'comments.$.rating': newComment?.rating } }, {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true
        });
    }

    async deleteProduct(user: any, productId: string): Promise<void> {
        const product = await this.productModel.findById({ _id: productId })

        if (!user._id.equals(product.createdBy._id))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });

        await this.productModel.findOneAndDelete({ _id: productId });
    }

    async deleteCommentFromProduct(user: any, productId: string, commentId: string): Promise<void> {
        const comment = await this.getCommentById(productId, commentId);

        if (!user._id.equals(comment.createdBy._id))
            throw new UnauthorizedException({ message: `This user don't have access to this method!` });

        await this.productModel.findOneAndUpdate({ _id: productId, 'comments._id': new mongoose.Types.ObjectId(commentId) }, { $pull: { 'comments': { _id: new mongoose.Types.ObjectId(commentId) } } }, {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true
        });
    }
}