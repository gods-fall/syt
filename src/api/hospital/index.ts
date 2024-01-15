//引入req
import request from '@/utils/request';
import type {hospitalDetail} from '@/api/hospital/type'

enum API {
    HOSPITAL_CODEURL = '/hosp/hospital/',
}

export const reqHospitalDetail = (hoscode: string) => request.get<any, hospitalDetail>(API.HOSPITAL_CODEURL + `${hoscode}`)