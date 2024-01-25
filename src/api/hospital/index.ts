//引入req
import request from '@/utils/request';
import type {hospitalDetail, HospitalItemReqData} from '@/api/hospital/type'

enum API {
    HOSPITAL_CODEURL = '/hosp/hospital/',
    //获取医院科室
    HOSPITAL_ITEMURL = '/hosp/hospital/department/',
    //验证码的接口
    HOSPIAL_MCODE = '/sms/send/',
    //会员登录
    HOSPITAL_LOGINURL = '/user/login/'
}

export const reqHospitalDetail = (hoscode: string) => request.get<any, hospitalDetail>(API.HOSPITAL_CODEURL + `${hoscode}`)
export const reqHospitalItem = (hoscode: string) => request.get<any, HospitalItemReqData>(API.HOSPITAL_ITEMURL + `${hoscode}`)

export const reqHospitalMcode = (phone: string) => request.get(API.HOSPIAL_MCODE + `${phone}`)
export const reqHostLogin = (data: any) => request.post(API.HOSPITAL_LOGINURL, data)