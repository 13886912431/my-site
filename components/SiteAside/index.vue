<template>
    <div class="site-aside-container">
        <AAvatar :src="setting.avatar" :size="150" />
        <h1 class="title">{{ setting.siteTitle }}</h1>
        <Menu />
        <Contact />
        <div class="copyright">{{ setting.icp }}</div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import Contact from "./Contact";
import Menu from './Menu';

export default {
    name: "SiteAside",
    components: {
        Contact,
        Menu
    },
    computed: {
        ...mapState("setting", {
            "setting": "data"
        })
    }
}
</script>

<style lang="less" scoped>
.site-aside-container {
    width: 100%;
    height: 100%;
    background: @dark;
    padding: 40px 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    &::-webkit-scrollbar {
        display: none;
    }
}
.ant-avatar {
    display: block;
    margin: 0 auto;
}
.menu-container {
    margin: 24px 0;
}
.copyright {
    text-align: center;
    font-size: 12px;
    padding: 0 20px;
}
.title {
    text-align: center;
    font-size: 18px;
    color: #fff;
    padding: 10px 0;
}
</style>