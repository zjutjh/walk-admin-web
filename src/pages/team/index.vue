<template>
  <div class="flex flex-col p-4">
    <div class="mb-6 rounded-lg shadow-md border border-gray-200 p-4 relative">
        <h2 class="text-2xl font-bold mb-4">队伍信息</h2>
        <n-input
            v-model:value="teamId"
            placeholder="请输入队伍ID"
            class="mb-2"
            label="队伍ID"
        />
        <n-button type="primary" @click="fetchTeamInfo">确认</n-button>

        <n-button
            type="default"
            class="absolute top-4 right-4"
            @click="goBack"
        >返回主页</n-button>
    </div>

    <!-- 信息展示部分 -->
    <div class="mx-4">
      <h3 class="text-xl font-semibold">队伍状态</h3>
      <div class="m-4">
        this
      </div>

      <h3 class="text-xl font-semibold">队员详细信息</h3>
      <!-- <n-data-table
        :columns="columns"
        :data="teamInfo"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NInput, NButton, NDataTable, useMessage } from 'naive-ui';
import { useRequest } from 'vue-hooks-plus';
import router from '../../router';
import { getTeamInfoAPI } from '../../apis';
import useMainStore from '../../store';

const certificationStore = useMainStore().useCertificationStore();
const msg = useMessage();
const teamId = ref();
const teamInfo = ref();

const columns = [
  { title: '姓名', key: 'name' },
  { title: '性别', key: 'gender' },
  { title: '学号', key: 'studentId' },
  { title: '电话', key: 'phone' },
];

const fetchTeamInfo = async () => {
  if (!teamId.value) {
    msg.warning("请先填写队伍id");
    return;
  }

  useRequest(() => getTeamInfoAPI({
    team_id: +teamId.value, // 团队码
    secret: certificationStore.getSecret(),
  }), {
    onSuccess(res) {
      teamInfo.value = res.data;
    }
  })
};

const goBack = () => {
    router.push('/');
};

</script>
