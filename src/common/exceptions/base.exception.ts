import { HttpException, HttpStatus } from "@nestjs/common";
import { CardErrorEnum, UserErrorEnum } from "../enums";

type ErrorCode = CardErrorEnum | UserErrorEnum;

export class BaseException extends HttpException {
    msg: string;

    constructor(msg: string, errorCode: ErrorCode, statusCode: HttpStatus) {
        super(errorCode, statusCode);
        this.msg = msg;
    }
}
