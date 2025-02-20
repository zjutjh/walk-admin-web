import { defineStore } from "pinia";
import { ref } from "vue";

const useCertificationStore = defineStore("certification", () => {
    // 登录密钥
    const secret = ref("");
    const setSecret = (value: string) => {
        secret.value = value;
    };
    const getSecret = ():string => {
        return secret.value;
    }

    return {
        secret,
        setSecret,
        getSecret,
    }; 
},{
    persist: true,
});

export default useCertificationStore;
