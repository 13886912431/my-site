<template>
    <div class="contact-container">
        <div class="item" v-for="(it, i) in items" :key="i">
            <a :href="it.link || 'javascript: void(0)'" :target="it.link && '_black'">
                <AIcon :type="it.icon" theme="filled" />
                <span>{{ it.content }}</span>
                <div class="pop" v-if="it.qrcode">
                    <img :src="it.qrcode" />
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Contact",
    data() {
        const setting = this.$store.state.setting.data;
        return {
            items: [
                {
                    link: setting.github,
                    content: setting.githubName,
                    icon: "github",
                },
                {
                    link: `mailto:${setting.email}`,
                    content: setting.email,
                    icon: "mail",
                },
                {
                    link: `tencent://message/?Menu=yes&uin=${setting.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`,
                    content: setting.qq,
                    icon: "qq-circle",
                    qrcode: setting.qq_qrcode,
                },
                {
                    link: "",
                    content: setting.wx,
                    icon: "wechat",
                    qrcode: setting.wx_qrcode,
                }
            ]
        };
    },
    
};
</script>

<style lang="less" scoped>
.contact-container {
    width: 100%;
    color: @gray;
    padding: 20px;
    .item {
        height: 30px;
        line-height: 30px;
        margin: 14px 0;
    }
    a {
        display: flex;
        align-items: center;
        white-space: nowrap;
        font-size: 14px;
        transition: 0.2s;
        position: relative;
        .anticon {
            margin-right: 8px;
            font-size: 22px;
        }
        &:hover {
            color: #fff;
            .pop {
                transform: scaleY(1);
            }
        }
    }
    .pop {
        background: #fff;
        position: absolute;
        left: 0;
        bottom: calc(100% + 2px);
        box-shadow: 0 0 3px #000;
        padding: 5px;
        border-radius: 5px;
        cursor: auto;
        transform-origin: center bottom;
        transition: transform 0.2s;
        transform: scaleY(0);
        &::after {
            content: "";
            position: absolute;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%) rotate(45deg);
            width: 8px;
            height: 8px;
            background: #fff;
            border-radius: 1px;
        }
        img {
            width: 150px;
            height: 150px;
            object-fit: cover;
        }
    }
}
</style>
