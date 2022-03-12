<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme">
        <router-view></router-view>
    </n-config-provider>
</template>
<script lang="ts" setup>
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';
</script>
