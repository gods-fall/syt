<template>
  <div class="info">
    {{ hostDetail.hospitalInfo.hospital?.hosname }}
    <el-empty description="暂无数据"/>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/moudle/hospitalDetail'

let hostDetail = useDetailStore();
</script>

<style scoped lang="scss">
.info {
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  vertical-align: center;
}
</style>