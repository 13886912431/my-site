<template>
    <div class="site-aside-container">
        <el-avatar :src="setting.avatar" :size="150" />
        <h1 class="title text-center">{{ setting.siteTitle }}</h1>
        <Menu />
        <Contact />
        <div class="copyright text-center">{{ setting.icp }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Contact from './Contact';
import Menu from './Menu';

export default {
    name: 'SiteAside',
    components: {
        Contact,
        Menu,
    },
    computed: {
        ...mapState('setting', {
            setting: 'data',
        }),
    },
};
</script>

<style lang="less" scoped>
.site-aside-container {
    width: 100%;
    height: 100%;
    background: var(--color-menu-bg);
    padding: 40px 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
}
.el-avatar {
    margin: 0 auto;
}
.menu-container {
    margin: 24px 0;
}
.copyright {
    font-size: 12px;
    padding: 0 20px;
    color: var(--color-light-text);
}
.title {
    font-size: 18px;
    color: var(--color-white);
    padding: 10px 0;
}
</style>
