<template>
    <div class="project-container" ref="container">
        <!-- <AEmpty description="暂无项目" v-if="!loading && data.length === 0" /> -->

        <a v-for="item in data" :key="item.id" class="project-item" :href="item.url" target="_blank">
            <div class="thumb" v-if="item.thumb">
                <el-image :src="item.thumb" />
            </div>
            <div class="info">
                <h2>{{ item.name }}</h2>
                <el-link class="github" :href="item.github" target="_blank" v-if="item.github" type="primary">
                    github地址
                </el-link>
                <div>
                    <el-tag class="desc" v-for="(desc, i) in item.description" :key="i">
                        {{ desc }}
                    </el-tag>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import scroll from '@/mixins/scroll';

export default {
    mixins: [scroll('container')],
    computed: {
        ...mapState('project', ['loading', 'data']),
    },
    async fetch({ $api: { getProject }, store: { dispatch } }) {
        await dispatch('project/fetchData', getProject);
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
        .el-image {
            max-width: 230px;
        }
    }
    .info {
        line-height: 1.7;
        flex: 1 1 auto;
    }
    .github {
        margin: 5px 0;
    }
    .desc {
        margin-right: 5px;
    }
}

@media screen and (max-width: 1200px) {
    .project-item .thumb .el-image {
        max-width: 200px;
    }
}
@media screen and (max-width: 992px) {
    .project-item .thumb .el-image {
        max-width: 150px;
    }
}
@media screen and (max-width: 768px) {
    .project-item {
        padding: 10px;
    }
}
@media screen and (max-width: 480px) {
    .project-container {
        padding: 10px;
    }
    .project-item .thumb .el-image {
        max-width: 120px;
    }
}
</style>
