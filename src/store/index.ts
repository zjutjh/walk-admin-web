import { defineStore } from "pinia";
import useCertificationStore from "./userStore/certificationStore";

const useMainStore = defineStore("main", () => {
    return {
        useCertificationStore,
    }; 
});

export default useMainStore;
