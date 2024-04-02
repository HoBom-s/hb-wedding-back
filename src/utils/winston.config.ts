import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import process from "process";

/**
 *  WIP
 * [] winston, morgan config
 * [] env config
 * */

const { combine, timestamp, label, printf } = winston.format;

const logDir = `${process.cwd()}/logs`;

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    // 출력방식
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        label({ label: "HB-WEDDING" }),
        logFormat,
    ),
    // 기록방식
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],

    // uncaughtException 발생시 파일 설정
    exceptionHandlers: [
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

export default logger;
