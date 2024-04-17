import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/exceptions/base.exception";

export class CannotFindCardException extends BaseException {
    constructor() {
        super(
            "Cannot find the card !",
            "Cannot find the card !",
            HttpStatus.NOT_FOUND,
        );
    }
}
