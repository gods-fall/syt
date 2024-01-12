<template>
  <div>
    <!-- 首页轮播图 -->
    <el-carousel height="350px" interval="5000">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="../../../assets/images/web-banner1.png" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
 img {
    height:350px;
    width: 100%;
 }
</style>