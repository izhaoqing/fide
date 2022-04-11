<template>
    <n-form
        label-width="auto"
        label-placement="left"
        label-align="left"
        require-mark-placement="right-hanging"
        size="small"
    >
        <n-form-item label="数据源">
            <n-select v-model:value="dataConf.origin" :options="dataOrigin"></n-select>
        </n-form-item>
        <n-form-item v-if="dataConf.origin === 'static'" label="数据值">
            <n-input v-model:value="dataConf.staticData" type="textarea"></n-input>
        </n-form-item>
        <n-form-item v-else label="数据接口">
            <n-input v-model:value="dataConf.remoteUrl"></n-input>
        </n-form-item>
    </n-form>
    <p class="h-1px bg-#303639 mb-24px"></p>
    <ul>
        <li class="relative">
            <div class="w-1px bg-#454545 absolute left-3px top-12px bottom-[-24px]"></div>
            <div class="flex items-center mb-12px relative z-2">
                <div class="w-7px h-7px bg-primary rounded-50%"></div>
                <p class="ml-12px text-#ddd text-14px bg-#37383d px-10px py-2px">
                    {{ originLabel }}
                </p>
            </div>
        </li>
        <li class="relative">
            <div class="w-1px bg-#454545 absolute left-3px top-12px bottom-[-24px]"></div>
            <div class="flex mb-12px relative z-2">
                <div class="w-7px h-7px mt-8px bg-primary rounded-50%"></div>
                <div class="flex-1">
                    <n-checkbox v-model:checked="dataConf.enableFilter" class="ml-12px">
                        数据过滤器
                    </n-checkbox>
                    <div v-show="dataConf.enableFilter" class="ml-12px mt-10px">
                        <n-input v-model:value="dataConf.filter" :rows="5" type="textarea"></n-input>
                    </div>
                </div>
            </div>
        </li>
        <div class="relative">
            <div class="w-1px bg-#454545 absolute left-3px top-12px bottom-0"></div>
            <div class="flex mb-12px relative z-2">
                <div class="w-7px h-7px mt-8px bg-primary rounded-50%"></div>
                <div class="flex-1">
                    <div class="flex ml-12px text-#ddd items-center">
                        <p class="flex-1">
                            数据响应结果(只读)
                        </p>
                        <i-my-icons-reload class="fill-#fff cursor-pointer text-16px hover:fill-primary"></i-my-icons-reload>
                    </div>
                    <div class="ml-12px mt-10px">
                        <n-input :value="resData" :rows="5" placeholder="" readonly type="textarea"></n-input>
                    </div>
                </div>
            </div>
        </div>
    </ul>
    <p class="h-1px bg-#303639 my-24px"></p>
    <n-table :single-line="false">
        <thead>
            <tr>
                <th>字段</th>
                <th>映射</th>
                <th>说明</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in dataConf.keyMap" :key="item.key">
                <td>{{ item.key }}</td>
                <td>
                    <n-input v-model:value="item.value"></n-input>
                </td>
                <td class="text-center">
                    <n-popover v-if="item.label" trigger="hover" placement="top-end">
                        <template #trigger>
                            <i-my-icons-ellipsis class="fill-#ddd"></i-my-icons-ellipsis>
                        </template>
                        <p>{{ item.label }}</p>
                    </n-popover>
                </td>
            </tr>
        </tbody>
    </n-table>
</template>

<script lang="ts" setup>
import { NInput } from 'naive-ui';
import { usePresetStore } from '@/store/preset';

const presetStore = usePresetStore();
const { currentCom } = storeToRefs(presetStore);
const dataConf = computed(() => {
    return currentCom.value!.data;
});

const dataOrigin = [
    {
        label: '静态数据',
        value: 'static',
    },
    {
        label: '远程数据',
        value: 'remote',
    },
];
const originLabel = computed(() => {
    const cur = dataOrigin.find(item => item.value === dataConf.value.origin);
    return cur?.label;
});

const resData = computed(() => {
    return JSON.stringify(JSON.parse(dataConf.value.staticData || ''), null, 4);
});

</script>

<style scoped lang="less">
.hide {
    @apply hidden;
}
</style>
