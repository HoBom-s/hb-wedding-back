import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Common } from "src/entities/common.entity";
import { CardDirection } from "src/types/entities/card.type";
import { User } from "../users/entity/users.entity";

@Entity("card")
export class Card extends Common {
    @ManyToOne(() => User, { eager: false })
    @JoinColumn({ name: "userId" })
    user: User;

    @Column()
    userId: string;

    @Column({
        type: "varchar",
        length: "40",
        nullable: false,
    })
    title: string;

    @Column({
        type: "enum",
        enum: CardDirection,
        default: CardDirection.VERTICAL,
    })
    direction: CardDirection;

    @DeleteDateColumn()
    deletedAt: Date;
}
