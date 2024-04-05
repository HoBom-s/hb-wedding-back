import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
    path: path.resolve(
        process.env.NODE_ENV === "production"
            ? ".env.production"
            : process.env.NODE_ENV === "development"
              ? ".env.development"
              : ".env.local",
    ),
});

export const GLOBAL_ENV = {
    SERVER_PORT: process.env.SERVER_PORT,
    SENTRY_DNS: process.env.SENTRY_DNS,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
};
