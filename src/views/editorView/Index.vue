<template>
    <div class="bg-hex-1d2127 relative h-full">
        <div ref="rulerWrapEl" class="absolute left-0 top-0 w-full bottom-30px" border="l-1px t-1px color-#303639">
            <div class="absolute left-0 top-0 w-20px h-20px box-border" border="r-1px b-1px color-hex-303639"></div>
            <div class="absolute">
                <canvas-ruler :opt="leftRulerOpt" class="absolute left-0 top-20px w-20px h-full"></canvas-ruler>
                <canvas-ruler :opt="topRulerOpt" class="absolute left-20px top-0 h-20px h-full"></canvas-ruler>
            </div>
            <div
                ref="viewWrapEl"
                class="screen absolute left-20px top-20px right-0 bottom-0 z-1 overflow-auto scrollbar-4px"
                @wheel="zoom"
            >
                <div :style="viewOuterStyle" transition="width,height duration-200" class="opacity-0">
                    <div
                        ref="viewEl"
                        :style="viewStyle"
                        class="origin-top-left bg-[rgba(0,0,0,0.3)]"
                        transition="transform duration-100"
                        @click="updateCurrentComId()"
                    >
                        <vue-drag-resize
                            v-for="com in preset.components"
                            :key="com.id"
                            :stick-size="10"
                            :is-active="com.id === currentComId"
                            :parent-w="preset.width"
                            :parent-h="preset.height"
                            :parent-scale-x="scale"
                            :parent-scale-y="scale"
                            :minw="com.basic.minW.value"
                            :minh="com.basic.minH.value"
                            parent-limitation
                            :w="com.basic.width.value"
                            :h="com.basic.height.value"
                            :x="com.basic.left.value"
                            :y="com.basic.top.value"
                            :z="com.basic.z.value"
                            class="com-item"
                            @click.stop="updateCurrentComId(com.id)"
                            @resizing="handleResize(com.id, $event)"
                            @dragging="handleResize(com.id, $event)"
                        >
                            <div class="absolute l-0 t-0 w-full h-full z-2"></div>
                            <component :is="com.name" :id="com.id"></component>
                        </vue-drag-resize>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end items-center h-30px absolute left-0 bottom-0 w-full bg-hex-222528 z-2">
            <div class="zoom-btn" @click="zoomOut">
                -
            </div>
            <n-select v-model:value="scaleLevel" :options="scaleLevelOpt" size="small" class="w-90px scale-80"></n-select>
            <div class="zoom-btn" @click="zoomIn">
                +
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Ref, StyleValue } from 'vue';
import { useDialog } from 'naive-ui';
import VueDragResize from 'vue-drag-resize';
import throttle from 'lodash/throttle';
import hotkeys from 'hotkeys-js';
import CanvasRuler from './CanvasRuler.vue';
import type { RulerOpt } from '@/utils/editor';
import type { PagePreset } from '@/types/preset';
import type { RectType } from '@/types/dragResizeType';
import { usePresetStore } from '@/store/preset';

const dialog = useDialog();

const presetStore = usePresetStore();
const store = storeToRefs(presetStore);
const preset: Ref<PagePreset> = store.preset;
const currentComId = store.currentComId;
const { updateCurrentComId, updateBasicConf, removeComponent } = presetStore;

const rulerWrapEl = ref<HTMLElement>();
const rulerSize = shallowRef({ width: 0, height: 0 });

useResizeObserver(rulerWrapEl, entries => {
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    rulerSize.value = {
        width: width - 20,
        height: height - 20,
    };
});

// 视图缩放比
const scale = ref(0);

// 设备像素比
const ratio = window.devicePixelRatio;

// 视图父级元素
const viewWrapEl = ref<HTMLElement>();
// 视图父级元素滚动
const { x: startX, y: startY } = useScroll(viewWrapEl);

// 视图留白
const spaceWidth = 60;

