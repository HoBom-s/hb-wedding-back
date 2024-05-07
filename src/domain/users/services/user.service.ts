import { Inject, Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserCreateDto } from "../dtos/user-create.dto";
import { UserCreateResponseDto } from "../dtos/user-create-response.dto";
import { BcryptHelper } from "src/helpers/bcrypt.helper";
import { UserSigninDto } from "../dtos/user-signin.dto";
import { CannotFindUserException } from "../exceptions/cannot-find-user.exception";
import { AlreadyExistUserException } from "../exceptions/already-exist-user.exception";
import { JwtService } from "@nestjs/jwt";
import { UserBaseRepository } from "../repositories/user-base.repository";
import { UserBaseService } from "./user-base.service";
import { RedisHelper } from "src/helpers/redis.helper";

@Injectable()
export class UserService implements UserBaseService {
    constructor(
        @Inject(UserBaseRepository)
        private readonly userRepository: UserBaseRepository,
        private readonly jwtService: JwtService,
        private readonly redisHelper: RedisHelper,
    ) {}

    async createUser(
        userCreateRequest: UserCreateDto,
    ): Promise<UserCreateResponseDto> {
        const alreadyFoundUser: User = await this.userRepository.findByEmail(
            userCreateRequest.email,
        );

        if (alreadyFoundUser) {
            throw new AlreadyExistUserException();
        }

        const encodedPassword: string = await BcryptHelper.encode(
            userCreateRequest.password,
        );

        const createdUser: User = await this.userRepository.createUser({
            ...userCreateRequest,
            password: encodedPassword,
        });

        const createUserResponse: UserCreateResponseDto =
            UserCreateResponseDto.of(createdUser);

        return createUserResponse;
    }

    async signinUser(
        userSigninDto: UserSigninDto,
    ): Promise<{ accessToken: string }> {
        const foundUser = await this.userRepository.findByEmail(
            userSigninDto.email,
        );

        if (!foundUser) {
            throw new CannotFindUserException();
        }

        const isEqual: boolean = await BcryptHelper.decode(
            userSigninDto.password,
            foundUser.password,
        );

        if (!isEqual) {
            throw new CannotFindUserException();
        }

        const payload = { email: foundUser.email };
        const accessToken = await this.jwtService.signAsync(payload);

        await this.redisHelper.setCache(foundUser.email, foundUser.id);

        return { accessToken };
    }

    async findOneUserById(userId: string): Promise<User> {
        const foundUser = await this.userRepository.findById(userId);

        return foundUser;
    }
}
