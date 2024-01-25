import {defineStore} from "pinia";
import {reqHospitalMcode, reqHostLogin} from '@/api/hospital/index'
import type {LoginData} from '@/api/hospital/type'
//定义用户仓库
const useUserStore = defineStore('User', {
    state: () => {

        return {
            visiable: false, //控制
            code: '',
            UserInfo: JSON.parse(localStorage.getItem('USERINFO')) || {}
        }
    },
    actions: {
        async getcode(phone: string) {
            let res = await reqHospitalMcode(phone);

            if (res.code == 200) {
                this.code = res.data
            }
        },
        async userLogin(data: LoginData) {
            let res = await reqHostLogin(data)
            this.UserInfo = res.data;
            localStorage.setItem('USERINFO', JSON.stringify(this.UserInfo))
            return 'ok'
        },
        logout() {
            this.UserInfo = {name: '', token: ''};
        }

    },
    getters: {}
})
export default useUserStore;