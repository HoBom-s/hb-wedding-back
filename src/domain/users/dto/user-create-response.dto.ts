export class UserCreateResponseDto {
    readonly id: string;

    readonly email: string;

    readonly name: string;

    readonly ninckname: string;

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
        this.ninckname = nickname;
        this.phone_number = phone_number;
    }
}
