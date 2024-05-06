import { HttpStatus } from "@nestjs/common";
import { UserErrorEnum } from "src/common/enums";
import { BaseException } from "src/common/exceptions/base.exception";

export class AlreadyExistUserException extends BaseException {
    constructor() {
        super(
            "Alreay existing user !",
            UserErrorEnum.ALREADY_EXIST,
            HttpStatus.CONFLICT,
        );
    }
}
