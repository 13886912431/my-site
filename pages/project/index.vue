<template>
    <div class="project-container" ref="container">
        <AEmpty description="暂无项目" v-if="!loading && data.length === 0" />

        <a v-for="it in data" :key="it.id" class="project-item" :href="it.url" target="_blank">
            <div class="thumb" v-if="it.thumb">
                <img src="http://119.23.65.235:5008/img/loading.gif" v-lazy="it.thumb" />
            </div>
            <div class="info">
                <h2>{{ it.name }}</h2>
                <a
                    class="github"
                    :href="it.github"
                    target="_blank"
                    v-if="it.github"
                >
                    github
                </a>
                <div>
                    <ATag class="desc" v-for="(desc, i) in it.description" :key="i" color="blue">
                        {{ desc }}
                    </ATag>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
import { mapState } from "vuex";

import scroll from "@/mixins/scroll";

export default {
    mixins: [scroll("container")],
    computed: {
        ...mapState("project", ["loading", "data"])
    },
    async fetch({ $api: { getProject }, store: { dispatch } }) {
        await dispatch("project/fetchData", getProject);
    },
};
</script>

<style lang="less" scoped>
.project-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    overflow-y: auto;
    scroll-behavior: smooth;
}
.project-item {
    transition: 0.3s;
    padding: 20px;
    display: flex;
    margin-bottom: 20px;
    border-radius: 5px;
    &:hover {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        transform: scale(1.01);
    }
    .thumb {
        overflow: hidden;
        border-radius: 5px;
        flex: 0 0 auto;
        margin-right: 15px;
            img {
                display: block;
                max-width: 230px;
                transition: 0.3s;
                &:hover {
                    transform: scale(1.1);
                }
            }
    }
    .info {
        line-height: 1.7;
        flex: 1 1 auto;
        h2 {
            margin: 0;
        }
    }
    .github {
        font-size: 15px;
        color: @primary;
        display: inline-block;
        margin: 5px 0;
    }
}

@media screen and (max-width: 1200px) {
    .project-item .thumb img {
        max-width: 200px;
    }
}
@media screen and  (max-width: 992px) {
    .project-item .thumb img {
        max-width: 150px;
    }
}
@media screen and  (max-width: 768px) {
    .project-item {
        padding: 10px;
    }
}
@media screen and (max-width: 480px) {
    .project-container {
        padding: 10px;
    }
    .project-item .thumb img {
        max-width: 120px;
    }
}
</style>
