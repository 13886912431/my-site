<template>
    <div class="article-classify-container">
        <h2>文章分类</h2>
        <CatalogList :list="list" @select="handleSelect" />
    </div>
</template>

<script>
import CatalogList from '@/components/CatalogList';

export default {
    name: 'ArticleClassify',
    components: {
        CatalogList,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        routeInfo() {
            const classifyId = +this.$route.params.id || -1; // 分类id
            const limit = +this.$route.query.limit || 10;
            return { limit, classifyId };
        },
        list() {
            if (this.data.length === 0) return [];

            const list = [
                {
                    id: -1,
                    name: '全部',
                    articleCount: this.data.reduce((p, c) => p + c.articleCount, 0),
                },
            ];
            return list.concat(this.data).map(it => {
                return {
                    ...it,
                    selected: it.id === this.routeInfo.classifyId,
                };
            });
        },
    },
    methods: {
        // 选择分类
        handleSelect(data) {
            const query = {
                page: 1,
                limit: this.routeInfo.limit,
            };
            if (data.id === -1) {
                // 所有文章
                this.$router.push({
                    name: 'article',
                    query,
                });
            } else {
                // 文章分类
                this.$router.push({
                    name: 'article-classify-id',
                    query,
                    params: { id: data.id },
                });
            }
        },
    },
};
</script>
