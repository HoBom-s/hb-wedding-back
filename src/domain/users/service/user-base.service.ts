import { UserCreateResponseDto } from "../dtos/user-create-response.dto";
import { UserCreateDto } from "../dtos/user-create.dto";
import { UserSigninDto } from "../dtos/user-signin.dto";

export interface UserBaseService {
    createUser(
        userCreateRequest: UserCreateDto,
    ): Promise<UserCreateResponseDto>;

    signinUser(userSigninDto: UserSigninDto): Promise<{ accessToken: string }>;
}

export const UserBaseService = Symbol("UesrBaseService");
