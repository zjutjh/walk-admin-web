import { defineStore } from "pinia";
import { ref } from "vue";

const useCertificationStore = defineStore("certification", () => {
    // 登录密钥
    const secret = ref();
    const setSecret = (value: string) => {
        secret.value = value;
    };

    return {
        secret,
        setSecret,
    }; 
});

export default useCertificationStore;
