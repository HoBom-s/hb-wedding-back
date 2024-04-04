import { winstonLogger } from "src/utils/winston.util";

export class DiscordSendMessageException extends Error {
    constructor(msg: string) {
        super(msg);

        winstonLogger.error(`Discord send message error :: ${msg}`);
    }
}
