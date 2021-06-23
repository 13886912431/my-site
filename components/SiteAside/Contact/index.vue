<template>
    <div class="contact-container">
        <div class="item" v-for="(item, index) in items" :key="index">
            <a
                :href="item.link || 'javascript: void(0)'"
                :target="item.link && '_black'"
                class="align-center pr"
            >
                <i class="iconfont" :class="item.icon"></i>
                <span>{{ item.content }}</span>
                <div class="popup" v-if="item.qrcode">
                    <el-image :src="item.qrcode" fit="cover" />
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    data() {
        const setting = this.$store.state.setting.data;
        return {
            items: [
                {
                    link: setting.github,
                    content: setting.githubName,
                    icon: 'icon-github',
                },
                {
                    link: `mailto:${setting.email}`,
                    content: setting.email,
                    icon: 'icon-youxiang',
                },
                {
                    link: `tencent://message/?Menu=yes&uin=${setting.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`,
                    content: setting.qq,
                    icon: 'icon-qq',
                    qrcode: setting.qq_qrcode,
                },
                {
                    link: '',
                    content: setting.wx,
                    icon: 'icon-wx',
                    qrcode: setting.wx_qrcode,
                },
            ],
        };
    }
};
</script>

<style lang="less" scoped>
@import 'https://at.alicdn.com/t/font_2629690_abvii5v3izj.css';

.contact-container {
    width: 100%;
    color: var(--color-light-text);
    padding: 20px;
    box-sizing: border-box;
    .item {
        height: 30px;
        line-height: 30px;
        padding: 7px 0;
    }
    a {
        white-space: nowrap;
        font-size: 14px;
        transition: 0.2s;
        i {
            margin-right: 8px;
            font-size: 22px;
        }
        &:hover {
            color: var(--color-white);
            .popup {
                transform: scaleY(1);
            }
        }
        .popup {
            background: var(--color-white);
            position: absolute;
            left: 0;
            bottom: calc(100% + 2px);
            box-shadow: 0 0 3px var(--color-black);
            padding: 5px;
            border-radius: 5px;
            cursor: auto;
            transform-origin: center bottom;
            transition: transform 0.2s;
            transform: scaleY(0);
            &::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 50%;
                transform: translateX(-50%) rotate(45deg);
                width: 8px;
                height: 8px;
                background: var(--color-white);
                border-radius: 1px;
            }
            .el-image {
                width: 150px;
                height: 150px;
            }
        }
    }
}
</style>
