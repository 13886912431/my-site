<template>
    <div class="article-container">
        <Layout>
            <template>
                <ArticleList :data="articleList" ref="articleList" />
            </template>
            <template #right>
                <ArticleClassify :data="data" />
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from "@/components/Layout";
import ArticleList from "@/components/Article/ArticleList";
import ArticleClassify from "@/components/Article/ArticleClassify";

import { mapState } from "vuex";

export default {
    name: "Article",
    components: {
        Layout,
        ArticleList,
        ArticleClassify
    },
    async asyncData({ $api, route }) {
        const res = await $api.getArticleList({
            page: 1,
            limit: 10,
            classifyId: +route.params.id || -1,
        })
        return {
            articleList: res,
        };
    },
    async fetch({ store: { dispatch }, $api: { getArticleClassify } }) {
        await dispatch("classify/fetchData", getArticleClassify);
    },
    computed: {
        ...mapState("classify", ["loading", "data"]),
        routeInfo() {
            const classifyId = +this.$route.params.id || -1;  // 分类id
            const page = +this.$route.query.page || 1;
            const limit = +this.$route.query.limit || 10;
            return { page, limit, classifyId };
        }
    },
    watch: {
        async $route() {
            this.articleList = await this.$api.getArticleList(this.routeInfo);
            this.$refs.articleList.$el.scrollTop = 0;
        }
    }
};
</script>

<style lang="less" scoped>
.article-container {
    height: 100%;
}
</style>
