import { BcryptHelper } from "src/helpers/bcrypt.helper";

describe("BcryptHelper.ts", () => {
    it("encode()", async () => {
        const originValue: string = "I'm a origin value !";
        const hashedValue: string = await BcryptHelper.encode(originValue);

        expect(hashedValue).toBeDefined();
    });

    it("decode()", async () => {
        const originValue: string = "I'm a origin value !";
        const hashedValue: string = await BcryptHelper.encode(originValue);
        const decodedValue: boolean = await BcryptHelper.decode(
            originValue,
            hashedValue,
        );

        expect(decodedValue).toBe(true);
    });
});
