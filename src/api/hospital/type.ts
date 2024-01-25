//定义详情模块的ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//代表医院详情的type
export interface HospitalDetail {

    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string  []
    }
    "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "hostypeString": string,
            "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string,
        "intro": string,
        "route": string,
        "status": number,
        "bookingRule": null
    }

}


//医院详情返回数据的返回接口
export interface hospitalDetail extends ResponseData {
    data: HospitalDetail
}

//医院科室
export interface HospitalItem {

    "depcode": string,
    "depname": string,
    "children"?: HospitalItem[]


}

export type HostpitalItemArr = HospitalItem []

export interface HospitalItemReqData extends ResponseData {
    data: HospitalItemReqData
}

//验证码
export interface HospitalMcode {

}

//定义post带参
export interface reqHospLogin {

    "code": "string",

    "phone": "string"

}

export interface UserInfo {
    "name": string,
    "token": string
}

//登录接口返回的数据
export interface reqHosLoginData extends ResponseData {
    data: UserInfo
}