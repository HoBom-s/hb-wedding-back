export class AssertUtil {
    readonly _instance = Symbol.for("AssertUtil");

    public static assertString(v: unknown): asserts v is string {
        if (typeof v !== "string" || !v) {
            throw TypeError(`Assert fail with ${typeof v} !`);
        }
    }
}
