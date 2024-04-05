import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    UseFilters,
} from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryCreateDto } from "../dto/category-create.dto";
import { Category } from "../entity/category.entity";
import { HttpExceptionFilter } from "src/global/filters/http-exception.filter";

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
