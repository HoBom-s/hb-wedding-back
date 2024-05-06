import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { GLOBAL_ENV } from "src/config/global.env.config";
import { InvalidUserException } from "src/domain/users/exceptions/invalid-user.exception";
import { RedisHelper } from "src/helpers/redis.helper";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private readonly redisHelper: RedisHelper,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const accessToken = this.extractTokenFromHeader(req);
        if (!accessToken) {
            throw new UnauthorizedException("Missing access token.");
        }
        try {
            const { email } = await this.jwtService.verifyAsync(accessToken, {
                secret: GLOBAL_ENV.JWT_SECRET,
            });

            const userId = await this.redisHelper.getCache(email);

            req["user"] = userId;
        } catch {
            throw new InvalidUserException();
        }
        return true;
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
