import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserCreateDto } from "../dtos/user-create.dto";
import { UserBaseRepository } from "./user-base.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository implements UserBaseRepository {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>,
    ) {}

    async createUser(userCreateRequest: UserCreateDto): Promise<User> {
        return this.user.save(userCreateRequest);
    }

    async findByEmail(email: string): Promise<User> {
        return this.user.findOneBy({ email });
    }

    async findById(id: string): Promise<User> {
        return this.user.findOneBy({ id });
    }
}
