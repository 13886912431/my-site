<template>
    <header class="header-container align-justify-between" :class="{ open: !open }">
        <el-button type="primary" size="small" @click="$emit('toggleOpen', !open)">
            <i :class="open ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </el-button>
        <h1 class="title">{{ setting.siteTitle }}</h1>
        <el-avatar :src="setting.avatar" :size="40" />
    </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Header',
    props: {
        open: Boolean
    },
    computed: {
        ...mapState('setting', {
            setting: 'data',
        }),
    },
};
</script>

<style lang="less" scoped>
.header-container {
    height: 50px;
    transition: transform 0.3s;
    background: #323436;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    &.open {
        transform: translateX(250px);
    }
}
.title {
    font-size: 1em;
    font-weight: bold;
    color: var(--color-white);
}

@media screen and (min-width: 768px) {
    .header-container {
        display: none;
    }
}
</style>
