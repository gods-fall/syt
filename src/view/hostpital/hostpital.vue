<template>
  <div class="hospital">
    <!-- 左侧导航区 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        <span> / 医院信息</span>
      </div>
      <div>
        <el-menu
            :default-active="useroute.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
            router="true"
        >
          <el-menu-item index="/hostpital/register">
            <el-icon><icon-menu /></el-icon>
            <span>预约挂号</span>
          </el-menu-item>
          <el-menu-item index="/hostpital/detail">
            <el-icon><document /></el-icon>
            <span>医院详情</span>
          </el-menu-item>
          <el-menu-item index="/hostpital/notice">
            <el-icon><setting /></el-icon>
            <span>预约通知</span>
          </el-menu-item>
          <el-menu-item index="/hostpital/close">
            <el-icon><Warning /></el-icon>

            <span>停诊信息</span>
          </el-menu-item>
          <el-menu-item index="/hostpital/search">
            <el-icon><Search /></el-icon>
            <span>查询取消</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <!-- 右侧展示区 -->
    <div class="show">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Document, HomeFilled, Menu as IconMenu, Search, Setting, Warning} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import useDetailStore from '@/store/moudle/hospitalDetail'
//组件挂载完毕通知pinia仓库发送请求获取详情 存储仓库之中
let detailStore = useDetailStore();
let useroute = useRoute();
onMounted(() => {
  detailStore.getHostpital(useroute.query.hoscoed as string)
})

</script>

<style lang="scss" scoped>
//左侧菜单需要用到的图标
.hospital {
  display: flex;
  .menu {
    flex: 2;
    display: flex; 
    flex-direction: column;
    align-items: center;
   
    span {

    }
  }
  .show {
    flex: 8;
  }
}
</style>


