<template>
    <div class="catalog-list-container">
        <div class="list" v-for="(it, i) in list" :key="i" @click.stop="handleClick(it)">
            <div :class="{ active: it.selected }" class="it">
                <span>{{ it.name }}</span>
                <span class="count" v-if="it.articleCount">{{ it.articleCount }}篇</span>
            </div>
            <!-- <CatalogList v-if="it.children && it.children.length" :list="it.children" @select="handleClick" /> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "CatalogList",
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleClick(it) {
            this.$emit("select", it);
        },
    },
};
</script>

<style lang="less" scoped>
.catalog-list-container {
    font-size: 14px;
    list-style: none;
    padding: 0;
    margin: 0;
    .list {
        .active,
        .active .count {
            color: @warn !important;
            font-weight: bold;
        }
        .it {
            display: block;
            padding: 10px 0;
            cursor: pointer;
            &:hover {
                color: #40a9ff; 
            }  
        }
    }
    .catalog-list-container {
        margin-left: 1em;
    }
    .count {
        font-size: 12px;
        margin-left: 1em;
        color: @gray;
    }
}
</style>
