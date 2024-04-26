import { HttpStatus } from "@nestjs/common";
import { UserErrorEnum } from "src/common/enums";
import { BaseException } from "src/common/exceptions/base.exception";

export class CannotFindUserException extends BaseException {
    constructor() {
        super(
            "Cannot find user !",
            UserErrorEnum.NOT_FOUND,
            HttpStatus.NOT_FOUND,
        );
    }
}
