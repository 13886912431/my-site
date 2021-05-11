<template>
    <div class="article-list-container" ref="container">
        <AEmpty description="暂无文章" v-if="data.rows.length === 0" />

        <div class="list" v-else>
            <div v-for="it in data.rows" :key="it.id" class="item">
                <div class="thumb" v-if="it.thumb">
                    <nuxt-link :to="'/article/' + it.id">
                        <img
                            :src="it.station" 
                            v-lazy="it.thumb"
                            :alt="it.title"
                            :title="it.title"
                        />
                    </nuxt-link>
                </div>
                <div class="main">
                    <h2>
                        <nuxt-link class="link" :to="'/article/' + it.id">
                            {{ it.title }}
                        </nuxt-link>
                    </h2>
                    <div class="aside">
                        <span>日期：{{ formatDate(it.createdAt) }}</span>
                        <span>浏览：{{ it.scanCount }}</span>
                        <span>评论：{{ it.commentCount }}</span>
                        <nuxt-link :to="'/article/classify/' + it.classify.id">
                            {{ it.classify.name }}
                        </nuxt-link>
                    </div>
                    <div class="desc">{{ it.description }}</div>
                </div>
            </div>

            <APagination
                :current="routeInfo.page"
                :total="data.total"
                :page-size="routeInfo.limit"
                :hideOnSinglePage="true"
                @change="handelPageChange"
            />
        </div>
    </div>
</template>

<script>
import scroll from "@/mixins/scroll";
import { formatDate } from "@/utils";

export default {
    name: "ArticleList",
    mixins: [scroll('container')],
    props: {
        data: {
            type: Object,
            default: () => ({ rows: [], total: 0 }),
        },
    },
    computed: {
        routeInfo() {
            const classifyId = +this.$route.params.id || -1;  // 分类id
            const page = +this.$route.query.page || 1;
            const limit = +this.$route.query.limit || 10;
            return { page, limit, classifyId };
        }
    },
    methods: {
        formatDate,
        handelPageChange(current) {
            const query = {
                page: current,
                limit: this.routeInfo.limit,
            };
            if (this.routeInfo.classifyId === -1) {
                // 所有文章
                this.$router.push({
                    name: "article",
                    query,
                });
            } else {
                // 文章分类
                this.$router.push({
                    name: "article-classify-id",
                    query,
                    params: { id: this.routeInfo.classifyId }
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
            border-bottom: 1px solid @gray;
        }
        .thumb {
            flex: 0 0 auto;
            margin-right: 15px;
            a {
                border-radius: 5px;
                overflow: hidden;
                display: block;
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
        .main {
            flex: 1 1 auto;
            .link {
                display: block;
            }
        }
        .aside {
            font-size: 12px;
            margin-top: 5px;
            color: @gray;
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
.ant-pagination {
    margin: 30px auto;
    width: max-content;
}

@media screen and (max-width: 1200px) {
    .article-list-container .item .thumb img {
        max-width: 200px;
    }
}
@media screen and  (max-width: 992px) {
    .article-list-container .item .thumb img {
        max-width: 150px;
    }
}
@media screen and (max-width: 480px) {
    .article-list-container {
        padding: 10px;
    }
    .article-list-container .item .thumb img {
        max-width: 120px;
    }
}
</style>
