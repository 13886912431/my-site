<template>
    <div class="message-container" ref="container">
        <Comment
            title="留言板"
            :subTitle="`(${total})`"
            :listLoading="loading"
            :list="rows"
            :finished="finished"
            @submit="onSubmit"
        />
    </div>
</template>

<script>
import Comment from '@/components/Comment';

import scroll from '@/mixins/scroll';
import { debounce } from '@/utils';

export default {
    data() {
        return {
            page: 1,
            limit: 10,
            finished: false,
            loading: false,
        };
    },
    components: {
        Comment,
    },
    mixins: [scroll('container')],
    created() {
        this.handleScrollDebounce = debounce(this.handleScroll, 50);
        this.$bus.on('scroll', this.handleScrollDebounce);
    },
    destroyed() {
        this.$bus.remove('scroll', this.handleScrollDebounce);
    },
    async asyncData({ $api }) {
        return await $api.getMessage({
            page: 1,
            limit: 10,
        });
    },
    methods: {
        fetchData() {
            return this.$api.getMessage({
                page: this.page,
                limit: this.limit,
            });
        },
        handleScroll(dom) {
            if (this.loading || !dom) return;

            const range = 150; // 定一个可接受的范围，在这个范围内都算达到了底部
            const { scrollHeight, scrollTop, clientHeight } = dom;
            if (scrollHeight - scrollTop - clientHeight <= range) {
                this.loadMore();
            }
        },
        // 加载更多留言
        async loadMore() {
            if (this.finished) return;
            if (this.rows.length >= this.total) {
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
                this.rows = this.rows.concat(res.rows);
                this.total = res.total;
            }
            this.loading = false;
        },
        async onSubmit(formData, callback) {
            const res = await this.$api.submitMessage(formData);
            this.rows.unshift(res);
            this.total++;
            callback('感谢您的留言');
        },
    },
};
</script>

<style scoped>
.message-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 20px 40px;
    box-sizing: border-box;
    scroll-behavior: smooth;
}
.comment-container {
    width: 700px;
    margin: 0 auto;
}

@media screen and (max-width: 992px) {
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
