import { winstonLogger } from "src/utils/winston.util";

export class CannotFindUserException extends Error {
    constructor(msg: string) {
        super(msg);

        winstonLogger.error("Cannot find user !");
    }
}
