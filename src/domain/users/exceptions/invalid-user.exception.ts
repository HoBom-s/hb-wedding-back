import { HttpStatus } from "@nestjs/common";
import { UserErrorEnum } from "src/common/enums";
import { BaseException } from "src/common/exceptions/base.exception";

export class InvalidUserException extends BaseException {
    constructor() {
        super(
            "Invalid user, sign in again !",
            UserErrorEnum.INVALID,
            HttpStatus.UNAUTHORIZED,
        );
    }
}
