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
        >返回逾期人员列表</n-button>
    </div>

    <!-- 信息展示部分 -->
    <div class="mx-4" v-if="teamInfo!=undefined">
      <h3 class="text-xl font-semibold">队伍状态</h3>
      <div class="m-4">
        <div>队名: {{ teamInfo.team.name }}</div>
        <div>ID: {{ teamInfo.team.id }}</div>
        <div>点位: {{ teamInfo.team.point }}</div>
        <div>路线: {{ ROUTE[teamInfo.team.route] }}</div>
        <div>口号: {{ teamInfo.team.slogan }}</div>
        <div>起始人数: {{ teamInfo.team.start_num }}</div>
        <div>状态: {{ STATUS[teamInfo.team.status] }}</div>
        <div>是否接受随机分配: {{ teamInfo.team.allow_match? "是" : "否" }}</div>
        <div>密码: {{ teamInfo.team.password }}</div>
        <div>code: {{ teamInfo.team.code }}</div>
      </div>

      <h3 class="text-xl font-semibold">队员详细信息</h3>
      <n-data-table
        :columns="columns"
        :data="teamMemberInfo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { NInput, NButton, useMessage, NDataTable } from 'naive-ui';
import { useRequest } from 'vue-hooks-plus';
import router from '../../router';
import { getTeamInfoAPI } from '../../apis';
import useMainStore from '../../store';

const STATUS = ["", "未开始", "进行中", "未完成", "完成", "进行中"];
const ROUTE = ["", "朝晖路线", "屏峰半程", "屏峰全程", "莫干山半程", "莫干山全程"];

const certificationStore = useMainStore().useCertificationStore();
const msg = useMessage();
const teamId = ref();
const teamInfo = ref();

const columns = [
  { title: '姓名', key: 'name' },
  { title: '性别', key: 'gender' },
  { title: '联系方式', key: 'contact' },
  { title: '校区', key: 'campus' },
  // { title: 'open id', key: 'open_id' },
  { title: '类型', key: 'type' },
  { title: '状态', key: 'walk_status' },
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
    onSuccess(res: any) {
      teamInfo.value = res.data;
    }
  })
};

const goBack = () => {
    router.push('/list');
};

const teamMemberInfo = computed(() => {
  const data = ref(teamInfo.value.member);
  data.value.forEach((item: any) => {
    switch(item.gender) {
      case 1: item.gender = "男";break;
      case 2: item.gender = "女";break;
    }
    let contact = "";
    if(item.contact.qq!='') contact += "qq:" + item.contact.qq + "\n";
    if(item.contact.wechat!='') contact += "微信:" + item.contact.wechat + "\n"; 
    if(item.contact.tel!='') contact += "电话:" + item.contact.tel + "\n";
    item.contact = contact;
    switch(item.campus) {
      case 1: item.campus = "朝晖";break;
      case 2: item.campus = "屏峰";break;
      case 3: item.campus = "莫干山";break;
    }
    switch(item.walk_status) {
      case 1: item.walk_status = "未开始";break;
      case 2: item.walk_status = "进行中";break;
      case 3: item.walk_status = "进行中";break;
      case 4: item.walk_status = "放弃";break;
      case 5: item.walk_status = "完成";break;
    }
    switch(item.type) {
      case 1: item.type = "学生";break;
      case 2: item.type = "教师";break;
    }
  });
  return data.value;
})

</script>
