import { createClient } from "redis";
import { GLOBAL_ENV } from "./global.env.config";

export const redisClient = createClient({
    password: GLOBAL_ENV.REDIS_PASSWORD,
    socket: {
        host: GLOBAL_ENV.REDIS_HOST,
        port: Number.parseInt(GLOBAL_ENV.REDIS_PORT, 10),
    },
});

redisClient.on("error", (error: Error) => console.warn(`REDIS: ${error}`));

export function redisConnection() {
    return redisClient.connect();
}
