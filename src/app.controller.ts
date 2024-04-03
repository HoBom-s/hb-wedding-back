import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    /**
     * @TODO
     *      아래는 그냥 단순히 에러 체크용 라우터 입니다.
     *      혹여 에러를 튕겨볼 일이 생기신다면 아래를 수정해 주세요.
     *      필요하지 않다면 삭제해 주세요.
     */
    @Get("/error")
    getError() {
        throw new Error();
    }
}
