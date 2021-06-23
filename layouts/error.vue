<template>
    <div class="error-contianer text-center">
        <h1>错误</h1>
        <h3>{{ error.message }}</h3>
    </div>
</template>

<script>
export default {
    name: 'error',
    props: {
        error: Object
    },
};
</script>

<style lang="less" scoped>
.error-contianer {
    color: var(--color-danger);
    padding: 30px 0;
}
</style>
