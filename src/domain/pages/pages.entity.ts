import { Column, DeleteDateColumn, Entity } from "typeorm";
import { CommonEntity } from "src/entities/common.entity";
import { PageDirection } from "src/types/entities/page.type";

/**
 * @todo
 * - User 테이블 후 FK 추가
 */
@Entity()
export class Page extends CommonEntity {
    @Column({
        type: "enum",
        enum: PageDirection,
        default: PageDirection.VERTICAL,
    })
    direction: PageDirection;

    @DeleteDateColumn()
    deleted_at: Date;
}
