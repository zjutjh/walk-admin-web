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
        >返回主页</n-button>
    </div>

    <div class="flex-1 p-4 mx-8 relative">
        <h2 class="text-2xl font-bold mb-4">信息表格</h2>
        <div v-for="table in tableData">
          <div class="font-bold text-lg">{{ table.point + ":" + table.location }}</div>
          <n-data-table
            :columns="columns"
            :data="table.users"
            :row-class-name="retrans"
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
import { ref } from 'vue';
import { NButton, NInput, NSelect, NFlex, useMessage, NDataTable } from 'naive-ui';
import router from '../../router';
import { useRequest } from 'vue-hooks-plus'
import { getTimeoutListAPI, getTimeoutListFileAPI } from '../../apis';
import type { RowData } from 'naive-ui/es/data-table/src/interface';
import useMainStore from '../../store';

const certificationStore = useMainStore().useCertificationStore();
const msg = useMessage();
const time = ref('');
const route = ref();
const type = ref();

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
  { title: '姓名', key: 'name' },
  { title: '性别', key: 'gender' },
  { title: '学号', key: 'stu_id' },
  { title: '校区', key: 'campus' },
  { title: '学院', key: 'college' },
  { title: '电话', key: 'tel' },
  // { title: '类型', key: 'type' },
  { title: '到达上一点位时间', key: 'time' },
  { title: '点位', key: 'point' },
  { title: '队伍id', key: 'team_id' },
  { title: '队伍名称', key: 'team_name' },
  { title: '团队状态', key: 'status' },
  { title: '用户状态', key: 'walk_status' },
];

const tableData = ref();

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
      tableData.value = res.data.results;
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
  router.push('/'); // 返回主页
};

const retrans = (row: RowData) => {
  switch(row.campus){
    case 1:
    row.campus = "朝晖";
    break;
    case 2:
    row.campus = "屏峰";
    break;
    case 3:
    row.campus = "莫干山";
    break;
    default:
      break;
  }
  switch(row.status){
    case 1:
    row.status = "未开始";
    break;
    case 2:
    row.status = "进行中";
    break;
    case 3:
    row.status = "未完成";
    break;
    case 4:
    row.status = "完成";
    break;
    case 5:
    row.status = "扫码成功";
    break;
    default:
      break;
  }
  switch(row.walk_status){
    case 1:
    row.walk_status = "未开始";
    break;
    case 2:
    row.walk_status = "进行中";
    break;
    case 3:
    row.walk_status = "扫码成功";
    break;
    case 4:
    row.walk_status = "放弃";
    break;
    case 5:
    row.walk_status = "完成";
    break;
    default:
      break;
  }
  return undefined;
}

</script>