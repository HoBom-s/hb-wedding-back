import { Webhook, MessageBuilder } from "discord-webhook-node";
import { GLOBAL_ENV } from "src/config/global.env.config";

export const sendDiscordMessage = async (errorMsg: string) => {
    const hook = new Webhook(GLOBAL_ENV.DISCORD_WEBHOOK_URL);

    const messageBuilder = new MessageBuilder()
        .setTitle("HBWD Issue Occured !!")
        .setAuthor(
            "HoBom Wedding Error",
            "https://cdn.discordapp.com/embed/avatars/0.png",
            "https://www.google.com",
        )
        .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
        .setDescription(errorMsg)
        .setImage("https://cdn.discordapp.com/embed/avatars/0.png")
        .setTimestamp();

    try {
        await hook.send(messageBuilder);
    } catch (error) {
        console.error(`Discord 메시지 전송 실패. Error :: ${error.message}`);
    }
};
