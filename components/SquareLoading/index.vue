<template>
    <div class="square-loading"></div>
</template>

<script>
export default {
    name: 'SquareLoading',
};
</script>

<style scoped>
.square-loading {
    width: 60px;
    height: 60px;
    animation: rotate-plane 1s infinite ease-in-out;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -30px 0 0 -30px;
    user-select: none;
    pointer-events: none;
    background: var(--color-menu-active);
}

@keyframes rotate-plane {
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
