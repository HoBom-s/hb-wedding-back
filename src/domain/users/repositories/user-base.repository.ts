import { User } from "../entity/user.entity";
import { UserCreateDto } from "../dtos/user-create.dto";

export interface UserBaseRepository {
    createUser(userCreateRequest: UserCreateDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export const UserBaseRepository = Symbol("UserBaseRepository");
