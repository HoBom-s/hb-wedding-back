import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/exceptions/base.exception";

export class AlreadyExistUserException extends BaseException {
    constructor() {
        super(
            "Alreay exist user !",
            "Alreay exist user !",
            HttpStatus.CONFLICT,
        );
    }
}
