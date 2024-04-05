import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

export class SwaggerConfig {
    private app: INestApplication;

    private docs: OpenAPIObject;

    constructor(app: INestApplication) {
        this.app = app;

        const options = new DocumentBuilder()
            .setTitle("HoBom Wedding API DOCS")
            .setVersion("1.0.0")
            .build();

        this.docs = SwaggerModule.createDocument(this.app, options);
    }

    init() {
        SwaggerModule.setup("api-docs", this.app, this.docs);
    }
}
