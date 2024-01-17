import {defineStore} from "pinia";
//定义用户仓库
const useUserStore = defineStore('User', {
    state: () => {

        return {
            visiable: false, //控制
        }
    },
    actions: {},
    getters: {}
})