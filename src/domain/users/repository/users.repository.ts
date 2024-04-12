import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entity/users.entity";
import { UserCreateDto } from "../dto/user-create.dto";
import { UserSigninDto } from "../dto/user-signin.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(userCreateRequest: UserCreateDto): Promise<User> {
        return this.userRepository.save(userCreateRequest);
    }

    async signinUser(userSigninDto: UserSigninDto): Promise<User> {
        return this.userRepository.findOne({
            where: {
                email: userSigninDto.email,
            },
        });
    }
}
