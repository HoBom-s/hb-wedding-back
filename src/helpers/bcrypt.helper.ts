import * as bcrypt from "bcrypt";
import { AssertUtil } from "src/utils/assert.util";

/**
 * `bcrypt.helper.ts`
 *
 * Bcrypt와 관련된 모듈을 모아둔 class 정의
 */
export class BcryptHelper {
    readonly _instance = Symbol.for("BcryptHelper");

    private static readonly SALT: number = 10;

    /**
     * Target value `v`를 파라미터로 전달 받고,
     * hash 처리된 value를 리턴한다.
     *
     * @param {string} v
     * @returns {string}
     */
    public static async encode(v: string): Promise<string> {
        /**
         * 값이 들어오지 않을 경우 `assert error`를 발생시키도록 한다.
         * 또한 Type이 `string`이 아닐 경우 `assert`는 실패하도록 한다.
         */
        AssertUtil.assertString(v);

        const encodedValue: string = await bcrypt.hash(v, this.SALT);

        return encodedValue;
    }

    /**
     * Target value `v1 [ hash처리 이전의 값 ]`, `v2 [ hash처리 이후의 값 ]`를 비교한 후,
     * 그에 따른 결과값 [ true, false ] 를 리턴하도록 한다.
     *
     * @param {string} v1
     * @param {string} v2
     * @returns {boolean}
     */
    public static async decode(v1: string, v2: string): Promise<boolean> {
        /**
         * 값이 들어오지 않을 경우 `assert error`를 발생시키도록 한다.
         * 또한 Type이 `string`이 아닐 경우 `assert`는 실패하도록 한다.
         */
        AssertUtil.assertString(v1);

        /**
         * 값이 들어오지 않을 경우 `assert error`를 발생시키도록 한다.
         * 또한 Type이 `string`이 아닐 경우 `assert`는 실패하도록 한다.
         */
        AssertUtil.assertString(v2);

        const isEqual: boolean = await bcrypt.compare(v1, v2);

        return isEqual;
    }
}
