<template>
    <div id="comment" class="comment-form-container">
        <div class="form-item">
            <div class="input-area pr">
                <input type="text" maxlength="10" v-model.trim="formData.nickname" placeholder="昵称" />
                <span class="tip pa">{{ formData.nickname.length }}/10</span>
            </div>
            <div class="error">{{ error.nickname }}</div>
        </div>
        <div class="form-item">
            <div class="text-area pr">
                <textarea maxlength="300" placeholder="输入内容" v-model.trim="formData.content"></textarea>
                <span class="tip pa">{{ formData.content.length }}/300</span>
            </div>
            <div class="error">{{ error.content }}</div>
        </div>
        <div class="form-item">
            <div class="button-area">
                <el-button type="primary" :disabled="submiting" @click="onSubmit">
                    {{ submiting ? '提交中...' : '提交' }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
    name: 'CommentForm',
    data() {
        return {
            formData: {
                nickname: '',
                content: '',
            },
            error: {
                nickname: '',
                content: '',
            },
            submiting: false,
        };
    },
    methods: {
        onSubmit() {
            this.error.nickname = this.formData.nickname ? '' : '请填写昵称';
            this.error.content = this.formData.content ? '' : '请填写内容';
            if (this.error.nickname || this.error.content) {
                // 有错误
                return;
            }
            this.submiting = true; // 正在提交，防止重复点击

            // 让父组件来处理事件
            this.$emit('submit', this.formData, msg => {
                this.submiting = false;
                this.formData.nickname = '';
                this.formData.content = '';
                Message({
                    type: 'success',
                    message: msg
                });
            });
        },
    },
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
}
.tip {
    right: 5px;
    bottom: 5px;
    color: var(--color-gray);
    font-size: 12px;
}
input,
textarea {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: 1px dashed var(--color-gray);
    color: var(--color-dark-text);
    font-size: 14px;
    border-radius: 4px;
    &:focus {
        border-color: var(--color-primary);
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
    color: var(--color-danger);
    font-size: 14px;
    height: 20px;
    line-height: 20px;
}
button {
    width: 100px;
    border-radius: 4px;
}
</style>
