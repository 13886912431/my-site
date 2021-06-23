<template>
    <div class="article-toc-container">
        <h2>目录</h2>
        <CatalogList :list="list" @select="handleSelect" />
    </div>
</template>

<script>
import CatalogList from '@/components/CatalogList';

export default {
    name: 'ArticleToc',
    components: {
        CatalogList,
    },
    data() {
        return {
            activeAnchor: '',
            doms: [],
        };
    },
    created() {
        this.$bus.on('scroll', this.setSelected);
    },
    destroyed() {
        this.$bus.remove('scroll', this.setSelected);
    },
    mounted() {
        this.doms = document.querySelectorAll('.v-md-editor-preview [data-v-md-heading]');
    },
    computed: {
        list() {
            return Array.from(this.doms).map(el => ({
                name: el.innerText,
                line: el.getAttribute('data-v-md-line'),
                selected: this.activeAnchor === el.innerText,
            }));
        },
    },
    methods: {
        handleSelect(select) {
            this.$bus.emit('selectToc', select.line);
        },
        setSelected() {
            const range = 150;
            for (const dom of this.doms) {
                const { top } = dom.getBoundingClientRect();
                if (top <= range && top >= 0) {
                    // 在规定范围内
                    this.activeAnchor = dom.innerText;
                    return;
                } else if (top > range) {
                    // 在规定范围下方
                    return;
                } else {
                    // 在规定范围上方
                    this.activeAnchor = dom.innerText;
                }
            }
        },
    },
};
</script>
