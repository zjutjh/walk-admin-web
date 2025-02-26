<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-col m-8 p-4 rounded-lg shadow-md bg-white relative">
        <h2 class="text-2xl font-bold mb-4">输入信息</h2>
        <div>
            <n-flex justify="end">
                <n-input v-model:value="time" placeholder="请输入逾期时间（单位：分钟）" />
                <n-select v-model:value="route" :options="routeOptions" placeholder="选择路线" />
                <n-select v-model:value="type" :options="typeOptions" placeholder="选择类型" />
                <n-button type="error" @click="submitForm">确定</n-button>
            </n-flex>
        </div>

        <n-button
            type="default"
            class="absolute top-4 right-4"
            @click="goBack"
        >返回路线统计</n-button>

        <n-button type="primary" class="absolute top-4 right-36" @click="viewTeam">查看队伍</n-button>
    </div>

    <div class="flex-1 p-4 mx-8 relative">
        <h2 class="text-2xl font-bold mb-4">信息表格</h2>
        <div v-for="table in tableData">
          <div class="font-bold text-lg">{{ table.point + ":" + table.location }}</div>
          <n-data-table
            :columns="columns"
            :data="table.users"
          />
        </div>

        <n-button
            type="default"
            class="absolute top-4 right-4"
            @click="getListFile"
        >下载文件(excel)</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NInput, NSelect, NFlex, useMessage, NDataTable } from 'naive-ui';
import router from '../../router';
import { useRequest } from 'vue-hooks-plus'
import { getTimeoutListAPI, getTimeoutListFileAPI } from '../../apis';
import useMainStore from '../../store';

const certificationStore = useMainStore().useCertificationStore();
const msg = useMessage();
const time = ref('');
const route = ref();
const type = ref();
const routeData = ref();

const routeOptions = [
  { label: '朝晖路线', value: 1 },
  { label: '屏峰半程', value: 2 },
  { label: '屏峰全程', value: 3 },
  { label: '莫干山半程', value: 4 },
  { label: '莫干山全程', value: 5 },
];

const typeOptions = [
  { label: '全部', value: 0 },
  { label: '学生', value: 1 },
  { label: '老师', value: 2 },
  { label: '校友', value: 3 },
];

const columns = [
  { title: '姓名', key: 'name' },
  { title: '性别', key: 'gender' },
  { title: '学号', key: 'stu_id' },
  { title: '校区', key: 'campus' },
  { title: '学院', key: 'college' },
  { title: '电话', key: 'tel' },
  // { title: '类型', key: 'type' },
  { title: '到达上一点位时间', key: 'time' },
  { title: '点位', key: 'location' },
  { title: '队伍id', key: 'team_id' },
  { title: '队伍名称', key: 'team_name' },
  { title: '团队状态', key: 'status' },
  { title: '用户状态', key: 'walk_status' },
];

const tableData = computed(() => {
  const data = ref(routeData.value);
  if(!data.value) return data.value;
  data.value.forEach((tableData: any) => {
    tableData.users.forEach((item: any) => {
      switch(item.gender) {
        case 1: item.gender = "男";break;
        case 2: item.gender = "女";break;
      }
      switch(item.campus) {
        case 1: item.campus = "朝晖";break;
        case 2: item.campus = "屏峰";break;
        case 3: item.campus = "莫干山";break;
      }
      switch(item.walk_status) {
        case 1: item.walk_status = "未开始";break;
        case 2: item.walk_status = "进行中";break;
        case 3: item.walk_status = "扫码成功";break;
        case 4: item.walk_status = "放弃";break;
        case 5: item.walk_status = "完成";break;
      }
      switch(item.type) {
        case 1: item.type = "学生";break;
        case 2: item.type = "教师";break;
      }
      switch(item.status) {
        case 1: item.status = "未开始";break;
        case 2: item.status = "进行中";break;
        case 3: item.status = "未完成";break;
        case 4: item.status = "完成";break;
        case 5: item.status = "扫码成功";break;
      }
      item.time = formatReadingTime(item.time);
    });
  });

  return data.value;
})

const getData = () => {
  if(+time.value >= 0 && route!=undefined && type.value!=undefined) {
    return {
      minute: +time.value,
      route: route.value,
      type: type.value,
      secret: certificationStore.getSecret(),
    }
  } else {
    msg.warning("请先填写相关信息");
    return false;
  }
}

const submitForm = () => {
  const Data = getData();
  if(!Data) return;

  useRequest(() => getTimeoutListAPI(Data),{
    onSuccess(res: any) {
      routeData.value = res.data.results;
    }
  })
};

const getListFile = () => {
  const Data = getData();
  if(!Data) return;

  useRequest(() => getTimeoutListFileAPI(Data),{
    onSuccess(res: any) {
      const url = res.data.url;
      window.open(url, '_blank');
    }
  })
};

const goBack = () => {
  router.push('/route');
};

const viewTeam = () => {
  router.push("/team");
};

function formatReadingTime(timestamp: string) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

</script>