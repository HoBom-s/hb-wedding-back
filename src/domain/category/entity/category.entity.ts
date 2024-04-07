import { Column, Entity } from "typeorm";
import { CommonEntity } from "src/entities/common.entity";

@Entity()
export class Category extends CommonEntity {
    @Column({ type: "varchar", length: 32, unique: true, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 32, unique: true, nullable: false })
    path: string;

    @Column({ type: "int" })
    sortCount: number;
}
