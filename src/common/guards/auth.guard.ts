import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { GLOBAL_ENV } from "src/config/global.env.config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const accessToken = this.extractTokenFromHeader(req);
        if (!accessToken) {
            throw new UnauthorizedException("Missing access token.");
        }
        try {
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: GLOBAL_ENV.JWT_SECRET,
            });
            req["user"] = payload;
        } catch {
            throw new UnauthorizedException("Invalid access token.");
        }
        return true;
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
