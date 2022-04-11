<template>
    <n-tabs :style="style" :value="currentId" class="w-full h-full" type="bar" @update:value="handleChange">
        <n-tab v-for="item in tabs" :key="item.id" :name="item.id">
            {{ item.name }}
        </n-tab>
    </n-tabs>
</template>

<script lang="ts" setup>
import type { EventPubKey } from './event';
import usePkgCommon from '@/hooks/usePkgCommon';
import { pubEvents } from '@/hooks/usePkgEvent';

interface TabItem {
    id: string | number;
    name: string;
}

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const { config, style, data } = usePkgCommon(props.id);
console.log(config.value);

const tabs = computed<TabItem[]>(() => data.value.filter(item => item.id !== undefined));

const currentId = ref<TabItem['id']>('');
watchEffect(() => {
    currentId.value = tabs.value[0]?.id;
});
const currentItem = computed(() => {
    return tabs.value.find(item => item.id === currentId.value);
});

const eventSet = pubEvents<EventPubKey>(config.value!);
const handleChange = (v: TabItem['id']) => {
    currentId.value = v;
    eventSet.value.change(currentItem.value!);
};

</script>

<style scoped lang="less">
</style>
