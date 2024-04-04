import { winstonLogger } from "src/common/utils/winston.config";

export class DiscordSendMessageException extends Error {
    constructor(msg: string) {
        super(msg);

        winstonLogger.error(`Discord send message error :: ${msg}`);
    }
}
