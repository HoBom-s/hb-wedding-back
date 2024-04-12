import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Common } from "src/entities/common.entity";
import { User } from "../users/entity/user.entity";

export enum CardDirection {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
}

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
        type: "simple-enum",
        enum: CardDirection,
        default: CardDirection.VERTICAL,
    })
    direction: CardDirection;

    @DeleteDateColumn()
    deletedAt: Date;
}
