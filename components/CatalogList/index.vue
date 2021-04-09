<template>
    <ul class="catalog-list-container">
        <li v-for="(it, i) in list" :key="i" @click.stop="handleClick(it)">
            <component 
                :is="it.anchor ? 'a': 'div'"
                :href="it.anchor && '#' + it.anchor"
                :class="{ active: it.selected }"
                class="it"
            >
                <span >{{ it.name }}</span>
                <span class="count" v-if="it.articleCount">{{ it.articleCount }}篇</span>
            </component>
            </span>
            <CatalogList v-if="it.children && it.children.length" :list="it.children" @select="handleClick" />
        </li>
    </ul>
</template>

<script>
export default {
    name: "CatalogList",
    props: {
        list: {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        handleClick(it) {
            this.$emit("select", it);
        },
    }
};
</script>

<style lang="less" scoped>
.catalog-list-container {
    font-size: 14px;
    li {
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
