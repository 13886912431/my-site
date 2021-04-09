<template>
    <div class="article-comment-container">
        <Comment
            title="评论列表"
            :subTitle="`(${data.total})`"
            :list="data.rows"
            :listLoading="loading"
            :finished="finished"
            @submit="handleSubmit"
        />
    </div>
</template>

<script>
import Comment from "@/components/Comment";

import fetchData from "@/mixins/fetchData";
import { debounce } from "@/utils";

export default {
    name: "ArticleComment",
    data() {
        return {
            page: 1,
            limit: 10,
            finished: false,
        };
    },
    mixins: [fetchData({ total: 0, rows: [] })],
    components: {
        Comment,
    },
    created() {
        this.handleScrollDebounce = debounce(this.handleScroll, 50);
        this.$bus.on('scroll', this.handleScrollDebounce);
    },
    destroyed() {
        this.$bus.remove('scroll', this.handleScrollDebounce);
    },
    methods: {
        fetchData() {
            return this.$api.getComment({
                articleId: this.$route.params.id,
                page: this.page,
                limit: this.limit
            });
        },
        async handleSubmit(formData, callback) {
            const res = await this.$api.submitComment({
                articleId: this.$route.params.id,
                ...formData,
            });
            console.log(res);
            this.data.rows.unshift(res);
            this.data.total++;
            callback("评论成功");
        },
        // 加载更多评论
        async loadMore() {
            if (this.finished) return;

            if (this.data.rows.length >= this.data.total) {
                // 没有更多啦
                this.finished = true;
                return;
            }
            this.loading = true;
            this.page++;
            const res = await this.fetchData();
            if (res.rows.length === 0) {
                this.finished = true;
            } else {
                this.data.total = res.total;
                this.data.rows = this.data.rows.concat(res.rows);
            }
            this.loading = false;
        },
        handleScroll(dom) {
            if (this.loading || !dom) return;

            const range = 150; // 定一个可接受的范围，在这个范围内都算达到了底部
            const { scrollHeight, scrollTop, clientHeight } = dom;
            if (scrollHeight - scrollTop - clientHeight <= range) {
                this.loadMore();
            }
        }
    }
};
</script>

<style lang="less">
.comment-container {
    width: 700px;
    margin: 0 auto;
}

@media screen and  (max-width: 1300px) {
    .comment-container {
        width: 100%;
    }
}
@media screen and (max-width: 480px) {
    .message-container {
        padding: 20px;
    }
}
</style>