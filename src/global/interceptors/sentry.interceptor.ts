import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import * as Sentry from "@sentry/minimal";
import { DiscordUtil } from "src/utils/discord.util";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError(async (error) => {
                Sentry.captureException(error);

                const discordUtil = new DiscordUtil();
                await discordUtil.sendDiscordMessage(error.toString());

                return of(error);
            }),
        );
    }
}
