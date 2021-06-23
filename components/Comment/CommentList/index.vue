<template>
    <div class="comment-list-container">
        <div v-for="item in list" :key="item.id" class="item">
            <el-avatar :src="item.avatar" :size="44" />
            <div class="data pr">
                <div class="nickname">{{ item.nickname }}</div>
                <div class="content">{{ item.content }}</div>
                <div class="time pa">{{ formatDate(item.createdAt) }}</div>
            </div>
        </div>

        <div
            class="loading align-justify-center"
            v-loading="listLoading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
        >
            <span v-if="finished">没有了啦~</span>
        </div>
    </div>
</template>

<script>
import { formatDate } from "@/utils";

export default {
    name: "CommentList",
    props: {
        list: {
            type: Array,
            default: () => []
        },
        listLoading: Boolean,
        finished: Boolean
    },
    methods: {
        formatDate
    }
};
</script>

<style scoped lang="less">
.comment-list-container {
    .item {
        display: flex;
        padding: 15px 0;
        &:not(:last-of-type) {
            border-bottom: 1px solid var(--color-gray);
        }
    }
    .el-avatar {
        margin-right: 15px;
        flex: 0 0 auto;
    }
    .nickname {
        color: var(--color-success);
        margin-bottom: 10px;
    }
    .content {
        font-size: 14px;
    }
    .data {
        flex: 1 1 auto;
    }
    .time {
        right: 0;
        top: 2px;
        font-size: 12px;
        color: var(--color-gray);
    }
    .loading {
        width: 100%;
        height: 100px;
        span {
            color: var(--color-primary);
        }
    }
}
</style>
