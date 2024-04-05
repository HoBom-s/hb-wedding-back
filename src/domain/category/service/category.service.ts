import { Injectable } from "@nestjs/common";
import { CategoryCreateDto } from "../dto/category-create.dto";
import { Category } from "../entity/category.entity";
import { CategoryRepository } from "../repository/category.repository";
import { AlreadyExistCategoryError } from "../exceptions/AlreadyExistCategoryError";
import { CategoryUpdateDto } from "../dto/category-update.dto";
import { CategoryDeleteDto } from "../dto/category-delete.dto";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async createCategory(
        categoryCreateDto: CategoryCreateDto,
    ): Promise<Category> {
        const [existName, existPath] = await Promise.all([
            this.categoryRepository.findByCategoryName(categoryCreateDto.name),
            this.categoryRepository.findByCategoryPath(categoryCreateDto.path),
        ]);

        if (existName || existPath) {
            throw new AlreadyExistCategoryError(
                "Cannot create category. CategoryService.class",
            );
        }

        const createdCategory =
            await this.categoryRepository.createCategory(categoryCreateDto);

        return createdCategory;
    }

    async updateCategory(
        categoryUpdateDto: CategoryUpdateDto,
    ): Promise<Category> {
        const updatedCategory =
            await this.categoryRepository.updateCategory(categoryUpdateDto);

        return updatedCategory;
    }

    async deleteCategory(
        categoryDeleteDto: CategoryDeleteDto,
    ): Promise<Category> {
        const deletedCategory =
            await this.categoryRepository.deleteCategory(categoryDeleteDto);

        return deletedCategory;
    }

    async findAllCategories(): Promise<Category[]> {
        return this.categoryRepository.findAllCategories();
    }
}
