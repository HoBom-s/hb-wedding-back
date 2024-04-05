import { Injectable } from "@nestjs/common";
import { CategoryCreateDto } from "../dto/category.dto";
import { Category } from "../entity/category.entity";
import { CategoryRepository } from "../repository/category.repository";
import { AlreadyExistCategoryError } from "../exceptions/AlreadyExistCategoryError";

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

    async findAllCategories(): Promise<Category[]> {
        return this.categoryRepository.findAllCategories();
    }
}
