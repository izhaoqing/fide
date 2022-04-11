<template>
    <div :style="style" class="f-text text-#fff size-14px w-full h-full" @click="pubEventSet.clickContent(data[0])">
        {{ data[0].x }}
    </div>
</template>

<script lang="ts" setup>
import type { EventPubKey, EventSubKey } from './event';
import usePkgCommon from '@/hooks/usePkgCommon';
import { pubEvents, subEvents } from '@/hooks/usePkgEvent';
// import { eventResponse } from './event';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const { config, style, data } = usePkgCommon(props.id);
console.log(config.value);
// const resultData = computed(() => data.value[0]);

const pubEventSet = pubEvents<EventPubKey>(config.value!);
console.log(pubEventSet.value);

const subEventSet = subEvents<EventSubKey>(config.value!);
subEventSet.value.mutateDate = d => {
    data.value = [{ x: d.x }];
};

</script>

<style scoped lang="less">
</style>
