import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryCreateDto } from "../dto/category.dto";
import { Category } from "../entity/category.entity";

@Controller("/api/v1/category")
@ApiTags("Category API")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post("/")
    @ApiOperation({
        summary: "Category create",
        description: "You can create category.",
    })
    @ApiBody({ type: CategoryCreateDto })
    @ApiResponse({ status: HttpStatus.CREATED })
    async createCategory(
        @Body() categoryCreateDto: CategoryCreateDto,
    ): Promise<Category> {
        const createdCategory =
            await this.categoryService.createCategory(categoryCreateDto);

        return createdCategory;
    }

    @Get("/")
    @ApiOperation({
        summary: "Category findAll",
        description: "You can get all categories.",
    })
    @ApiResponse({ status: HttpStatus.OK })
    async findeAllCategories(): Promise<Category[]> {
        const foundCategories = await this.categoryService.findAllCategories();

        return foundCategories;
    }
}
