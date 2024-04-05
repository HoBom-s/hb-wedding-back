import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseFilters,
} from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryCreateDto } from "../dto/category-create.dto";
import { Category } from "../entity/category.entity";
import { HttpExceptionFilter } from "src/global/filters/http-exception.filter";
import { CategoryUpdateDto } from "../dto/category-update.dto";
import { CategoryDeleteDto } from "../dto/category-delete.dto";

@Controller("api/v1/category")
@UseFilters(HttpExceptionFilter)
@ApiTags("Category API")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiOperation({
        summary: "Category create",
        description: "You can create category.",
    })
    @ApiBody({ type: CategoryCreateDto })
    @ApiResponse({ status: HttpStatus.CREATED, type: Category })
    async createCategory(@Body() categoryCreateDto: CategoryCreateDto) {
        const createdCategory =
            await this.categoryService.createCategory(categoryCreateDto);

        return createdCategory;
    }

    @Patch()
    async updatecategory(@Body() categoryUpdateDto: CategoryUpdateDto) {
        const updatedCategory =
            await this.categoryService.updateCategory(categoryUpdateDto);

        return updatedCategory;
    }

    @Delete(":id")
    async deleteCategory(@Param() categoryDeleteDto: CategoryDeleteDto) {
        const deletedCategory =
            await this.categoryService.deleteCategory(categoryDeleteDto);

        return deletedCategory;
    }

    @Get()
    @ApiOperation({
        summary: "Category findAll",
        description: "You can get all categories.",
    })
    @ApiResponse({ status: HttpStatus.OK, type: [Category] })
    async findeAllCategories(): Promise<Category[]> {
        const foundCategories = await this.categoryService.findAllCategories();

        return foundCategories;
    }
}
