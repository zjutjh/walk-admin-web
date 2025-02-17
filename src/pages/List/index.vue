<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-col m-8 p-4 rounded-lg shadow-md bg-white relative">
        <h2 class="text-2xl font-bold mb-4">输入信息</h2>
        <div>
            <n-flex justify="end">
                <n-input v-model:value="time" placeholder="请输入逾期时间（单位：分钟）" />
                <n-select v-model:value="route" :options="routeOptions" placeholder="选择路线" />
                <n-select v-model:value="type" :options="typeOptions" placeholder="选择类型" />
                <n-input v-model:value="secret" placeholder="请输入密钥" />
                <n-button type="error" @click="submitForm">确定</n-button>
            </n-flex>
        </div>

        <n-button
            type="default"
            class="absolute top-4 right-4"
            @click="goBack"
        >返回主页</n-button>
    </div>

    <div class="flex-1 p-4 mx-8 relative">
        <h2 class="text-2xl font-bold mb-4">信息表格</h2>
        <n-table :columns="columns" :data="tableData" />

        <n-button
            type="default"
            class="absolute top-4 right-4"
            @click="getListFile"
        >下载文件(excel)</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NForm, NInput, NSelect, NTable, NFlex } from 'naive-ui';
import router from '../../router';
import { useRequest } from 'vue-hooks-plus'
import { getTimeoutListAPI } from '../../apis';

const time = ref('');
const route = ref();
const type = ref();
const secret = ref("");

const routeOptions = [
  { label: '朝晖路线', value: 1 },
  { label: '屏峰半程', value: 2 },
  { label: '屏峰全程', value: 3 },
  { label: '莫干山半程', value: 4 },
  { label: '莫干山全程', value: 5 },
];

const typeOptions = [
  { label: '学生', value: 1 },
  { label: '老师', value: 2 },
  { label: '校友', value: 3 },
];

const columns = [
  { title: '时间', key: 'time' },
  { title: '路线', key: 'route' },
  { title: '类型', key: 'type' },
  { title: '密钥', key: 'secret' },
];

const tableData = ref([]);

const submitForm = () => {
  // 处理表单提交逻辑
  const Data = {
    minute: +time.value,
    route: route.value,
    type: type.value,
    secret: secret.value,
  };

  console.log(Data)

  useRequest(() => getTimeoutListAPI(Data),{
    onSuccess(res) {
      console.log(res);
    }
  })
};

const getListFile = () => {
    
};

const goBack = () => {
  router.push('/'); // 返回主页
};
</script>