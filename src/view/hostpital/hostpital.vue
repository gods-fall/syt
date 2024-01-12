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
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <span>预约挂号</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><document /></el-icon>
            <span>医院详情</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><setting /></el-icon>
            <span>预约通知</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Warning /></el-icon>

            <span>停诊信息</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><Search /></el-icon>
            <span>查询取消</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <!-- 右侧展示区 -->
    <div class="show">
      <div>456</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Search,
  Warning,
  HomeFilled
} from "@element-plus/icons-vue";
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
      color: #7f7f7f;
    }
  }
  .show {
    flex: 8;
  }
}
</style>


