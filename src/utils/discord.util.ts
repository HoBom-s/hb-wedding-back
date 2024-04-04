import { Webhook, MessageBuilder } from "discord-webhook-node";
import { GLOBAL_ENV } from "src/config/global.env.config";
import { DiscordSendMessageException } from "src/exceptions/discord-send-message.exception";

export class DiscordUtil {
    private hook: Webhook;

    constructor() {
        this.hook = new Webhook(GLOBAL_ENV.DISCORD_WEBHOOK_URL);
    }

    async sendDiscordMessage(errMsg: string) {
        const messageBuilder = new MessageBuilder()
            .setTitle("HBWD Issue Occured !!")
            .setAuthor(
                "HoBom Wedding Error",
                "https://cdn.discordapp.com/embed/avatars/0.png",
                "https://www.google.com",
            )
            .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
            .setDescription(errMsg)
            .setImage("https://cdn.discordapp.com/embed/avatars/0.png")
            .setTimestamp();

        try {
            await this.hook.send(messageBuilder);
        } catch (error) {
            throw new DiscordSendMessageException(error.message);
        }
    }
}
