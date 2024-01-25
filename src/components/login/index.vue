<script lang="ts" setup>
import useUserStore from '@/store/moudle/user';
import {Lock, User} from '@element-plus/icons-vue'
import {computed, reactive, ref} from 'vue';

let scenne = ref<number>(0);
let userstore = useUserStore();
let Dtime = ref<number>(5);
let flag = ref<boolean>(false)
const formRef = ref<any>();
//验证码
let loginParams = reactive({
  phone: '',
  code: ''
});
//规则
const validatorPhone = (rule: any, value: any, callBack: any) => {
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号码格式"))
  }
}

const validatorCode = (rule: any, value: any, callBack: any) => {

  if (/^\d{6}$/.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的格式"))
  }
}

const rule = {
  phone: [
    {validator: validatorPhone, trigger: 'change'},

  ],
  code: [
    {validator: validatorCode, trigger: 'blur'}
  ]
}

//计算表单是否是手机号
let isPhoned = computed(() => {
  //手机号码的正则
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  return reg.test(loginParams.phone)
})
const wxlogin = () => {
  scenne.value = 1
}
const getCode = () => {

  // let res =  await  reqHospitalMcode(loginParams.phone)
  //验证码倒计时
  const Dtimer =
      setInterval(() => {
        Dtime.value--;
        flag.value = true
        if (Dtime.value <= 0) {
          //结束验证倒计时
          clearInterval(Dtimer)
          flag.value = false;
          userstore.getcode(loginParams.phone)
          Dtime.value = 5
        }
      }, 1000)


}
//用户登录点击
const login = () => {
  //发起登录请求
  loginParams.code = userstore.code;

  userstore.userLogin(loginParams);
  userstore.visiable = false;
}

const close = () => {
  //清空搜集数据
  Object.assign(loginParams, {phone: '', code: ''})
  //清除校验
  if (formRef.value != "") {
    formRef.value.resetFields();
  }//重置表单
  userstore.visiable = false;
}

</script>

<template>
  <div class="login_container">
    <!--      登录组件 v-model 控制对话框的显示-->
    <el-dialog v-model="userstore.visiable" title="用户登录" @close="close(formRef)">
      <!--          对话框-->
      <div class="content">
        <el-row>
          <el-col :span="12">
            <div v-show="scenne ==1">
              <div class="wxl">

              </div>
            </div>
            <div v-show="scenne ==0">
              <div class="logint">
                <el-form ref="formRef" :model="loginParams" :rules="rule">
                  <el-form-item prop="phone">
                    <el-input
                        v-model="loginParams.phone"
                        :prefix-icon="User"
                        placeholder="请输入用户名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input

                        v-model="userstore.code"
                        :prefix-icon="Lock"
                        placeholder="请输入手机验证码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button :disabled="!isPhoned?true:false" @click="getCode">获取验证码 <span v-show="flag">&nbsp;({{
                        Dtime
                      }}s)</span>
                    </el-button>
                  </el-form-item>
                </el-form>
                <div class="bottom">
                  <el-button :disabled="(!isPhoned?true:false) || userstore.code.length<3" size="default"
                             style="width: 90%"
                             type="primary" @click="login">用户登录
                  </el-button>

                  <svg class="icon" height="32" p-id="4282" style="margin-top: 10px" t="1705635068457"
                       version="1.1"
                       viewBox="0 0 1024 1024" width="32" xmlns="http://www.w3.org/2000/svg" @click="wxlogin">
                    <path
                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                        fill="#28C445" p-id="4283"></path>
                    <path
                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                        fill="#28C445" p-id="4284"></path>
                  </svg>

                </div>
              </div>

            </div>
          </el-col>
          <el-col :span="12">
            <div class="rightContent">
              <div class="top">
                <div class="leftCor1">
                  <img alt="" src="../../assets/images/logintcor.png">
                  <svg class="icon" height="16" p-id="1523" t="1705636087264"
                       version="1.1" viewBox="0 0 1024 1024" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                        fill="#cdcdcd" p-id="1524"></path>
                    <path
                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                        fill="#cdcdcd" p-id="1525"></path>

                  </svg>
                  <p>微信扫一扫关注</p>
                  <p>"快速预约挂号"</p>
                </div>
                <div class="rightCor2">
                  <img alt="" src="../../assets/images/logintcor.png">
                  <svg class="icon" height="16" p-id="3516" t="1705636232158"
                       version="1.1" viewBox="0 0 1024 1024" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M798.723234 174.782745c0-60.576657-49.106418-109.683075-109.683075-109.683075l-354.708628 0c-60.576657 0-109.683075 49.106418-109.683075 109.683075l0 673.980161c0 60.576657 49.106418 109.683075 109.683075 109.683075l354.708628 0c60.576657 0 109.683075-49.106418 109.683075-109.683075L798.723234 174.782745zM264.557398 237.015112l494.256894 0 0 529.049305-494.256894 0L264.557398 237.015112zM334.356091 105.008612 689.016623 105.008612c38.548968 0 69.798692 31.249725 69.798692 69.798692l0 22.298865-494.256894 0 0-22.298865C264.557398 136.25936 295.807123 105.008612 334.356091 105.008612zM689.016623 918.53704 334.356091 918.53704c-38.548968 0-69.798692-31.249725-69.798692-69.798692l0-43.788296 494.256894 0 0 43.788296C758.814292 887.287315 727.564567 918.53704 689.016623 918.53704z"
                        fill="#cdcdcd" p-id="3517"></path>
                    <path
                        d="M513.173732 829.943282c-16.70752 0-30.30112 13.5936-30.30112 30.30112 0 16.70752 13.5936 30.30112 30.30112 30.30112s30.299073-13.5936 30.299073-30.30112C543.472805 843.536882 529.881253 829.943282 513.173732 829.943282z"
                        fill="#cdcdcd" p-id="3518"></path>
                  </svg>
                  <p>扫一扫下载</p>
                  <p>预约挂号 </p>
                </div>
              </div>

            </div>
            <p class="pul">syt官方指定平台</p>
            <p class="pul">快速挂号安全放心</p>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button size="default" type="primary" @click="close">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.login_container {
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;

  }

  .logint {
    padding: 20px;
    border: 1px solid #ccc;

    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        margin: 10px 0;
      }
    }

  }

  .rightContent {
    .top {
      display: flex;
      justify-content: space-around;

      .leftCor1 {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 130px;
          height: 130px;
          margin-bottom: 4px;
        }

        p {
          margin: 5px 0;
        }
      }

      .rightCor2 {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 130px;
          height: 130px;
          margin-bottom: 4px;
        }

        p {
          margin: 5px 0;
        }
      }
    }
  }

  .pul {
    text-align: center;
    line-height: 40px;
    font-size: 20px;

  }
}
</style>
