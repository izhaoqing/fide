<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme" :theme-overrides="themeOverrides">
        <router-view></router-view>
    </n-config-provider>
</template>
<script lang="ts" setup>
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';
import type { GlobalThemeOverrides } from 'naive-ui';
import { usePresetStore } from '@/store/preset';

const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: '#2483ff',
        primaryColorHover: '#2483ff',
    },
    Button: {
        textColorPrimary: '#fff',
        textColorHoverPrimary: '#fff',
    },
};

const { updatePreset } = usePresetStore();
const preset = localStorage.getItem('preset');
if (preset) {
    updatePreset(JSON.parse(preset));
}
</script>