// 标尺配置项
const leftRulerOpt = computed<RulerOpt>(() => {
    return {
        ...rulerSize.value,
        direction: 'vertical',
        scale: scale.value,
        start: startY.value / scale.value,
        ratio,
        spaceWidth,
    };
});
const topRulerOpt = computed<RulerOpt>(() => {
    return {
        ...rulerSize.value,
        direction: 'horizontal',
        scale: scale.value,
        start: startX.value / scale.value,
        ratio,
        spaceWidth,
    };
});

// 视图元素
const viewEl = ref<HTMLDivElement>();
const viewOuterStyle = ref<StyleValue>();
const setOuterSize = async() => {
    if (!viewEl.value) return;
    await new Promise(res => setTimeout(res, 500));
    const { width, height } = viewEl.value.getBoundingClientRect();
    viewOuterStyle.value = {
        width: `${width + 2 * spaceWidth}px`,
        height: `${height + 2 * spaceWidth}px`,
        padding: `${spaceWidth}px`,
        opacity: 1,
    };
};

watch(scale, setOuterSize);

// 根据父级元素宽高设置默认缩放比例
const setScale = () => {
    if (!viewWrapEl.value) return;
    const { width, height } = viewWrapEl.value.getBoundingClientRect();
    const xRatio = preset.value.width / (width - spaceWidth * 2);
    const yRatio = preset.value.height / (height - spaceWidth * 2);
    if (xRatio < 1 && yRatio < 1) {
        scale.value = 1;
        return;
    }
    scale.value = 1 / Math.max(xRatio, yRatio);
};
onMounted(setScale);
// 视图元素样式
const viewStyle = computed<StyleValue>(() => {
    return {
        width: `${preset.value.width}px`,
        height: `${preset.value.height}px`,
        transform: `scale(${scale.value})`,
        background: preset.value.pageBg,
        boxShadow: 'rgb(0 0 0 / 50%) 0 0 30px 0',
    };
});

// 缩放比选项
const scaleLevelOpt = ['200%', '150%', '100%', '50%', '自适应'].map(v => ({ label: v, value: v }));
// 缩放百分比
const scaleLevel = computed({
    get: () => `${Math.floor(scale.value * 100)}%`,
    set: val => {
        const n = parseInt(val);
        // 选择自适应
        if (isNaN(n)) {
            return setScale();
        }
        scale.value = Math.max(n / 100, 0.2);
    },
});
// 鼠标缩放视图
const zoomScale = throttle((event: WheelEvent) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event#scaling_an_element_via_the_wheel
    scale.value += event.deltaY * -0.01;
    // 缩放范围 0.2 - 4
    scale.value = Math.min(Math.max(0.2, scale.value), 4);
}, 100);
const zoom = (event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        zoomScale(event);
    } else {
        // scrollView();
    }
};
// 按钮点击缩小视图
const zoomOut = () => {
    scale.value = Math.max(0.2, scale.value * 0.9);
};
// 按钮点击放大视图
const zoomIn = () => {
    scale.value = Math.min(4, scale.value * 1.1);
};

// 组件 resize
const handleResize = (id: string, rect: RectType) => {
    updateBasicConf(id, 'width', rect.width);
    updateBasicConf(id, 'height', rect.height);
    updateBasicConf(id, 'left', rect.left);
    updateBasicConf(id, 'top', rect.top);
};

// 快捷键
hotkeys('del, delete, backspace', () => {
    if (currentComId.value) {
        dialog.warning({
            title: '警告',
            content: '确定删除选中的组件？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => removeComponent(currentComId.value),
            onNegativeClick: () => {},
        });
    }
});
</script>

<style scoped lang="less">
.screen {
    background-image: url('@/assets/images/point-bg.png');
    &::-webkit-scrollbar-thumb {
        background: #434b55;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-corner {
        width: 0;
        height: 0;
    }
}
.zoom-btn {
    @apply text-hex-bcc9d4 text-size-14px px-6px pb-2px leading-none cursor-pointer select-none;
}
.n-select :deep(.n-base-selection-input__content) {
    @apply text-center;
}
.com-item {
    &::before {
        display: none;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        outline: 1px dashed #d6d6d6;
    }
    &:hover::before,
    &.active::before {
        display: block;
    }
}
</style>
