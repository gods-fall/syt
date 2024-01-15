import {defineStore} from "pinia";
//pinia的组合式 选择式
import {reqHospitalDetail} from '@/api/hospital/index';
import type {DetailState} from './interface/index'
// 引入详情数据的ts类型

const useDetailStore = defineStore('Detail', {
    state: () => {
        return {
            hospitalInfo: ({} as DetailState)
        }
    },
    actions: {
        //获取医院详情的方法
        async getHostpital(hoscode: string) {
            console.log(hoscode)
            let res = await reqHospitalDetail(hoscode)
            // console.log(res)
            if (res.code == 200) {
                this.hospitalInfo = res.data;
            }
        }

    },
    getters: {}
})
export default useDetailStore;