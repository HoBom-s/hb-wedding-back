import { UserCreateResponseDto } from "../dtos/user-create-response.dto";
import { UserCreateDto } from "../dtos/user-create.dto";
import { UserSigninDto } from "../dtos/user-signin.dto";
import { User } from "../entity/user.entity";

export interface UserBaseService {
    createUser(
        userCreateRequest: UserCreateDto,
    ): Promise<UserCreateResponseDto>;

    signinUser(userSigninDto: UserSigninDto): Promise<{ accessToken: string }>;

    findOneUserById(userId: string): Promise<User>;
}

export const UserBaseService = Symbol("UesrBaseService");
