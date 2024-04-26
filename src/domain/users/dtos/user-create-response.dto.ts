export class UserCreateResponseDto {
    readonly id: string;

    readonly email: string;

    readonly name: string;

    readonly nickname: string;

    readonly phone_number: string;

    constructor(
        id: string,
        email: string,
        name: string,
        nickname: string,
        phone_number: string,
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.phone_number = phone_number;
    }

    static of({
        id,
        email,
        name,
        nickname,
        phoneNumber,
    }): UserCreateResponseDto {
        return new UserCreateResponseDto(
            id,
            email,
            name,
            nickname,
            phoneNumber,
        );
    }
}
