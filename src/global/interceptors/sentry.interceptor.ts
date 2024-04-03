import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import * as Sentry from "@sentry/minimal";
import { sendDiscordMessage } from "src/common/utils/discord.config";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            catchError(async (error) => {
                Sentry.captureException(error);

                /**
                 * @TODO
                 *      당장은 toString()으로 하고 있지만,, 차후에는 Error마다 Class를 만들어서
                 *      msg만 뽑을 수 있도록 수정.
                 */
                await sendDiscordMessage(error.toString());

                return of(error);
            }),
        );
    }
}
