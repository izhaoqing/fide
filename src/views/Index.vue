<template>
    <div class="w-100vw h-100vh flex flex-col">
        <div class="flex items-center h-40px b-0px border-b-1px border-b-black flex items-center bg-hex-1d1e20">
            <p class="name flex-center h-full px-20px font-bold bg-primary text-#fff text-size-20px leading-none hidden">
                <span>Fide</span>
            </p>
            <n-space size="small" class="flex items-center h-full ml-20px">
                <n-popover placement="bottom" trigger="hover">
                    <template #trigger>
                        <div :class="{active: showLayer}" class="flex-center w-40px h-24px bg-#303640 rounded-3px border-1px border-color-#fff/10 cursor-pointer" @click="showLayer = !showLayer">
                            <i-my-icons-layer class="fill-#fff/90 text-size-14px outline-0"></i-my-icons-layer>
                        </div>
                    </template>
                    <div>图层</div>
                </n-popover>
                <n-popover placement="bottom" trigger="hover">
                    <template #trigger>
                        <div :class="{active: showCom}" class="flex-center w-40px h-24px bg-#303640 rounded-3px border-1px border-color-#fff/10 cursor-pointer" @click="showCom = !showCom">
                            <i-my-icons-component class="fill-#fff/80 text-size-14px outline-0"></i-my-icons-component>
                        </div>
                    </template>
                    <div>组件</div>
                </n-popover>
            </n-space>
            <n-space size="small" justify="end" align="center" class="flex-1 h-full mr-20px">
                <n-popover placement="bottom" trigger="hover">
                    <template #trigger>
                        <div class="flex-center w-40px h-24px bg-#303640 rounded-3px border-1px border-color-#fff/10 cursor-pointer" @click="toPreview">
                            <i-my-icons-preview class="fill-#fff/90 text-size-14px outline-0"></i-my-icons-preview>
                        </div>
                    </template>
                    <div>预览</div>
                </n-popover>
            </n-space>
        </div>
        <div class="flex items-stretch flex-1">
            <div class="border-0 border-r-1px border-r-black bg-hex-1d2127">
                <component-list :hidden="!showCom"></component-list>
            </div>
            <div class="flex-1 relative">
                <div class="inner">
                    <n-dialog-provider>
                        <editor-view></editor-view>
                    </n-dialog-provider>
                </div>
            </div>
            <div class="w-300px relative">
                <div class="inner border-0 border-l-1px border-l-black bg-hex-191c21">
                    <panel-view></panel-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ComponentList from './ComponentList.vue';
import EditorView from './editorView/Index.vue';
import PanelView from './settingPanel/PanelView.vue';

const showCom = ref(true);
const showLayer = ref(true);

const router = useRouter();
const toPreview = () => {
    const url = router.resolve({
        name: 'Preview',
    });
    window.open(url.href);
    // const url = router
};

</script>
<style lang="less" scoped>
.inner {
    @apply overflow-auto absolute inset-0;
}
.name {
    font-family: Brush Script MT, Apple Chancery;
}
.active {
    @apply bg-primary border-color-primary;
}
</style>
