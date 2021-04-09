<template>
    <div class="error-contianer">
        <h1>错误</h1>
        <h3>{{ error.message }}</h3>
    </div>
</template>

<script>
export default {
    name: "error",
    props: ['error']
}
</script>

<style lang="less" scoped>
.error-contianer {
    color: #f00;
    text-align: center;
    padding: 30px 0;
}
</style>