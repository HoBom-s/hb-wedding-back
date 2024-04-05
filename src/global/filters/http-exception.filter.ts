import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        return response.status(status).json({
            statusCode: status,
            message: exception.message,
        });
    }
}
