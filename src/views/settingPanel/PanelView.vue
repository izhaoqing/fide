<template>
    <div v-if="currentCom" class="w-full h-full overflow-auto">
        <n-tabs type="line" animated justify-content="center" pane-class="tab-pane" class="panel-tab">
            <n-tab-pane name="oasis" tab="配置">
                <basic-conf></basic-conf>
            </n-tab-pane>
            <n-tab-pane name="the beatles" tab="数据">
                <data-conf></data-conf>
            </n-tab-pane>
            <n-tab-pane name="jay chou" tab="事件">
                <event-conf></event-conf>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script lang="ts" setup>
import basicConf from './BasicConf.vue';
import DataConf from './DataConf.vue';
import EventConf from './EventConf.vue';
import { usePresetStore } from '@/store/preset';
const presetStore = usePresetStore();
const { currentCom } = storeToRefs(presetStore);
</script>

<style scoped lang="less">
.panel-tab :deep(.n-tabs-tab) {
    @apply text-hex-a1a9b3 px-12px;
}
.tab-pane {
    @apply px-12px mt-20px;
}
</style>
