import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Page } from "./pages.entity";
import { PagesRepository } from "./pages.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Page])],
    providers: [],
    controllers: [PagesRepository],
})
export class PagesModule {}
