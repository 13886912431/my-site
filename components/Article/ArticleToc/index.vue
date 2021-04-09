<template>
    <div class="article-toc-container">
        <h2>目录</h2>
        <CatalogList :list="tocWithSeleted" @select="handleSelect" />
    </div>
</template>

<script>
import CatalogList from "@/components/CatalogList";

import { debounce } from "@/utils";

export default {
    name: "ArticleToc",
    components: {
        CatalogList
    },
    props: {
        toc: {
            type: Array,
        }
    },
    data() {
        return {
            activeAnchor: "",
        }
    },
    created() {
        this.setSelectedDebounce = debounce(this.setSelected, 50);
        this.$bus.on("scroll", this.setSelectedDebounce);
    },
    destroyed() {
        this.$bus.remove("scroll", this.setSelectedDebounce);
    },
    computed: {
        // 根据toc和activeAnchor属性得到带有seleted属性的toc数据
        tocWithSeleted() {
            const getToc = (toc = []) => {
                return toc.map(it => ({
                    ...it,
                    selected: it.anchor === this.activeAnchor,
                    children: getToc(it.children)
                }))
            }
            return getToc(this.toc);
        },
        doms() {
            const doms = [];
            const addDom = (toc = []) => {
                for (const it of toc) {
                    const dom = document.getElementById(it.anchor);
                    dom && doms.push(dom);
                    addDom(it.children);
                }
            }
            addDom(this.toc);
            return doms;
        }
    },
    methods: {
        handleSelect(data) {
            this.activeAnchor = data.anchor;
        },
        setSelected() {
            const range = 150;
            for (const dom of this.doms) {
                const { top } = dom.getBoundingClientRect();
                if (top <= range && top >= 0) {
                    // 在规定范围内
                    this.activeAnchor = dom.id
                    return;
                } else if (top > range) {
                    // 在规定范围下方
                    return;
                } else {
                    // 在规定范围上方
                    this.activeAnchor = dom.id
                }
            }
        }
    }
}
</script>