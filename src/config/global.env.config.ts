import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
    path: path.resolve(
        process.env.NODE_ENV === "production"
            ? ".env.production"
            : ".env.development",
    ),
});

export const GLOBAL_ENV = {
    SERVER_PORT: process.env.SERVER_PORT,
    SENTRY_DNS: process.env.SENTRY_DNS,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
};
