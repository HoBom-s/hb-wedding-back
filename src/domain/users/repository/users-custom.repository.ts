import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entity/users.entity";

export class UserCustomRepository {
    @InjectRepository(User)
    protected readonly user: Repository<User>;

    constructor() {}

    /**
     * ====================== PUBLIC ======================
     * public methods.
     * Like findBy~~
     * ====================== PUBLIC ======================
     */
    public async findByEmail(email: string): Promise<User> {
        return this.user.findOneBy({ email });
    }
}
