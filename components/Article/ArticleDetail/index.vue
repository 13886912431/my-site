<template>
    <div class="article-detail-container">
        <h1>{{ data.title }}</h1>
        <div class="aside">
            <span>日期：{{ formatDate(data.createdAt) }}</span>
            <span>浏览：{{ data.scanCount }}</span>
            <span>
                <a href="#comment">评论：{{ data.commentCount }}</a>
            </span>
            <span>
                <nuxt-link :to="'/article/classify/' + data.classify.id">
                    分类：{{ data.classify.name }}
                </nuxt-link>
            </span>
        </div>
        <div class="markdown-body" v-html="data.htmlContent"></div>
    </div>
</template>

<script>
import { formatDate } from "@/utils";
import "highlight.js/styles/github.css";
import "@/assets/style/markdown.css";

export default {
    name: "ArticleDetail",
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatDate,
    }
}
</script>

<style lang="less" scoped>
.article-detail-container {
    h1 {
        margin: 0.67em 0;
    }
    /deep/ img {
        max-width: 100%;
    }
    .aside {
        font-size: 12px;
        color: @gray;
        span {
            margin-right: 15px;
        }
    }
    .markdown-body {
        margin: 2em 0;
    }
}
</style>