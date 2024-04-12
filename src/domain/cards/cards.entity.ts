import { Column, DeleteDateColumn, Entity, ManyToOne } from "typeorm";
import { Common } from "src/entities/common.entity";
import { CardDirection } from "src/types/entities/card.type";
import { User } from "../users/entity/users.entity";

@Entity("card")
export class Card extends Common {
    @ManyToOne(() => User)
    user: User;

    @Column({
        type: "enum",
        enum: CardDirection,
        default: CardDirection.VERTICAL,
    })
    direction: CardDirection;

    @DeleteDateColumn()
    deleted_at: Date;
}
