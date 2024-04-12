export class AlreadyExistUserException extends Error {
    constructor(msg: string) {
        super(msg);
    }
}
