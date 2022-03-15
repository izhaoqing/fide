<template>
    <div>
        <canvas ref="rulerCanvas"></canvas>
    </div>
</template>

<script lang="ts" setup>
import type { RulerOpt } from './utils';
import drawRuler from './utils';

const props = defineProps<{
    opt: RulerOpt;
}>();

const rulerCanvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D;

const init = () => {
    if (!rulerCanvas.value) return;
    let { width, height } = props.opt;
    const { ratio } = props.opt;
    if (width === 0 || height === 0) return;

    if (props.opt.direction === 'vertical') {
        width = 20;
    }
    if (props.opt.direction === 'horizontal') {
        height = 20;
    }

    rulerCanvas.value.width = width;
    rulerCanvas.value.height = height;

    ctx = rulerCanvas.value.getContext('2d') as CanvasRenderingContext2D;
    ctx.font = `${20 / ratio}px -apple-system, 
        "Helvetica Neue", ".SFNSText-Regular", 
        "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB", 
        "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`;
    ctx.lineWidth = 1;
    ctx.textBaseline = 'middle';
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, width, height);

    // 画标尺底色
    ctx.fillStyle = '#0e0f12';
    ctx.fillRect(0, 0, width, height);

    drawRuler(ctx, props.opt);
};
onMounted(init);
watch(() => props.opt, init);

</script>

<style scoped lang="less">
</style>
