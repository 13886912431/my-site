<template>
    <div class="app-container">
        <Header :open="open" @toggleOpen="toggleOpen" />
        <Layout>
            <template #left>
                <div class="aside" :class="{ open: !open }">
                    <SiteAside />
                 </div>
            </template>
            <template>
                <div class="main">
                    <Nuxt />
                </div>
            </template>
        </Layout>

        <ToTop />
    </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import Header from "@/components/Header";
import ToTop from "@/components/ToTop";

import { debounce } from "@/utils";

export default {
    name: "App",
    components: {
        Layout,
        SiteAside,
        Header,
        ToTop
    },
    data() {
        return {
            open: true
        }
    },
    methods: {
        resize() {
            if (window.innerWidth > 768) {
                this.open = false;
            } else {
                this.open = true;
            }
        },
        toggleOpen(val) {
            this.open = val;
        }
    },
    created() {
        this.$bus.on('menuOpen', this.toggleOpen);   
    },
    async mounted() {
        const resizeDebounce = debounce(this.resize, 200);
        window.addEventListener('resize', resizeDebounce);
    }
}
</script>

<style lang="less" scoped>
.app-container {
    .self-fill(fixed);
    .aside {
        width: 250px;
        height: 100%;
        transition: transform 0.3s;
        &.open {
            transform: translateX(0px);
        }
    }
    .main {
        width: 100%;
        height: 100%;
    }
}
@media screen and (max-width: 768px) {
    .aside {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 200;
        transform: translateX(-250px);
    }
    .app-container {
        padding-top: 50px;
    }
}
</style>

<style lang="less">
body {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    color: @words;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}
</style>