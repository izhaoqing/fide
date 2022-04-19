<template>
    <div class="p-12px border-1px border-#303639 rounded-3px">
        <div class="flex items-center cursor-pointer" @click="show = !show">
            <p class="text-zinc-40 flex-1">
                {{ conf.name }}
            </p>
            <n-popconfirm @positive-click="emit('deleteSub')">
                <template #trigger>
                    <i-my-icons-delete class="fill-#ddd hover:fill-primary mr-10px outline-none" @click.stop></i-my-icons-delete>
                </template>
                确定删除？
            </n-popconfirm>
            <n-checkbox v-model:checked="val" size="small" class="mr-4px" @click.stop>
                启用
            </n-checkbox>
            <i-my-icons-arrow class="fill-white text-12px duration-300 " :class="{'rotate-180': show}"></i-my-icons-arrow>
        </div>
        <n-collapse-transition :show="show">
            <div class="pt-10px">
                <slot></slot>
            </div>
        </n-collapse-transition>
    </div>
</template>

<script lang="ts" setup>
// import type { EventItemType } from '@/plugins/emitter';
// import emitter from '@/plugins/emitter';

const prop = defineProps({
    conf: {
        type: Object,
        required: true,
    },
    modelValue: {
        type: Boolean,
        required: true,
    },
    // targetEvents: {
    //     type: Array,
    //     required: true,
    // },
});
const emit = defineEmits(['update:modelValue', 'deleteSub']);
const show = ref(false);

const val = ref(prop.modelValue);
watch(val, v => {
    emit('update:modelValue', v);
});

// const value = ref('');
// const options = ref([
//     {
//         label: "Everybody's Got Something to Hide Except Me and My Monkey",
//         value: 'song0',
//     },
// ]);

</script>

<style scoped lang="less">
</style>
