<script setup lang="ts">
import request from './utils/request'
import {onMounted} from 'vue'

onMounted(()=>{
    request.get('/hosp/hospital/1/10').then(res=>{
     
    })
  })
</script>

<template>
  <div class="container">
    <HostTop/>
    <div class="contain">
      <!-- 路由展示 -->
     <router-view></router-view>
    </div>
    <HostBottom/>
    <Login/>
  </div>
  
</template>

<style scoped lang ='scss'>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .contain {
      margin-top: 70px;
      width: 1200px;
      min-height: 700px;
      background: #ffffff;
    }
  }

</style>
