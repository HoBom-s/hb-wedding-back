import { HttpException } from "@nestjs/common";

export class AlreadyExistCategoryError extends HttpException {
    constructor(msg: string) {
        super(`The category is already exist ! Error :: ${msg}`, 400);
    }
}
