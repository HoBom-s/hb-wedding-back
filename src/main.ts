import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import winstonLogger from "./utils/winston.config";

async function bootstrap() {
    const PORT = 3000;
    const app = await NestFactory.create(AppModule, { logger: winstonLogger });
    await app.listen(PORT, () =>
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`),
    );
}
bootstrap();
