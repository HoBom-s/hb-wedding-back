import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserCreateDto } from "../dtos/user-create.dto";
import { UserCreateResponseDto } from "../dtos/user-create-response.dto";
import { UserSigninDto } from "../dtos/user-signin.dto";
import { UserBaseService } from "../service/user-base.service";

@Controller("/api/v1/users")
@ApiTags("User API")
export class UserController {
    constructor(
        @Inject(UserBaseService) private readonly userService: UserBaseService,
    ) {}

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
        const accessToken = await this.userService.signinUser(signinRequest);

        return accessToken;
    }
}
