
import axios from "axios";
import qs from "qs";

axios.interceptors.request.use(function (config) {
    console.log("request:interceptors")
    return config;
}, function (error) {
    return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {

    if (response && response.status === 200) {

        return response.data;
    } else {
        return {
            code: -102,
            msg: "HTTP状态码：" + response.status
        };
    }
}, function (error) {
    console.dir(error);
    if (error.code == "ECONNABORTED") {
        return Promise.resolve({
            code: -100,
            msg: "请求超时,请稍候再试！",
        });
    } else {
        return Promise.resolve({
            code: -100,
            msg: "请求失败，请检查网络！",
        });
    }
})

export { axios }

export const post = function (url, data, isLoading) {
    return axios({
        method: "post",
        url: url,
        // baseURL: baseURL,
        data: qs.stringify(data),
        timeout: 10000,
        isLoading: isLoading == false ? false : true,
        headers: {
            // "X-requested-With": "XMLHttpRequest",
            //使用form表单进行数据交互
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    })
}

export const postJson = function (url, data, isLoading) {
    return axios({
        method: "post",
        url: url,
        // baseURL: baseURL,
        data: data,
        timeout: 10000,
        isLoading: isLoading == false ? false : true,
        headers: {
            // "X-requested-With": "XMLHttpRequest",
            //使用form表单进行数据交互
            "Content-Type": "application/json"
        }
    })
}

export const get = function (url, params, isLoading) {
    return axios({
        method: "GET",
        url: url,
        // baseURL: baseURL,
        params: params,
        timeout: 10000,
        isLoading: isLoading == false ? false : true,
        // headers: {
        //           "X-requested-With": "XMLHttpRequest"
        // }
    })
};
