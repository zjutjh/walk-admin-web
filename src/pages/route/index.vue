<template>
  <div class="m-6 rounded-lg shadow-md border border-gray-200 p-4 relative">
    <h1 class="text-3xl font-bold mb-4">路线信息展示</h1>
    
    <div v-if="routeData">
      <n-table :single-line="false">
        <thead>
            <tr>
                <th>路线</th>
                <th>未到</th>
                <th>起点</th>
                <th v-for="i in maxPoint">{{ i }}</th>
                <th>终点</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>朝晖路线</td>
            <td v-for="num in routeData.zh">{{ num }}</td>
          </tr>
          <tr>
            <td>屏峰半程</td>
            <td v-for="num in routeData.pfHalf">{{ num }}</td>
          </tr>
          <tr>
            <td>屏峰全程</td>
            <td v-for="num in routeData.pfAll">{{ num }}</td>
          </tr>
          <tr>
            <td>莫干山半程</td>
            <td v-for="num in routeData.mgsHalf">{{ num }}</td>
          </tr>
          <tr>
            <td>莫干山全程</td>
            <td v-for="num in routeData.mgsAll">{{ num }}</td>
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
import { computed, onMounted, ref } from 'vue';
import router from '../../router';
import { NButton, NTable } from 'naive-ui';

const certificationStore = useMainStore().useCertificationStore();
const routeData = ref();

const maxPoint = computed(() => {
  let n = 0;
  if (!routeData.value) return 0;
  for (const route in routeData.value) {
    if (routeData.value[route].length > n) {
      n = routeData.value[route].length - 3;
    }
  }
  return n;
})

onMounted(() => {
    useRequest(() => getRouteInfoAPI({
        secret: certificationStore.getSecret(),
    }), {
        onSuccess: (res: any) => {
            routeData.value = res.data;
            console.log(routeData.value);
        }
    });
});

const viewList = () => {
  router.push("/list");
};

</script>