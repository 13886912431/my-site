<template>
    <div class="layout-container">
        <div class="left-container">
            <slot name="left" />
        </div>
        <div class="main-container">
            <slot />
        </div>
        <div class="right-container">
            <slot name="right" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Layout",
}
</script>

<style lang="less" scoped>
.layout-container {
    width: 100%;
    height: 100%;
    display: flex;
    .left-container,
    .right-container {
        flex: 0 0 auto;
        overflow: hidden;
    }
    .main-container {
        flex: 1 1 auto;
        overflow: hidden;
    }
}
</style>