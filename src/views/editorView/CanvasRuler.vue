<template>
    <div>
        <canvas ref="rulerCanvas"></canvas>
    </div>
</template>

<script lang="ts" setup>
import type { RulerOpt } from '@/utils/editor';
import drawRuler from '@/utils/editor';

const props = defineProps<{
    opt: RulerOpt;
}>();

const rulerCanvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D;

const init = () => {
    if (!rulerCanvas.value) return;
    let { width, height } = props.opt;
    if (width === 0 || height === 0) return;

    if (props.opt.direction === 'vertical') {
        width = 20;
    }
    if (props.opt.direction === 'horizontal') {
        height = 20;
    }

    rulerCanvas.value.width = width;
    rulerCanvas.value.height = height;

    ctx = ctx || rulerCanvas.value.getContext('2d') as CanvasRenderingContext2D;
    drawRuler(ctx, props.opt);
};

onMounted(init);
watch(() => props.opt, init);
</script>

<style scoped lang="less">
</style>
