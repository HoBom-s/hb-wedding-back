import { BaseException } from "src/common/exceptions/base.exception";

export class CannotFindUserException extends BaseException {
    constructor() {
        super("Cannot find user !", "Cannot find user !", 400);
    }
}
