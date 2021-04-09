<template>
    <form
        id="comment"
        ref="form"
        @submit.prevent="handleSubmit"
        class="comment-form-container"
    >
        <div class="form-item">
            <div class="input-area">
                <input
                    type="text"
                    maxlength="10"
                    v-model.trim="formData.nickname"
                    placeholder="昵称"
                />
                <span class="tip">{{ formData.nickname.length }}/10</span>
            </div>
            <div class="error">{{ error.nickname }}</div>
        </div>
        <div class="form-item">
            <div class="text-area">
                <textarea
                    maxlength="300"
                    placeholder="输入内容"
                    v-model.trim="formData.content"
                ></textarea>
                <span class="tip">{{ formData.content.length }}/300</span>
            </div>
            <div class="error">{{ error.content }}</div>
        </div>
        <div class="form-item">
            <div class="button-area">
                <button :disabled="submiting">
                    {{ submiting ? "提交中..." : "提交" }}
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { message } from 'ant-design-vue/lib';

export default {
    name: "CommentForm",
    data() {
        return {
            formData: {
                nickname: "",
                content: "",
            },
            error: {
                nickname: "",
                content: "",
            },
            submiting: false
        };
    },
    methods: {
        handleSubmit() {
            this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
            this.error.content = this.formData.content ? "" : "请填写内容";
            if (this.error.nickname || this.error.content) {
                // 有错误
                return;
            }
            this.submiting = true;  // 正在提交，防止重复点击

            // 让父组件来处理事件
            this.$emit("submit", this.formData, (msg) => {
                this.submiting = false;
                this.formData.nickname = "";
                this.formData.content = "";
                message.success(msg);
            });
        }
    }
};
</script>

<style scoped lang="less">
.comment-form-container {
    padding: 20px 0;
    overflow: hidden;
}
.form-item {
    margin-bottom: 8px;
}
.input-area {
    width: 50%;
    position: relative;
}
.text-area {
    position: relative;
}
.tip {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #b4b8bc;
    font-size: 12px;
}
input,
textarea {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: 1px dashed @gray;
    color: @words;
    font-size: 14px;
    border-radius: 4px;
    &:focus {
        border-color: @primary;
    }
}
input {
    padding: 0 15px;
    height: 40px;
}
textarea {
    resize: none;
    padding: 8px 15px;
    height: 120px;
}
.error {
    margin-top: 6px;
    color: @danger;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
}
button {
    position: relative;
    cursor: pointer;
    width: 100px;
    height: 34px;
    color: #fff;
    border-radius: 4px;
    background: @primary;
    &:hover {
        background: darken(@primary, 10%);
    }
    &:disabled {
        background: lighten(@primary, 20%);
        cursor: not-allowed;
    }
}
</style>
