import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entity/category.entity";
import { Repository } from "typeorm";
import { CategoryCreateDto } from "../dto/category.dto";

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async createCategory(
        categoryCreateDto: CategoryCreateDto,
    ): Promise<Category> {
        return this.categoryRepository.save(categoryCreateDto);
    }

    async findAllCategories(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findByCategoryName(categoryName: string): Promise<Category> {
        return this.categoryRepository.findOne({
            where: {
                name: categoryName,
            },
        });
    }

    async findByCategoryPath(categoryPath: string): Promise<Category> {
        return this.categoryRepository.findOne({
            where: {
                path: categoryPath,
            },
        });
    }
}
