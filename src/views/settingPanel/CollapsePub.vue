<template>
    <div class="p-12px border-1px border-#303639 rounded-3px">
        <div class="flex items-center cursor-pointer" @click="show = !show">
            <p class="text-zinc-40 flex-1">
                {{ props.conf.name }}
            </p>
            <n-checkbox v-model:checked="val" size="small" class="mr-4px" @click.stop>
                启用
            </n-checkbox>
            <i-my-icons-arrow class="fill-white text-12px duration-300 " :class="{'rotate-180': show}"></i-my-icons-arrow>
        </div>
        <n-collapse-transition :show="show">
            <div class="pt-10px">
                <n-table :single-line="false">
                    <thead>
                        <tr>
                            <th>字段</th>
                            <th>绑定变量</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="v in props.conf.keyMap" :key="v.key">
                            <td>{{ v.key }}</td>
                            <td>
                                <n-input v-model:value="v.value"></n-input>
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
            </div>
        </n-collapse-transition>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { EventPubType } from '@/types/preset';

const props = defineProps({
    conf: {
        type: Object as PropType<EventPubType>,
        required: true,
    },
    modelValue: {
        type: Boolean,
        required: true,
    },
});
const show = ref(false);
const val = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);
watch(val, v => {
    emit('update:modelValue', v);
});
</script>

<style scoped lang="less">
</style>
