import { HttpException } from "@nestjs/common";

/**
 * @Todo @robinyeon
 * - BaseException 보완
 */
export class BaseException extends HttpException {
    msg: string;

    constructor(msg: string, errorCode: string, statusCode: number) {
        super(errorCode, statusCode);

        this.msg = msg;
    }
}
