<template>
    <!-- <div class="w-100vw h-100vh"> -->
    <scale-view :base-size="`${preset.width}*${preset.height}`">
        <div :style="pageStyle" class="relative overflow-hidden">
            <div v-for="com in preset.components" :key="com.id" :style="comStyle(com.basic)" class="absolute">
                <component :is="com.name" :id="com.id"></component>
            </div>
        </div>
    </scale-view>
    <!-- </div> -->
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue';
import ScaleView from 'tiv/lib/scale-view';
import 'tiv/styles/scale-view.css';
import type { PagePreset, basicConfType } from '@/types/preset';

const presetStr = localStorage.getItem('preset');
const preset: PagePreset = presetStr ? JSON.parse(presetStr) : null;

const pageStyle: StyleValue = {
    width: `${preset.width}px`,
    height: `${preset.height}px`,
    background: preset.pageBg,
};

const comStyle: (conf: basicConfType) => StyleValue = basic => {
    return {
        left: `${basic.left.value}px`,
        top: `${basic.top.value}px`,
        background: basic.bgColor.value,
        width: `${basic.width.value}px`,
        height: `${basic.height.value}px`,
    };
};

</script>

<style scoped lang="less">
</style>
