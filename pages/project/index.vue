<template>
    <ul class="project-container" ref="container">
        <AEmpty description="暂未上传项目" v-if="!loading && data.length === 0" />

        <li v-for="it in data" :key="it.id" class="project-item">
            <div class="thumb" v-if="it.thumb">
                <component
                    :is="it.url ? 'a' : 'div'"
                    :href="it.url"
                    target="_blank"
                >
                    <img :src="it.station" v-lazy="it.thumb" />
                </component>
            </div>
            <div class="info">
                <h2>
                    <component
                        :is="it.url ? 'a' : 'div'"
                        :href="it.url"
                        target="_blank"
                    >
                        {{ it.name }}
                    </component>
                </h2>
                <a
                    class="github"
                    target="_blank"
                    :href="it.github"
                    v-if="it.github"
                >
                    github
                </a>
                <p class="desc" v-for="(desc, i) in it.desc" :key="i">
                    {{ desc }}
                </p>
            </div>
        </li>
    </ul>
</template>

<script>
import scroll from "@/mixins/scroll";
import { mapState } from "vuex";

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
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        transform: scale(1.01);
    }
    .thumb {
        flex: 0 0 auto;
        margin-right: 15px;
            a,
            div {
                border-radius: 5px;
                overflow: hidden;
            }
            img {
                display: block;
                max-width: 230px;
                transition: 0.3s;
                &:hover {
                    transform: scale(1.2);
                }
            }
    }
    a {
        display: block;
    }
    .info {
        line-height: 1.7;
        flex: 1 1 auto;
    }
    .github {
        font-size: 14px;
        color: @primary;
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
