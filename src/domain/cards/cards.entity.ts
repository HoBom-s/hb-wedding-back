import { Column, DeleteDateColumn, Entity } from "typeorm";
import { Common } from "src/entities/common.entity";
import { CardDirection } from "src/types/entities/card.type";

/**
 * @todo
 * - User 테이블 후 FK 추가
 */
@Entity()
export class Card extends Common {
    @Column({
        type: "enum",
        enum: CardDirection,
        default: CardDirection.VERTICAL,
    })
    direction: CardDirection;

    @DeleteDateColumn()
    deleted_at: Date;
}
