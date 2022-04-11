<template>
    <n-form
        label-width="auto"
        label-placement="left"
        label-align="left"
        require-mark-placement="right-hanging"
        size="small"
    >
        <n-form-item
            v-for="item in basicConf"
            :key="item.name"
            :label="item.label"
            :path="item.name"
            :class="{hide: item.component === undefined}"
        >
            <!-- todo -->
            <component :is="formMap[item.component || 'div']" v-model:value="item.value" size="small"></component>
            <!-- <n-input-number v-if="item.name ==='width'" v-model:value="item.value" :min="basicConf.minW.value"></n-input-number>
            <n-input-number v-else-if="item.name ==='height'" v-model:value="item.value" :min="basicConf.minH.value"></n-input-number>
            <n-input-number v-else-if="item.name ==='left'" v-model:value="item.value" :min="0"></n-input-number>
            <n-input-number v-else-if="item.name ==='top'" v-model:value="item.value" :min="0"></n-input-number>
            <n-color-picker v-else-if="item.name ==='bgColor'" v-model:value="item.value" size="small"></n-color-picker>
            <n-input-number v-else-if="item.name ==='fontSize'" v-model:value="item.value" :min="12"></n-input-number> -->
        </n-form-item>
    </n-form>
</template>

<script lang="ts" setup>
import { NInputNumber, NColorPicker } from 'naive-ui';
// import type { DefineComponent } from 'vue';
import { usePresetStore } from '@/store/preset';
// import type { basicConfType } from '@/types/preset';

type FormMapType = Record<string, any>;
const formMap: FormMapType = {
    NInputNumber,
    NColorPicker,
    div: 'div',
};

const presetStore = usePresetStore();
const { currentCom } = storeToRefs(presetStore);
const basicConf = computed(() => {
    return currentCom.value!.basic;
});

// const labelStyle = 'font-size: 14px;';

</script>

<style scoped lang="less">
.hide {
    @apply hidden;
}
</style>
