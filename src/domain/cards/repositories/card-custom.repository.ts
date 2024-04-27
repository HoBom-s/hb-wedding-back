import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "../card.entity";
import { Repository } from "typeorm";

type CardColumn = keyof Card;
type Values<T> = T[keyof T];

export class CardCustomRepository {
    @InjectRepository(Card)
    protected readonly card: Repository<Card>;

    constructor() {}

    public async getOneCardBy(
        column: CardColumn,
        value: Values<Card>,
    ): Promise<Card> {
        return this.card.findOneBy({ [column]: value });
    }
}
