<template>
  <div class="flex flex-col h-screen">
      <div class="flex flex-col m-8 p-4 rounded-lg shadow-md bg-white relative" ref="loadingBarTargetRef">
          <h2 class="text-2xl font-bold mb-4">输入信息</h2>
          <div>
              <n-flex justify="end">
                  <n-select v-model:value="time" :options="timeOptions" placeholder="请输入逾期时间（单位：分钟）" />
                  <n-select v-model:value="route" :options="routeOptions" placeholder="选择路线" />
                  <n-select v-model:value="type" :options="typeOptions" placeholder="选择类型" />
                  <n-button type="error" @click="submitForm">确定</n-button>
              </n-flex>
          </div>

          <n-button
              v-if="showBackButton"
              type="default"
              class="absolute top-4 right-4 transition-opacity duration-300"
              :class="{ 'opacity-0': !showBackButton, 'opacity-100': showBackButton }"
              @click="goBack"
          >返回路线统计</n-button>

          <n-button type="primary" class="absolute top-4 right-36" @click="viewTeam">查看队伍</n-button>
      </div>

    <div class="flex-1 p-4 mx-8 relative">
        <h2 class="text-2xl font-bold mb-4">信息表格</h2>
        <div class="flex space-x-4">
          <a 
          v-for="table in tableData"
          :href="'#' + table.point"
          class="rounded-lg bg-blue-300 hover:bg-blue-500 p-2"
          >
            <div>{{ table.point + ":" + table.location }}</div>
          </a>
        </div>
        <div v-for="table in tableData" :id="table.point">
          <div class="font-bold text-lg">{{ table.point + ":" + table.location }}</div>
          <n-data-table
            :columns="columns"
            :data="table.users"
            :pagination="paginationReactive"
          />
        </div>

        <n-button
            type="default"
            class="absolute top-4 right-4"
            @click="getListFile"
        >下载文件(excel)</n-button>
    </div>

    <!-- 返回顶部按钮 -->
    <button
      class="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center transition-opacity duration-500"
      :class="{ 'opacity-0': !showBackButton, 'opacity-100': showBackButton }"
      @click="scrollToTop"
    >
      ↑
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue';
import { NButton, NSelect, NFlex, useMessage, NDataTable, useLoadingBar } from 'naive-ui';
import router from '../../router';
import { useRequest } from 'vue-hooks-plus'
import { getTimeoutListAPI, getTimeoutListFileAPI } from '../../apis';
import useMainStore from '../../store';

const certificationStore = useMainStore().useCertificationStore();
const msg = useMessage();
const loadingBar = useLoadingBar();
const time = ref('10');
const route = ref(1);
const type = ref(0);
const routeData = ref();
const showBackButton = ref(false); // 控制返回按钮的显示

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

const timeOptions = computed(() => {
  let time = [];
  for(let i=10; i<=180; i+=10) {
    time.push({label: i+"", value: i+""});
  }
  return time;
});

// 表头过滤前置
const statusFilterOption = ['未开始', '进行中', '扫码成功', '放弃', '完成'];
const walkStatusFilterOption = ['未开始', '进行中', '未完成', '完成', '扫码成功'];
const collegeFilterOption = [
  '材料科学与工程学院',
  '地理信息学院', '法学院',
  '公共管理学院', '马克思主义学院',
  '管理学院',
  '化学工程学院',
  '环境学院',
  '物理学院',
  '机械工程学院',
  '计算机科学与技术学院',
  '健行学院',
  '教育学院',
  '经济学院',
  '理学院',
  '人文学院',
  '设计与建筑学院',
  '生物工程学院',
  '食品科学与工程学院',
  '土木工程学院',
  '外国语学院',
  '信息工程学院',
  '药学院、绿色制药协同创新中心',
  '国际学院'
];
const optionRetrans = (optionList: string[]) => {
  let opt = [];
  for (let i = 0; i < optionList.length; i++) {
    opt.push({ label: optionList[i], value: optionList[i] });
  }
  return opt;
}

// 表头
const columns = [
  { title: '姓名', key: 'name' },
  { title: '性别', key: 'gender' },
  { title: '学号', key: 'stu_id' },
  { title: '校区', key: 'campus' },
  {
    title: '学院', key: 'college',
    filterOptions: optionRetrans(collegeFilterOption),
    filter(value: any, row:any) {
      return row.college == value;
    }
  },
  { title: '电话', key: 'tel' },
  { title: '到达上一点位时间', key: 'time' },
  { title: '点位', key: 'location' },
  { title: '队伍id', key: 'team_id' },
  { title: '队伍名称', key: 'team_name' },
  { title: '团队状态', key: 'status',
    filterOptions: optionRetrans(walkStatusFilterOption),
    filter(value: any, row:any) {
      return row.status == value;
    }
  },
  { title: '用户状态', key: 'walk_status',
    filterOptions: optionRetrans(statusFilterOption),
    filter(value: any, row:any) {
      return row.walk_status == value;
    }
  },
];

// 分页配置
const paginationReactive = reactive({
  page: 2,
  pageSize: 5,
  onChange: (page: number) => {
    paginationReactive.page = page
  }
})

// 数据解析
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

  loadingBar.start();

  useRequest(() => getTimeoutListAPI(Data),{
    onSuccess(res: any) {
      routeData.value = res.data.results;
      loadingBar.finish();
    },
    onError() {
      loadingBar.error();
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

// 返回顶部功能
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 监听滚动事件
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const tablePosition = 400;
  showBackButton.value = scrollPosition > tablePosition;
  console.log(scrollPosition);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 时间戳转化可读时间
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