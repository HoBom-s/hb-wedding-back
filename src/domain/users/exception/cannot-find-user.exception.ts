import { BaseException } from "src/exceptions/base.exception";

export class CannotFindUserException extends BaseException {
    constructor() {
        super("Cannot find user !", "Cannot find user !", 400);
    }
}
