<template>
    <div class="home-container" @wheel="handleWheel">
        <SquareLoading v-if="loading" />

        <ACarousel dot-position="right" arrows ref="carousel">
            <div slot="prevArrow" slot-scope="props" class="arrow up">
                <AIcon type="up-circle" />
            </div>
            <div slot="nextArrow" slot-scope="props" class="arrow down">
                <AIcon type="down-circle" />
            </div>
            <CarouselItem v-for="it in data" :key="it.id" :data="it" @load="handleLoad" />
        </ACarousel>
    </div>
</template>

<script>
import CarouselItem from "@/components/CarouselItem";
import SquareLoading from "@/components/SquareLoading";
import { mapState } from "vuex";

export default {
    name: "Home",
    components: {
        CarouselItem,
        SquareLoading
    },
    data () {
        return {
            loading: true,
            num: 0,
        }
    },
    async fetch({ $api: { getBanner }, store: { dispatch } }) {
        await dispatch("banner/fetchData", getBanner);
    },
    computed: {
        ...mapState("banner", ['data']),
    },
    methods: {
        handleWheel(e) {
            const { carousel } = this.$refs;
            if (e.deltaY > 0) {
                carousel.next();
            } else {
                carousel.prev();
            }
        },
        handleLoad() {
            this.num++;
            if (this.num >= this.data.length && this.loading) {
                this.loading = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
    position: relative;
}
.ant-carousel {
    height: 100%;
    /deep/ .slick-slide {
        border: none;
        height: 100vh;
        > div {
            height: 100%;
        }
    }
    .arrow {
        font-size: 30px;
        width: 30px;
        height: 30px;
        color: @gray;
        cursor: pointer;
        transform: translateX(-50%);
        left: 50%;
        @gap: 25px;
        opacity: 0.5;
        transition: opacity 0.3s;
        &.arrow::before {
            display: none;
        }
        &.arrow:hover {
            opacity: 1;
        }
        &.up {
            top: @gap;
            z-index: 1;
            animation: jump-up infinite 2s;
        }
        &.down {
            top: auto;
            bottom: @gap;
            animation: jump-down infinite 2s;
        }
        @jump: 10px;
        @keyframes jump-up {
            0% {
                transform: translate(-50%, @jump);
            }
            50% {
                transform: translate(-50%, -@jump);
            }
            100% {
                transform: translate(-50%, @jump);
            }
        }
        @keyframes jump-down {
            0% {
                transform: translate(-50%, -@jump);
            }
            50% {
                transform: translate(-50%, @jump);
            }
            100% {
                transform: translate(-50%, -@jump);
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .ant-carousel {
        /deep/ .slick-slide {
            height: calc(100vh - 50px) !important;
        }
    }
}
</style>
