export class AlreadyExistCategoryError extends Error {
    constructor(msg: string) {
        super(`The category is already exist ! Error :: ${msg}`);
    }
}
