/**
 * `assert.util.ts`
 *
 * Assert를 수행하는 Util함수를 정의하도록 한다.
 */
export class AssertUtil {
    readonly _instance = Symbol.for("AssertUtil");

    /**
     * 어떠한 값이 들어올지 모르지만, `string` type이 아니라면
     * TypeError를 발생시키도록 한다.
     *
     * @param {unknown} v
     */
    public static assertString(v: unknown): asserts v is string {
        if (typeof v !== "string" || !v) {
            throw TypeError(`Assert fail with ${typeof v} !`);
        }
    }
}
