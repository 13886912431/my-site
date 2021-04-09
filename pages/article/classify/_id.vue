<template>
    <div class="classify-container">
        <Layout>
            <template>
                <ArticleList :data="articleList" />
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
    name: "ClassifyId",
    components: {
        Layout,
        ArticleList,
        ArticleClassify
    },
    validate({ params, redirect }) {
        if (!params.id) {
            redirect("/article");
            return false;
        };
        const parseId = parseInt(params.id);
        if (!parseId) {
            redirect("/article");
            return false;
        }
        return true;
    },
    async fetch({ store: { dispatch }, $api }) {
        await dispatch("classify/fetchData", $api);
    },
    async asyncData({ $api, route }) {
        const res = await $api.getArticleList({
            page: 1,
            limit: 10,
            classifyId: +route.params.id || -1,
        });
        return {
            articleList: res,
        };
    },
    computed: {
        ...mapState("classify", ["loading", "data"])
    },

}
</script>

<style lang="less" scoped>
.classify-container {
    height: 100%;
}
</style>