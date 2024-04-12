import { Common } from "src/entities/common.entity";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity("user")
export class User extends Common {
    @Column({
        type: "varchar",
        unique: true,
    })
    email: string;

    @Column({
        type: "varchar",
    })
    password: string;

    @Column({
        type: "varchar",
    })
    nickname: string;

    @Column({
        type: "varchar",
    })
    name: string;

    @Column({
        type: "varchar",
    })
    phoneNumber: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
