import { message } from 'ant-design-vue/lib';

/*
    {
        "code": 0,
        "msg": "",
        data: null
    }
    code
    0: 无错误
    401: 没有权限
    406: 验证失败
    500: 服务器内部错误
*/

let baseURL;
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:5008/api'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://119.23.65.235:5008/api'
}

export default (ctx) => {
    const ins = ctx.$axios.create({
        baseURL
    });
    ins.interceptors.response.use(resp => {
        if (resp.data.code !== 0) {
            message.error(resp.data.msg);
            return null;
        }
        return resp.data.data;
    });
    ctx.$request = ins;
};
