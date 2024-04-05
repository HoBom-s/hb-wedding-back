import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "src/config/typeorm.config";
import { CategoryModule } from "src/domain/category/category.module";
import { CategoryCreateDto } from "src/domain/category/dto/category-create.dto";
import { CategoryDeleteDto } from "src/domain/category/dto/category-delete.dto";
import { CategoryUpdateDto } from "src/domain/category/dto/category-update.dto";
import { CategoryService } from "src/domain/category/service/category.service";

describe("CategoryService", () => {
    let app: INestApplication;
    let categoryService: CategoryService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRootAsync({
                    useClass: TypeOrmConfig,
                }),
                CategoryModule,
            ],
        }).compile();

        app = module.createNestApplication();
        categoryService = module.get(CategoryService);

        await app.init();
    });

    afterAll(async () => {
        app.close();
    });

    it("categoryService.createCategory()", async () => {
        const categoryCreateDto: CategoryCreateDto = {
            name: "I'm a category2",
            path: "path2",
            sortCount: 1,
        };

        const createdCategory =
            await categoryService.createCategory(categoryCreateDto);

        expect(createdCategory.name).toBe(categoryCreateDto.name);
    });

    it("categoryService.udpateCategory()", async () => {
        const categoryUpdateDto: CategoryUpdateDto = {
            name: "I'm a category !!",
            path: "path",
            sortCount: 0,
        };

        const updatedCategory =
            await categoryService.updateCategory(categoryUpdateDto);

        expect(updatedCategory.name).toBe(categoryUpdateDto.name);
    });

    it("categoryService.deleteCategory()", async () => {
        const caategoryDeleteDto: CategoryDeleteDto = {
            id: 7,
        };

        const deletedCategory =
            await categoryService.deleteCategory(caategoryDeleteDto);

        expect(deletedCategory.id).toBe(caategoryDeleteDto.id);
    });
});
