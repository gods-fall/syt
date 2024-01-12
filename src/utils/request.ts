//axios二次封装
//为什么要封装 利用axios响应 请求 拦截器功能
//请求 携带token 响应简化返回数据 处理http网格错误'

import axios from 'axios';
import {ElMessage} from 'element-plus'
//利用 axios.create方法创建一个axios请求实例:可以设置基础的路径和超时的时间的设置
 const request = axios.create({
    baseURL:'/api', //请求的基础地址
    timeout:500000  //超时
 })
//请求拦截器
request.interceptors.request.use((config)=>{
    //config 请求拦截器回调注入的对象 (配置对象),配置对象的身上header属性
    return config
    //请求拦截器跨域携带token
})
request.interceptors.response.use((response)=>{
    return response.data ;
},(error)=>{
    //处理http网格错误
    let status = error.response.status;
   
    switch(status) {
        case 404:
            //错误提示
            ElMessage({
                type:'error',
                message:error.message
            })
            break;
        case 500|501|502|503|504 |505 :
            ElMessage ({
                type:'error',
                message:error.message
            })

        break;
    }
    return Promise.reject(new Error(error.message))
})
//务必对外暴露
export default request ;