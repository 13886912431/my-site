<template>
    <div class="menu-container">
        <nuxt-link
            v-for="(item, index) in menu"
            :key="index"
            :to="item.path"
            :exact="item.exact"
            class="align-center"
            @click.native="handleClick"
        >
            <i :class="item.icon"></i>
            <span>{{ item.content }}</span>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
            menu: [
                {
                    path: '/',
                    icon: 'el-icon-house',
                    content: '首页',
                    exact: true,
                },
                {
                    path: '/article',
                    icon: 'el-icon-edit',
                    content: '文章',
                    exact: false,
                },
                {
                    path: '/project',
                    icon: 'el-icon-coin',
                    content: '项目',
                    exact: false,
                },
                {
                    path: '/message',
                    icon: 'el-icon-chat-line-square',
                    content: '留言板',
                    exact: true,
                },
            ],
        };
    },
    methods: {
        handleClick() {
            this.$bus.emit('menuOpen', true);
        },
    },
};
</script>

<style lang="less" scoped>
.menu-container {
    color: var(--color-light-text);
    a {
        padding-left: 50px;
        height: 45px;
        white-space: nowrap;
        transition: 0.3s;
        i {
            font-size: 16px;
            margin-right: 10px;
        }
        &:hover {
            color: var(--color-white);
        }
        &.nuxt-link-active {
            background: var(--color-menu-active);
            color: var(--color-white);
        }
    }
}
</style>
