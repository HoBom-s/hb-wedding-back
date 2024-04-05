import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entity/category.entity";
import { Repository } from "typeorm";
import { CategoryCreateDto } from "../dto/category-create.dto";
import { CategoryUpdateDto } from "../dto/category-update.dto";
import { CategoryDeleteDto } from "../dto/category-delete.dto";

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

    async updateCategory(
        categoryUpdateDto: CategoryUpdateDto,
    ): Promise<Category> {
        const found = await this.findByCategoryName(categoryUpdateDto.name);

        const updateCategory = {
            ...found,
            ...categoryUpdateDto,
        };

        await this.categoryRepository.update(
            {
                ...found,
            },
            {
                ...categoryUpdateDto,
            },
        );

        return updateCategory;
    }

    async deleteCategory(
        categoryDeleteDto: CategoryDeleteDto,
    ): Promise<Category> {
        const { id } = categoryDeleteDto;

        const found = await this.findByCategoryId(id);

        await this.categoryRepository.delete({
            id: id,
        });

        return found;
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

    async findByCategoryId(id: number): Promise<Category> {
        return this.categoryRepository.findOne({
            where: {
                id: id,
            },
        });
    }
}
