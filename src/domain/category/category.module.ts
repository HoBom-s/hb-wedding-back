import { Module } from "@nestjs/common";
import { CategoryController } from "./controller/category.controller";
import { CategoryService } from "./service/category.service";
import { CategoryRepository } from "./repository/category.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entity/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
