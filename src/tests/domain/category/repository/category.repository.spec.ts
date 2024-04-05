import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "src/config/typeorm.config";
import { CategoryModule } from "src/domain/category/category.module";
import { CategoryRepository } from "src/domain/category/repository/category.repository";

describe("CategoryRepository", () => {
    let app: INestApplication;
    let categoryRepository: CategoryRepository;

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
        categoryRepository = module.get(CategoryRepository);

        await app.init();
    });

    afterAll(async () => {
        app.close();
    });

    it("categoryRepository.findByCategoryName()", async () => {
        const found =
            await categoryRepository.findByCategoryName("I'm a category");

        expect(found).toBeDefined();

        const maybeNull =
            await categoryRepository.findByCategoryName("Nothing");

        expect(maybeNull).toBeNull();
    });

    it("categoryRepository.findByCategoryPath()", async () => {
        const found = await categoryRepository.findByCategoryPath("path");

        expect(found).toBeDefined();

        const maybeNull =
            await categoryRepository.findByCategoryPath("Nothing");

        expect(maybeNull).toBeNull();
    });
});
