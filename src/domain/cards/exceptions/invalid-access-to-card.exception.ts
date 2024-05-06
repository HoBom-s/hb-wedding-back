import { HttpStatus } from "@nestjs/common";
import { CardErrorEnum } from "src/common/enums";
import { BaseException } from "src/common/exceptions/base.exception";

export class InvalidAccessToCardException extends BaseException {
    constructor() {
        super(
            "Invalid user access to the card !",
            CardErrorEnum.INVALID_ACCESS,
            HttpStatus.UNAUTHORIZED,
        );
    }
}
