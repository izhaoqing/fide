<template>
    <div :class="{ expand }" class="flex items-stretch h-full w-40px duration-300">
        <div class="relative w-40px flex-shrink-0 bg-hex-191c21">
            <div class="inner scrollbar-w-0 space-y-5 py-4">
                <div
                    v-for="item in components"
                    :key="item.id"
                    :class="{ active: type === item.id }"
                    class="type flex flex-col items-center text-hex-a1a9b3 cursor-pointer"
                    @click="checkType(item.id)"
                >
                    <component :is="item.icon" fill="#a1a9b3" class="text-size-14px mb-4px"></component>
                    <span class="text-size-12px">{{ item.type }}</span>
                </div>
            </div>
        </div>
        <div class="relative w-200px bg-#0a0b0d">
            <div class="inner p-16px space-y-14px scrollbar-w-0">
                <div v-for="item in list" :key="item.id">
                    <div class="text-hex-bcc9d4 text-size-12px bg-hex-212326 px-5px leading-22px">
                        {{ item.name }}
                    </div>
                    <div class="h-92px bg-#17191c"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import IconControl from '~icons/my-icons/control';
import IconText from '~icons/my-icons/text';

const expand = ref(true);
const components = shallowRef([
    {
        type: '控件',
        id: 'weight',
        icon: IconControl,
        children: [
            {
                name: '按钮',
                id: 'button',
            },
            {
                name: 'Tab切换',
                id: 'tab',
            },
        ],
    },
    {
        type: '信息',
        id: 'info',
        icon: IconText,
        children: [
            {
                name: '文本',
                id: 'text',
            },
        ],
    },
]);

const type = ref('');
type.value = components.value[0].id;
const checkType = (id: string) => {
    type.value = id;
};

const list = computed(() => {
    const item = components.value.find(item => item.id === type.value);
    return item?.children || [];
});

</script>

<style scoped lang="less">
.expand {
    @apply w-240px;
}
.inner {
    @apply inset-0 absolute;
}
.active svg {
    @apply text-primary fill-primary;
}
.active span {
    @apply text-primary;
}
</style>
