import Vue from "vue";

function setting(request) {
    return {
        getSetting: () => request.get("/setting"),
    }
}

function banner(request) {
    return {
        getBanner: () => request.get("/banner"),
    }
}

function article(request) {
    return {
        // 获取一篇文章详情
        getArticleDetail: (id) => request.get(`/article/${id}`),
        // 分页获取文章列表
        getArticleList: (params) => request.get("/article", { params }),
        // 获取所有文章分类
        getArticleClassify: () => request.get("/classify"),
        // 提交评论
        submitComment: (data) =>  request.post("/comment", data),
        // 分页获取评论列表
        getComment: (params) => request.get("/comment", { params }),
    }
}

function project(request) {
    return {
        getProject: () => request.get("/project"),
    }
}

function message(request) {
    return {
        getMessage: (params) => request.get("/message", { params }),
        submitMessage: (data) => request.post("/message", data),
    }
}

export default (ctx) => {
    const request = ctx.$request;
    const api = {
        ...banner(request),
        ...article(request),
        ...setting(request),
        ...project(request),
        ...message(request),
    }

    ctx.$api = api;
    Vue.prototype.$api = api;
};
