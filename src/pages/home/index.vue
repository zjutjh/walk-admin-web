<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold mb-8">欢迎来到毅行管理员主页</h1>
    
    <div class="flex flex-col space-y-4">
      <n-button type="error" @click="viewList">查看名单</n-button>
      <n-button type="error" @click="viewRoute">查看路线</n-button>
      <n-button type="error" @click="viewTeam">查看队伍</n-button>
    </div>

    <n-button
      type="error"
      class="absolute top-4 right-4"
      @click="inputSecret"
    >
      输入密钥
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';
import router from '../../router';

const viewList = () => {
  router.push("/list");
};

const viewRoute = () => {
  // 处理查看路线的逻辑
  console.log('查看路线');
};

const viewTeam = () => {
  router.push("/team");
};

const inputSecret = () => {
  router.push("/login");
};
</script>