<template>
    <header class="header-container" :class="{ open: !open }">
        <AButton type="primary" @click="$emit('toggleOpen', !open)">
            <AIcon :type="open ? 'menu-unfold' : 'menu-fold'" />
        </AButton>
        <h1 class="title">{{ setting.siteTitle }}</h1>
        <AAvatar
            :src="setting.avatar"
            :size="40"
        />
    </header>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Header",
    props: ['open'],
    computed: {
        ...mapState("setting", {
            "setting": "data"
        })
    }
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    &.open {
        transform: translateX(250px);
    }
    .ant-btn {
        padding: 0 12px;
    }
}
.title {
    font-size: 1em;
    font-weight: bold;
    color: #ccc;
}

@media screen and (min-width: 768px) {
    .header-container {
        display: none;
    }
}
</style>
