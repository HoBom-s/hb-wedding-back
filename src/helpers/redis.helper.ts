import { Injectable } from "@nestjs/common";
import { redisClient } from "src/config/redis.config";

@Injectable()
export class RedisHelper {
    private readonly SERVICE_NAME: string = "HBWD";
    private readonly EXP_TIME: number = 3600; // 1hour in sec

    async setCache(key: string, value: string) {
        await redisClient.SETEX(
            `${this.SERVICE_NAME}_${key}`,
            this.EXP_TIME,
            value,
        );

        return;
    }

    async getCache(key: string) {
        const value = await redisClient.get(`${this.SERVICE_NAME}_${key}`);
        return value;
    }
}
