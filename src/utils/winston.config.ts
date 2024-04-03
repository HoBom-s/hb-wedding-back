import { WinstonModule, utilities } from "nest-winston";
import * as winston from "winston";
import * as winstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, ms } = winston.format;

const logDir = `${process.cwd()}/logs`;
const koreanTime = () => {
    return new Date().toLocaleString("ko-Ko", { timeZone: "Asia/Seoul" });
};

const daily = (level: string) => {
    return {
        level,
        datePattern: "YYYY-MM-DD",
        dirname: `${logDir}/${level}`,
        filename: `%DATE%.${level}.log`,
        maxFiles: 30,
        zippedArchive: true,
        format: combine(
            timestamp(),
            utilities.format.nestLike("HBWD", {
                colors: false,
                prettyPrint: true,
            }),
        ),
    };
};

const winstonLogger = WinstonModule.createLogger({
    // 기록방식
    transports: [
        new winston.transports.Console({
            format: combine(
                timestamp({ format: koreanTime }),
                ms(),
                utilities.format.nestLike("HOBOM-WEDDING", {
                    prettyPrint: true,
                    colors: true,
                }),
            ),
        }),

        new winstonDaily(daily("error")),
    ],

    // Exceptions 발생시 파일 설정
    exceptionHandlers: [new winstonDaily(daily("error"))],
});

export default winstonLogger;
