import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { CardRepository } from "./repositories/card.repository";
import { UserModule } from "../users/user.module";
import { CardService } from "./services/card.service";
import { CardController } from "./controllers/card.controller";
import { UserService } from "../users/services/user.service";
import { CardBaseService } from "./services/card-base.service";
import { CardBaseRepository } from "./repositories/card-base.repository";

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
        UserService,
    ],
    controllers: [CardController],
})
export class CardModule {}
