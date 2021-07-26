export class Assert {
    public static AreEqual(a: number | string, b: number | string, ErrMsg: string = '') {
        if (a != b) {
            throw new Error(ErrMsg);
        } else {
            cc.log("Pass ", a + '==' + b)
        }
    }
    public static AreNotEqual(a: number | string, b: number | string, ErrMsg: string = '') {
        if (a == b) {
            throw new Error(ErrMsg);
        } else {
            cc.log("Pass ", a + '!=' + b)
        }
    }
    public static IsFalse(a, ErrMsg: string = '') {
        if (a != false) {
            throw new Error(ErrMsg);
        } else {
            cc.log("Pass ", a + '=' + false)
        }
    }
    public static IsTrue(a, ErrMsg: string = '') {
        if (a != true) {
            throw new Error(ErrMsg);
        } else {
            cc.log("Pass ", a + '=' + true)
        }
    }
}