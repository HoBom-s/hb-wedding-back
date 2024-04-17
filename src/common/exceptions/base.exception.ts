import { HttpException, HttpStatus } from "@nestjs/common";

export class BaseException extends HttpException {
    msg: string;

    constructor(msg: string, errorCode: string, statusCode: HttpStatus) {
        super(errorCode, statusCode);
        this.msg = msg;
    }
}
