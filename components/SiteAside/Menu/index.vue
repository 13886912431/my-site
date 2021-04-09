<template>
    <nav class="menu-container">
        <nuxt-link
            v-for="(it, i) in items"
            :key="it.path"
            :to="it.path"
            :exact="it.exact"
            @click.native="handleClick"
        >
            <AIcon :type="it.icon" />
            <span>{{ it.content }}</span>
        </nuxt-link>
    </nav>
</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            items: [
                {
                    path: "/",
                    icon: "home",
                    content: "首页",
                    exact: true,
                },
                {
                    path: "/article",
                    icon: "edit",
                    content: "文章",
                    exact: false,
                },
                // {
                //     path: "/about",
                //     icon: "smile",
                //     content: "关于我",
                //     exact: true,
                // },
                {
                    path: "/project",
                    icon: "project",
                    content: "项目",
                    exact: false,
                },
                {
                    path: "/message",
                    icon: "message",
                    content: "留言板",
                    exact: true,
                }
            ],
        };
    },
    methods: {
        handleClick() {
            this.$bus.emit('menuOpen', true);
        }
    }
};
</script>

<style lang="less" scoped>
.menu-container {
    color: @gray;
    a {
        padding-left: 50px;
        display: flex;
        align-items: center;
        height: 45px;
        white-space: nowrap;
        transition: 0.3s;
        .anticon {
            margin-right: 10px;
            font-size: 16px;
        }
        &:hover {
            color: #fff;
        }
        &.nuxt-link-active {
            background: #2479cc;
            color: #fff;
        }
    }
}
</style>
