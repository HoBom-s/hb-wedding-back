import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { CardRepository } from "./repositories/card.repository";
import { UserModule } from "../users/user.module";
import { CardService } from "./services/card.service";
import { CardController } from "./controllers/card.controller";
import { UserService } from "../users/services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([Card]), UserModule],
    providers: [CardService, CardRepository, UserService],
    controllers: [CardController],
})
export class CardModule {}
