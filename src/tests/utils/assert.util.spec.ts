import { AssertUtil } from "src/utils/assert.util";

describe("AssertUtil", () => {
    it("assertString() fail case 01", () => {
        expect(() => {
            AssertUtil.assertString(123);
        }).toThrow(TypeError);
    });

    it("assertString() fail case 22", () => {
        expect(() => {
            AssertUtil.assertString([]);
        }).toThrow(TypeError);

        expect(() => {
            AssertUtil.assertString({});
        }).toThrow(TypeError);
    });

    it("assertString() fail case 03", () => {
        expect(() => {
            AssertUtil.assertString(undefined);
        }).toThrow(TypeError);

        expect(() => {
            AssertUtil.assertString(null);
        }).toThrow(TypeError);
    });

    it("assertString() pass case", () => {
        expect(() => {
            AssertUtil.assertString("");
        }).toBeTruthy();
    });
});
