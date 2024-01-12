//统一管理首页模块接口
import request from '@/utils/request';
import type { HospitalResponseData, HospitalLevelAndRegionResponseData,HospitalSearch } from './type';
enum API {
    //获取医院数据得劲接口地址
    HOSPITAL_URL = '/hosp/hospital/',
    HOSPITAL_LEVEL = '/cmn/dict/findByDictCode/',
    HOSPITAL_POSITON = '/cmn/dict/findByParentId/',
    HOSPITAL_SEARCH = '/hosp/hospital/findByHosname/',
}
//获取医院的数据 
export const reqHostpital = (page: number, limit: number, hostype = '', districtCode = '') => request.get<any, HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
export const reqHosLevel = (dictCode: string) => request.get(API.HOSPITAL_LEVEL + `${dictCode}`)
export const reqHosPosition = (parentId: string) => request.get(API.HOSPITAL_POSITON + `${parentId}`)
export const reqHosSearch = (hosName: string) => request.get<any,HospitalSearch>(API.HOSPITAL_SEARCH + `${hosName}`)