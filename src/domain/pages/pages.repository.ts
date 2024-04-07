import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Page } from "./pages.entity";
import { Repository } from "typeorm";

/**
 * @todo
 * - WIP
 */
@Injectable()
export class PagesRepository {
    constructor(
        @InjectRepository(Page)
        private readonly pagesRepository: Repository<Page>,
    ) {}
}
