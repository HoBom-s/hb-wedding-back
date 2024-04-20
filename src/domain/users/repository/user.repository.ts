import { Injectable } from "@nestjs/common";
import { User } from "../entity/user.entity";
import { UserCreateDto } from "../dtos/user-create.dto";
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
