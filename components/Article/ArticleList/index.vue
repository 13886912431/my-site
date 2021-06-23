<template>
    <div class="article-list-container" ref="container">
        <!-- <AEmpty description="暂无文章" v-if="data.rows.length === 0" /> -->

        <div class="list">
            <div v-for="item in data.rows" :key="item.id" class="item">
                <div class="thumb" v-if="item.thumb">
                    <nuxt-link :to="'/article/' + item.id">
                        <el-image :src="item.thumb" :alt="item.title" :title="item.title" />
                    </nuxt-link>
                </div>
                <div class="main">
                    <h2>
                        <nuxt-link class="link" :to="'/article/' + item.id">
                            {{ item.title }}
                        </nuxt-link>
                    </h2>
                    <div class="aside">
                        <span>日期：{{ formatDate(item.createdAt) }}</span>
                        <span>浏览：{{ item.scanCount }}</span>
                        <span>评论：{{ item.commentCount }}</span>
                        <nuxt-link :to="'/article/classify/' + item.classify.id">
                            {{ item.classify.name }}
                        </nuxt-link>
                    </div>
                    <div class="desc">{{ item.description }}</div>
                </div>
            </div>

            <el-pagination
                background
                layout="prev, pager, next"
                :current="queryInfo.page"
                :total="data.total"
                hide-on-single-page
                :page-size="queryInfo.limit"
                @change="onChangePage" 
            />
        </div>
    </div>
</template>

<script>
import scroll from '@/mixins/scroll';
import { formatDate } from '@/utils';

export default {
    name: 'ArticleList',
    mixins: [scroll('container')],
    props: {
        data: {
            type: Object,
            default: () => ({ rows: [], total: 0 }),
        },
    },
    computed: {
        // 将分页信息放到query中
        queryInfo() {
            const classifyId = +this.$route.params.id || -1; // 分类id
            const page = +this.$route.query.page || 1;
            const limit = +this.$route.query.limit || 10;
            return { page, limit, classifyId };
        },
    },
    methods: {
        formatDate,
        onChangePage(current) {
            const query = {
                page: current,
                limit: this.queryInfo.limit,
            };
            if (this.queryInfo.classifyId === -1) {
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
                    params: { id: this.queryInfo.classifyId },
                });
            }
        },
    },
};
</script>

<style scoped lang="less">
.article-list-container {
    line-height: 1.6;
    padding: 20px;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    scroll-behavior: smooth;
    position: relative;
    .item {
        display: flex;
        padding: 15px 0;
        &:not(:last-of-type) {
            border-bottom: 1px solid var(--color-light-text);
        }
        .thumb {
            flex: 0 0 auto;
            margin-right: 15px;
            a {
                border-radius: 5px;
                overflow: hidden;
                display: block;
            }
            .el-image {
                max-width: 230px;
            }
        }
        .main {
            flex: 1 1 auto;
            .link {
                display: block;
            }
        }
        .aside {
            font-size: 12px;
            margin-top: 5px;
            color: var(--color-light-text);
            span {
                margin-right: 15px;
            }
        }
        .desc {
            margin: 15px 0;
            font-size: 14px;
        }
    }
}
.el-pagination {
    margin: 30px auto;
    width: max-content;
}

@media screen and (max-width: 1200px) {
    .article-list-container .item .thumb .el-image {
        max-width: 200px;
    }
}
@media screen and (max-width: 992px) {
    .article-list-container .item .thumb .el-image {
        max-width: 150px;
    }
}
@media screen and (max-width: 480px) {
    .article-list-container {
        padding: 10px;
    }
    .article-list-container .item .thumb .el-image {
        max-width: 120px;
    }
}
</style>
