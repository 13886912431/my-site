<template>
    <div class="article-id-container">
        <Layout>
            <template>
                <div class="main" ref="main">
                    <ArticleDetail :data="data" />
                    <ArticleComment />
                </div>
            </template>
            <template #right>
                <ArticleToc :toc="data.toc" />
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from '@/components/Layout';
import ArticleDetail from '@/components/Article/ArticleDetail';
import ArticleToc from '@/components/Article/ArticleToc';
import ArticleComment from '@/components/Article/ArticleComment';

import scroll from '@/mixins/scroll';

export default {
    name: 'ArticleId',
    mixins: [scroll('main')],
    validate({ params, redirect }) {
        if (!params.id) {
            redirect('/article');
            return false;
        }
        const parseId = parseInt(params.id);
        if (!parseId) {
            redirect('/article');
            return false;
        }
        return true;
    },
    components: {
        Layout,
        ArticleDetail,
        ArticleToc,
        ArticleComment,
    },
    async asyncData({ $api, route, redirect }) {
        const res = await $api.getArticleDetail(route.params.id);
        if (!res) {
            redirect('/article');
        }
        return {
            data: res,
        };
    },
    updated() {
        const hash = location.hash;
        if (hash && typeof document !== 'undefined') {
            const dom = document.getElementById(hash.slice(1));
            if (dom) {
                setTimeout(() => {
                    const top = dom.getBoundingClientRect().top;
                    this.$refs.main.scrollTop = top;
                }, 300);
            }
        }
    },
};
</script>

<style lang="less" scoped>
.article-id-container {
    height: 100%;
    position: relative;
}
.main {
    height: 100%;
    padding: 20px 40px;
    overflow-y: auto;
    scroll-behavior: smooth;
}

@media screen and (max-width: 480px) {
    .main {
        padding: 20px;
        padding-top: 0;
    }
}
</style>
