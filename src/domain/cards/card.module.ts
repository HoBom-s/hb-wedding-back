import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { CardRepository } from "./repositories/card.repository";
import { UserModule } from "../users/user.module";
import { CardService } from "./services/card.service";
import { CardController } from "./controllers/card.controller";
import { CardBaseService } from "./services/card-base.service";
import { CardBaseRepository } from "./repositories/card-base.repository";
import { UserBaseService } from "../users/services/user-base.service";
import { UserService } from "../users/services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([Card]), UserModule],
    providers: [
        {
            provide: CardBaseService,
            useClass: CardService,
        },
        {
            provide: CardBaseRepository,
            useClass: CardRepository,
        },
        {
            provide: UserBaseService,
            useClass: UserService,
        },
    ],
    controllers: [CardController],
})
export class CardModule {}
