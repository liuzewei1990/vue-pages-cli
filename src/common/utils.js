

import md5 from "js-md5";

export const randomDateNow = function (frontLen) {
    frontLen = frontLen || 0;
    return Math.random().toString().substr(3, frontLen) + Date.now();
}

export const getSignData = function (params, singKey) {
    let signData = "";
    if (params && Object.prototype.toString.call(params) === "[object Object]") {
        try {
            //如果参数的值为空不参与签名
            let newParmas = {};
            for (let key in params) {
                if (params[key] !== undefined && params[key] !== "" && params[key] !== null)
                    newParmas[key] = params[key];
            }
            console.info("参与签名的对象-------", newParmas);

            //对象的KEY排序 [a,b,c] => a=1&b=2&c=1
            let newKeys = Object.keys(newParmas).sort();
            let newParmas2 = {};
            let strUrl = "";
            for (let i = 0; i < newKeys.length; i++) {
                newParmas2[newKeys[i]] = newParmas[newKeys[i]];
                strUrl += `${newKeys[i]}=${newParmas[newKeys[i]]}&`;
            }
            console.info("排序后的对象-------", newParmas2);

            //拼接key
            singKey ? (strUrl += `key=${singKey}`) : (strUrl = strUrl.substring(strUrl.length - 1, 0));
            console.info("排序后的strUrl-------", strUrl);

            //MD5
            signData = md5(strUrl).toUpperCase();
            console.log("return signData:", signData)

        } catch (err) {
            console.log(err);
        }
    };

    return signData;
}