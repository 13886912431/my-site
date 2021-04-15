<template>
    <div class="spinner" :style="{
        background: '#1890ff'
    }"></div>
</template>

<script>
export default {
    name: "Loading",
};
</script>

<style scoped>
.spinner {
    width: 60px;
    height: 60px;
    animation: rotateplane 1s infinite ease-in-out;
    position: relative;
    left: 50%;
    top: 50%;
    margin: -30px 0 0 -30px;
    user-select: none;
    pointer-events: none;
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
