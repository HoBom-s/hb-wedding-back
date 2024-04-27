import { HttpStatus } from "@nestjs/common";
import { CardErrorEnum } from "src/common/enums";
import { BaseException } from "src/common/exceptions/base.exception";

export class AlreadyExistCardException extends BaseException {
    constructor() {
        super(
            "Alreay exist card !",
            CardErrorEnum.ALREADY_EXIST,
            HttpStatus.CONFLICT,
        );
    }
}
