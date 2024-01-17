//引入req
import request from '@/utils/request';
import type {hospitalDetail, HospitalItemReqData} from '@/api/hospital/type'

enum API {
    HOSPITAL_CODEURL = '/hosp/hospital/',
    //获取医院科室
    HOSPITAL_ITEMURL = '/hosp/hospital/department/'
}

export const reqHospitalDetail = (hoscode: string) => request.get<any, hospitalDetail>(API.HOSPITAL_CODEURL + `${hoscode}`)
export const reqHospitalItem = (hoscode: string) => request.get<any, HospitalItemReqData>(API.HOSPITAL_ITEMURL + `${hoscode}`)