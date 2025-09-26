<template>
  <div class="m-6 rounded-lg shadow-md border border-gray-200 p-4 relative">
    <h1 class="text-3xl font-bold mb-4">路线信息展示</h1>
    
    <div v-if="routeData">
      <!-- 此处 v-show 用于隐藏莫干山半程统计信息 可以在必要时开启 -->
      <n-table v-for="route in routeInfo" v-show="route[0] != 'mgsHalf'" :single-line="false" class="my-4">
          <thead>
            <tr>
              <th class="w-40">{{ route[1] }}</th>
              <th v-for="point in routeData[route[0]]">{{ point.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>人数</th>
              <td v-for="point in routeData[route[0]]">{{ point.count }}</td>
            </tr>
          </tbody>
      </n-table>
    </div>

    <n-button type="primary" class="absolute top-4 right-4" @click="viewList">查看名单</n-button>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-hooks-plus';
import { getRouteInfoAPI } from '../../apis';
import useMainStore from '../../store';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import router from '../../router';
import { NButton, NTable } from 'naive-ui';

const certificationStore = useMainStore().useCertificationStore();
const routeData = ref();

const routeInfo = [
  ['zh', '朝晖路线'],
  ['pfHalf', '屏峰半程'],
  ['pfAll', '屏峰全程'],
  ['mgsHalf', '莫干山半程'],
  ['mgsAll', '莫干山全程'],
]

const { run: loadRouteInfo, cancel } = useRequest(
  () => getRouteInfoAPI({ secret: certificationStore.getSecret() }),
  {
    manual: true,
    pollingInterval: 30000, // 每 10 秒刷新一次
    onSuccess: (res: any) => {
      // console.log("refresh")
      routeData.value = res.data;
      // console.log(routeData.value);
    },
  },
);


onMounted(() => {
  loadRouteInfo();
});

onBeforeUnmount(() => {
  cancel();
})

const viewList = () => {
  router.push("/list");
};

</script>