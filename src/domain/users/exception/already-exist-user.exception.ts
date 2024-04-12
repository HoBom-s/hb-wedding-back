import { BaseException } from "src/exceptions/base.exception";

export class AlreadyExistUserException extends BaseException {
    constructor() {
        super("Alreay exist user !", "Alreay exist user !", 400);
    }
}
