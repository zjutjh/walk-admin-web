<template>
  <n-loading-bar-provider>
    <n-config-provider>
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-config-provider>
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { NMessageProvider, NConfigProvider, NLoadingBarProvider } from 'naive-ui';
</script>