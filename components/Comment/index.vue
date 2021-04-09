<template>
    <div class="comment-container">
        <CommentForm v-on="$listeners" />
        <h3>
            {{ title }}
            <span>{{ subTitle }}</span>
        </h3>
        <CommentList :list="list" :listLoading="listLoading" :finished="finished" />
    </div>
</template>

<script>
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default {
    name: "Comment",
    props: {
        title: {
            type: String,
            default: ""
        },
        subTitle: {
            type: String,
            default: ""
        },
        list: {
            type: Array,
            default: () => []
        },
        listLoading: {
            type: Boolean,
            default: false
        },
        finished: {
            tyle: Boolean,
            default: false
        }
    },
    components: {
        CommentForm,
        CommentList,
    },
};
</script>