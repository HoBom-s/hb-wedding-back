import { HttpStatus } from "@nestjs/common";
import { BaseException } from "src/common/exceptions/base.exception";

export class AlreadyExistCardException extends BaseException {
    constructor() {
        super(
            "Alreay exist card !",
            "Alreay exist card !",
            HttpStatus.CONFLICT,
        );
    }
}
