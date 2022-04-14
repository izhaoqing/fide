<template>
    <div class="">
        <div class="flex items-center mb-16px">
            <i-my-icons-trigger class="fill-#aaa text-12px mr-6px"></i-my-icons-trigger>
            <p class="text-#bcc9d4 text-14px">
                发出事件
            </p>
        </div>
        <collapse-pub
            v-for="(item, k) in eventConf.pub"
            :key="k"
            v-model="item.enable"
            :conf="item"
            class="mb-16px"
        ></collapse-pub>
        <div class="h-1px bg-#303639 my-24px"></div>
        <div v-if="actions.length">
            <div class="flex items-center mb-16px">
                <i-my-icons-receive class="fill-#aaa text-14px mr-6px"></i-my-icons-receive>
                <p class="text-#bcc9d4 text-14px">
                    接收事件
                </p>
            </div>
            <collapse-sub
                v-for="item in eventConf.sub"
                :key="item.id"
                v-model="item.enable"
                :conf="item"
                class="mb-16px"
                @delete-sup="deleteSub(item)"
            >
                <div class="flex items-center mb-10px">
                    <p class="shrink-0 mr-10px">
                        事件
                    </p>
                    <n-select v-model:value="item.originId" :options="emitterEvents"></n-select>
                </div>
                <div class="flex items-center mb-10px">
                    <p class="shrink-0 mr-10px">
                        动作
                    </p>
                    <n-select v-model:value="item.action" :options="actions" @update:value="(v: string) => handleAction(v, item)"></n-select>
                </div>
                <n-table :single-line="false">
                    <thead>
                        <tr>
                            <th>字段</th>
                            <th>取值</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="v in item.keyMap" :key="v.key">
                            <td>{{ v.key }}</td>
                            <td>
                                <n-select v-model:value="v.value" :options="eventParams(item.originId)"></n-select>
                            </td>
                            <td v-if="v.label" class="text-center">
                                <n-tooltip v-if="v.label" trigger="hover">
                                    <template #trigger>
                                        <i-my-icons-ellipsis class="fill-#ddd"></i-my-icons-ellipsis>
                                    </template>
                                    <p>{{ v.label }}</p>
                                </n-tooltip>
                            </td>
                        </tr>
                    </tbody>
                </n-table>
            </collapse-sub>
            <div class="mb-30px border-1px border-#303639 rounded-3px p-8px text-center cursor-pointer hover:text-primary" @click="addSub">
                新增
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import CollapsePub from './CollapsePub.vue';
import CollapseSub from './CollapseSub.vue';
import { usePresetStore } from '@/store/preset';
import type { ComponentConfig, EventSubType } from '@/types/preset';
import type { InfoType } from '@/types/info';
import emitter from '@/plugins/emitter';

const presetStore = usePresetStore();
const currentCom: Ref<ComponentConfig | undefined> = storeToRefs(presetStore).currentCom;
const eventConf = computed(() => {
    return currentCom.value!.event;
});

// const eventOrigin = ref('');
const emitterEvents = computed(() => {
    return emitter.events.value.map(item => {
        return {
            label: item.desc,
            value: item.name,
            fn: item.fn,
            params: item.params,
        };
    });
});
const eventParams = (name: string) => {
    const event = emitterEvents.value.find(item => item.value === name);
    const p = event ? event.params : [];
    return p.map(item => ({
        label: item,
        value: item,
    }));
};

const infoData: Ref<InfoType | undefined> = storeToRefs(presetStore).infoData;
const actions = computed(() => {
    if (!infoData.value?.resAction) return [];
    return Object.entries(infoData.value?.resAction).map(([key, item]) => {
        return {
            label: item.label,
            value: key,
            keyMap: item.keyMap,
        };
    });
});
const defaultItem = actions.value[0];
const addSub = () => {
    eventConf.value.sub.push({
        enable: false,
        id: uuidv4(),
        name: defaultItem.label,
        originId: '',
        action: defaultItem.value,
        keyMap: defaultItem.keyMap.map(item => {
            return {
                label: item.label,
                key: item.key,
                value: item.value,
            };
        }),
    });
};
const handleAction = (v: string, item: EventSubType) => {
    const cur = actions.value.find(a => a.value === v);
    if (!cur) return;
    item.name = cur.label;
};

const deleteSub = (item: EventSubType) => {
    const index = eventConf.value.sub.findIndex(v => v === item);
    if (index >= 0) {
        eventConf.value.sub.splice(index);
    }
};
</script>

<style scoped lang="less">
</style>
