import { Injectable } from "@nestjs/common";
import { User } from "../entity/users.entity";
import { UserCreateDto } from "../dto/user-create.dto";
import { UserCustomRepository } from "./users-custom.repository";

@Injectable()
export class UserRepository extends UserCustomRepository {
    constructor() {
        super();
    }

    async createUser(userCreateRequest: UserCreateDto): Promise<User> {
        return this.user.save(userCreateRequest);
    }
}
