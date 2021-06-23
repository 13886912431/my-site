<template>
    <div class="article-detail-container">
        <h1 class="title">{{ data.title }}</h1>
        <div class="aside">
            <span>日期：{{ formatDate(data.createdAt) }}</span>
            <span>浏览：{{ data.scanCount }}</span>
            <span>
                <a href="#comment">评论：{{ data.commentCount }}</a>
            </span>
            <span>
                <nuxt-link :to="'/article/classify/' + data.classify.id"> 分类：{{ data.classify.name }}</nuxt-link>
            </span>
        </div>
        <v-md-editor mode="preview" :value="data.markdown" ref="editor"></v-md-editor>
    </div>
</template>

<script>
import { formatDate } from '@/utils';

export default {
    name: 'ArticleDetail',
    props: {
        data: Object,
    },
    mounted() {
        this.$bus.on('selectToc', this.handleAnchorClick);
    },
    destroyed() {
        this.$bus.remove('selectToc', this.handleAnchorClick);
    },
    methods: {
        formatDate,
        handleAnchorClick(line) {
            const editor = this.$refs.editor;
            const heading = editor.$el.querySelector(`.v-md-editor-preview [data-v-md-line="${line}"]`);

            if (heading) {
                editor.previewScrollToTarget({
                    target: heading,
                    scrollContainer: document.querySelector('.article-detail-container').parentNode,
                    top: 0,
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.article-detail-container {
    .title {
        margin: 0.67em 0;
    }
    /deep/img {
        max-width: 100%;
    }
    .aside {
        font-size: 12px;
        color: var(--color-light-text);
        span {
            margin-right: 15px;
        }
    }
    .v-md-editor {
        margin: 1em 0;
    }
}
</style>
