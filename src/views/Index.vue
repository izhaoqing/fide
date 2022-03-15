<template>
    <div class="w-100vw h-100vh flex flex-col">
        <div class="h-40px border-b-1px border-b-black flex items-center bg-hex-1d1e20">
            <p class="ml-30px font-bold text-blue-500 text-size-20px">
                <!-- Fide -->
            </p>
        </div>
        <div class="flex items-stretch flex-1">
            <div class="border-r-1px border-black bg-hex-1d2127">
                <component-list></component-list>
            </div>
            <div class="flex-1 relative">
                <div class="inner">
                    <editor-view></editor-view>
                </div>
            </div>
            <div class="w-300px relative">
                <div class="inner border-l-1px border-black bg-hex-191c21">
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
</script>
<style>
.inner {
    @apply overflow-auto absolute inset-0;
}
</style>
