<template>
  <div class="m-6 rounded-lg shadow-md border border-gray-200 p-4 relative">
    <h1 class="text-3xl font-bold mb-4">路线信息展示</h1>
    
    <div v-if="routeData">
      <n-table :bordered="true" :single-line="false">
        <thead>
            <tr>
                <td>路线</td>
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

    <n-button
        type="default"
        class="absolute top-4 right-4"
        @click="goBack"
    >返回主页</n-button>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-hooks-plus';
import { getRouteInfoAPI } from '../../apis';
import useMainStore from '../../store';
import { onMounted, ref } from 'vue';
import router from '../../router';
import { NButton, NTable } from 'naive-ui';

const certificationStore = useMainStore().useCertificationStore();
const routeData = ref();

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

const goBack = () => {
    router.push('/');
};

</script>