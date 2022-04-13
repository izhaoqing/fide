<template>
    <n-form
        label-width="auto"
        label-placement="left"
        label-align="left"
        require-mark-placement="right-hanging"
        size="small"
    >
        <n-form-item label="宽度">
            <n-input-number v-model:value="preset.width"></n-input-number>
        </n-form-item>
        <n-form-item label="高度">
            <n-input-number v-model:value="preset.height"></n-input-number>
        </n-form-item>
        <n-form-item label="高度">
            <n-color-picker v-model:value="preset.pageBg"></n-color-picker>
        </n-form-item>
    </n-form>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import type { PagePreset } from '@/types/preset';
import { usePresetStore } from '@/store/preset';

const presetStore = usePresetStore();
const preset: Ref<PagePreset> = storeToRefs(presetStore).preset;

</script>

<style scoped lang="less">
</style>
