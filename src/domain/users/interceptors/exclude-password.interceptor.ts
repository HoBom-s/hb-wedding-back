import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { Observable, map } from "rxjs";
import { User } from "../entities/user.entity";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ExcludePassword implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<User>,
    ): Observable<User> | Promise<Observable<User>> {
        return next
            .handle()
            .pipe(
                map((user) =>
                    plainToInstance(User, user, {
                        excludeExtraneousValues: true,
                    }),
                ),
            );
    }
}
