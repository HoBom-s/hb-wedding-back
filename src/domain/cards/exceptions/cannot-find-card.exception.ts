import { HttpStatus } from "@nestjs/common";
import { CardErrorEnum } from "src/common/enums";
import { BaseException } from "src/common/exceptions/base.exception";

export class CannotFindCardException extends BaseException {
    constructor() {
        super(
            "Cannot find the card !",
            CardErrorEnum.NOT_FOUND,
            HttpStatus.NOT_FOUND,
        );
    }
}
