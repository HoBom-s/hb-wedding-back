import { Injectable } from "@nestjs/common";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserCreateDto } from "../dtos/user-create.dto";
import { UserCreateResponseDto } from "../dtos/user-create-response.dto";
import { BcryptHelper } from "src/helpers/bcrypt.helper";
import { UserSigninDto } from "../dtos/user-signin.dto";
import { CannotFindUserException } from "../exceptions/cannot-find-user.exception";
import { AlreadyExistUserException } from "../exceptions/already-exist-user.exception";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
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

    async signinUser(userSigninDto: UserSigninDto) {
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
        return { accessToken };
    }
}
