<template>
    <div class="carousel-item-container oh pr" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <img
            :src="data.image"
            @load="handleLoad"
            ref="image"
            :style="{
                transform: `translate(${imagePos.left}px, ${imagePos.top}px)`,
            }"
        />
        <div class="title" ref="title">{{ data.title }}</div>
        <div class="desc" ref="desc">{{ data.description }}</div>
    </div>
</template>

<script>
import { nextFrame } from '@/utils';

export default {
    name: 'CarouselItem',
    data() {
        return {
            titleWidth: 0,
            descWidth: 0,
            containerSize: null,
            imageSize: null,
            mouseX: 0,
            mouseY: 0,
        };
    },
    props: {
        data: Object
    },
    computed: {
        imagePos() {
            if (!this.containerSize || !this.imageSize) return {};

            const extraWidth = this.imageSize.width - this.containerSize.width;
            const extraHeight = this.imageSize.height - this.containerSize.height;

            const left = (extraWidth / this.containerSize.width) * this.mouseX;
            const top = (extraHeight / this.containerSize.height) * this.mouseY;
            return {
                left: -left,
                top: -top,
            };
        },
        center() {
            return {
                x: this.containerSize.width / 2,
                y: this.containerSize.height / 2,
            };
        },
    },
    mounted() {
        this.$nextTick(() => {
            const { title, desc } = this.$refs;
            this.titleWidth = title.clientWidth;
            this.descWidth = desc.clientWidth;
        })

        this.setSize();
        this.mouseX = this.center.x;
        this.mouseY = this.center.y;
        window.addEventListener('resize', this.setSize);
    },
    destroyed() {
        window.removeEventListener('resize', this.setSize);
    },
    methods: {
        handleLoad() {
            this.showText();
            this.$emit('load');
        },
        showText() {
            const { title, desc } = this.$refs;
            title.style.opacity = 1;
            title.style.width = '0px';
            title.style.transition = 'width 1s 1s';
            desc.style.width = '0px';
            desc.style.opacity = 1;
            desc.style.transition = 'width 1s 2s';
            nextFrame(() => {
                title.style.width = this.titleWidth + 'px';
                desc.style.width = this.descWidth + 'px';
            });
        },
        handleMouseMove(e) {
            const { container } = this.$refs;
            const { left, top } = container.getBoundingClientRect();
            this.mouseX = e.clientX - left;
            this.mouseY = e.clientY - top;
        },
        setSize() {
            const { image, container } = this.$refs;
            const { clientWidth: containerWidth, clientHeight: containerHeight } = container;
            this.containerSize = {
                width: containerWidth,
                height: containerHeight,
            };
            const { clientWidth: imageWidth, clientHeight: imageHeight } = image;
            this.imageSize = {
                width: imageWidth,
                height: imageHeight,
            };
        },
        handleMouseLeave() {
            this.mouseX = this.center.x;
            this.mouseY = this.center.y;
        },
    },
};
</script>

<style lang="less" scoped>
.carousel-item-container {
    height: 100%;
    user-select: none;
    img {
        object-fit: cover;
        width: 115%;
        height: 115%;
        position: absolute;
        left: 0;
        top: 0;
        transition: transform 0.3s linear;
    }
    .title,
    .desc {
        position: absolute;
        left: 30px;
        letter-spacing: 3px;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5), 0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
        opacity: 0;
        white-space: nowrap;
        overflow: hidden;
    }
    .title {
        color: var(--color-white);
        font-size: 2em;
        top: calc(60% - 40px);
    }
    .desc {
        top: calc(60% + 20px);
        font-size: 1.2em;
        color: var(--color-light-text);
    }
}
</style>
