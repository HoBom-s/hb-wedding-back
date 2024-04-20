import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "../service/user.service";
import { UserCreateDto } from "../dtos/user-create.dto";
import { UserCreateResponseDto } from "../dtos/user-create-response.dto";
import { UserSigninDto } from "../dtos/user-signin.dto";

@Controller("/api/v1/users")
@ApiTags("User API")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        summary: "Create User API",
        description: "Create user",
    })
    @ApiBody({
        type: UserCreateDto,
    })
    @ApiResponse({
        status: 201,
    })
    @Post("/register")
    async createUser(@Body() createUserRequest: UserCreateDto) {
        const createdUser: UserCreateResponseDto =
            await this.userService.createUser(createUserRequest);

        return createdUser;
    }

    @ApiOperation({
        summary: "Signin User API",
        description: "Signin user",
    })
    @ApiBody({
        type: UserSigninDto,
    })
    @ApiResponse({
        status: 201,
    })
    @Post("/signin")
    async signinUser(@Body() signinRequest: UserSigninDto) {
        const foundeUser: string =
            await this.userService.signinUser(signinRequest);

        return foundeUser;
    }
}
