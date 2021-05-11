<template>
    <div class="comment-list-container">
        <div v-for="it in list" :key="it.id" class="item">
            <AAvatar :src="it.avatar" :size="44" />
            <div class="data">
                <div class="nickname">{{ it.nickname }}</div>
                <div class="content">{{ it.content }}</div>
                <div class="time">{{ formatDate(it.createdAt) }}</div>
            </div>
        </div>

        <div class="loading">
            <ASpin size="large" v-if="listLoading" />
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
            border-bottom: 1px solid lighten(@gray, 20%);
        }
    }
    .ant-avatar {
        margin-right: 15px;
        flex: 0 0 auto;
    }
    .nickname {
        color: darken(@success, 10%);
        margin-bottom: 10px;
    }
    .content {
        font-size: 14px;
    }
    .data {
        flex: 1 1 auto;
        position: relative;
    }
    .time {
        position: absolute;
        right: 0;
        top: 5px;
        font-size: 12px;
        color: @gray;
    }
    .loading {
        width: 100%;
        height: 100px;
        .inner-center();
        span {
            color: @primary;
            line-height: 100px;
        }
    }
}
</style>
