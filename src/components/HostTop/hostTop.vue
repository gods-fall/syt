<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="">
        <p>尚医通 预约挂号统一平台</p>
      </div>

      <div class="right">
        <p class="help">帮助中心</p>
        <p v-if="!userstore.UserInfo.name" class="login" @click="login">登录/注册</p>
        <el-dropdown v-else>
    <span class="el-dropdown-link">
      {{ userstore.UserInfo.name }}<el-icon class="el-icon--right"><arrow-down/></el-icon>
    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">实名认证</el-dropdown-item>
              <el-dropdown-item command="b">挂号订单</el-dropdown-item>
              <el-dropdown-item command="c">就诊管理</el-dropdown-item>
              <el-dropdown-item command="d" @click="exit">退出登录</el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import {useRouter} from 'vue-router'
import useUserStore from '@/store/moudle/user';
import {ArrowDown} from '@element-plus/icons-vue';

let userstore = useUserStore();
let $router = useRouter();
  const goHome = ()=>{
    $router.push({path:'/home'})
  }
const login = () => {
  userstore.visiable = !userstore.visiable;
  userstore.code = ''

  }

//退出登录
const exit = () => {
  localStorage.removeItem('USERINFO');
  userstore.logout()
  $router.push({path: '/home'})
}
</script>

<style scoped lang ='scss'>
  .top {
    position: fixed;
    z-index: 999;
    width: 100%;
    height:70px;
    background-color: #fff;
    display: flex;
    justify-content: center;

    .content {
      
      height: 70px;
      width: 1200px;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      .left {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
        p {
          font-size: 22px;
          color: #55a6fe;
        }
      }
      .right {
        display: flex;
        height: 70px;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #ccc;
        .help {
          margin-right:10px;
        }

        .login {
          cursor: pointer;

          &:hover {
            color: #7f7f7f;
          }
        }
      }
    }
  }
</style>