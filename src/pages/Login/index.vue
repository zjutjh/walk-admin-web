<template>
  <div class="flex h-screen">
    <div class="w-1/2 bg-gray-200 flex items-center justify-center">
      <img src="../../assets/JHicon.png" alt="Login Image" class="w-40" />
    </div>
    <div class="w-1/2 flex items-center justify-center">
      <form class="bg-white p-8 rounded shadow-md w-80">
        <h2 class="text-2xl font-bold mb-6 text-center">管理员登录</h2>
        <div class="mb-4">
          <label for="key" class="block text-sm font-medium text-gray-700">输入密钥</label>
          <input
            type="text"
            id="key"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="请输入密钥"
            v-model="secret"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600"
          @click="login"
        >
          登录
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../../router';
import useMainStore from '../../store';

const certificationStore = useMainStore().useCertificationStore();
const secret = ref('');

const login = () => {
  certificationStore.setSecret(secret.value);
  router.push("/route");
};
</script>