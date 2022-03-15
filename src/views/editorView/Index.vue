<template>
    <div class="bg-hex-1d2127 relative h-full">
        <div ref="RulerWrap" class="absolute left-0 top-0 w-full bottom-30px" border="l-1px t-1px color-#303639">
            <div class="absolute left-0 top-0 w-20px h-20px box-border" border="r-1px b-1px color-#303639"></div>
            <div class="absolute">
                <canvas-ruler :opt="leftRulerOpt" class="absolute left-0 top-20px w-20px h-full"></canvas-ruler>
                <canvas-ruler :opt="rightRulerOpt" class="absolute left-20px top-0 h-20px h-full"></canvas-ruler>
            </div>
            <div class="screen absolute left-20px top-20px right-0 bottom-0 z-1"></div>
        </div>
        <div class="h-30px absolute left-0 bottom-0 w-full bg-#222528"></div>
    </div>
</template>

<script lang="ts" setup>
// import VueDragResize from 'vue-drag-resize';
import CanvasRuler from './CanvasRuler.vue';
import type { RulerOpt } from './utils';

const RulerWrap = ref<HTMLElement>();
const rulerSize = ref({ width: 0, height: 0 });
onMounted(() => {
    if (!RulerWrap.value) return;
    rulerSize.value = {
        width: RulerWrap.value.clientWidth - 20,
        height: RulerWrap.value.clientHeight - 20,
    };
});

const scale = ref(1);
const ratio = window.devicePixelRatio;
const leftRulerOpt = computed<RulerOpt>(() => {
    return {
        ...rulerSize.value,
        direction: 'vertical',
        scale: scale.value,
        start: 0,
        ratio,
    };
});
const rightRulerOpt = computed<RulerOpt>(() => {
    return {
        ...rulerSize.value,
        direction: 'horizontal',
        scale: scale.value,
        start: 0,
        ratio,
    };
});
</script>

<style scoped lang="less">
.screen {
    background-image: url('@/assets/images/point-bg.png');
}
</style>
