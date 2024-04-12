import { CommonEntity } from "src/entities/common.entity";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User extends CommonEntity {
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
    phone_number: string;

    @DeleteDateColumn()
    deleted_at: Date;
}
