<template>
    <div class="square-loading-container" :style="{
        background: color,
    }"></div>
</template>

<script>
export default {
    name: "SquareLoading",
    props: {
        color: {
            type: String,
            default: "#1890ff"
        }
    },
};
</script>

<style scoped>
.square-loading-container {
    width: 60px;
    height: 60px;
    animation: rotateplane 1s infinite ease-in-out;
    left: 50%;
    top: 50%;
    margin: -30px 0 0 -30px;
    position: absolute;
    background: #e6f7ff;
    user-select: none;
    pointer-events: none;
    z-index: 2021;
}

@keyframes rotateplane {
    0% {
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
        transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
    }
    100% {
        transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
    }
}
</style>
