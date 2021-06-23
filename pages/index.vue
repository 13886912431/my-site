<template>
    <div class="home-container pr" @wheel="handleWheel">
        <SquareLoading v-if="loading" />

        <el-carousel
            ref="carousel"
            height="100%"
            :interval="5000"
            arrow="always"
        >
            <el-carousel-item v-for="item in banner" :key="item.id">
                <CarouselItem :data="item" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import CarouselItem from '@/components/CarouselItem';
import SquareLoading from '@/components/SquareLoading';
import { mapState } from 'vuex';

export default {
    name: 'Home',
    components: {
        CarouselItem,
        SquareLoading,
    },
    data() {
        return {
            loading: true,
            loaded: 0,
        };
    },
    async fetch({ $api: { getBanner }, store: { dispatch } }) {
        await dispatch('banner/fetchData', getBanner);
    },
    computed: {
        ...mapState('banner', {
            banner: 'data'
        }),
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
            this.loaded++;
            if (this.loaded >= this.banner.length && this.loading) {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-carousel {
    height: 100%;
    /deep/.el-carousel__arrow  {
        &.el-carousel__arrow--left {
            animation: jump-left infinite 2s;
        }
        &.el-carousel__arrow--right {
            animation: jump-right infinite 2s;
        }
        @jump: 10px;
        @keyframes jump-left {
            0% {
                transform: translateX(@jump);
            }
            50% {
                transform: translateX(-@jump);
            }
            100% {
                transform: translateX(@jump);
            }
        }
        @keyframes jump-right {
            0% {
                transform: translateX(-@jump);
            }
            50% {
                transform: translateX(@jump);
            }
            100% {
                transform: translateX(-@jump);
            }
        }
    }
}
</style>
