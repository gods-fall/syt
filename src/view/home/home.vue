<template>
  <div>
    <!-- 轮播 -->
    <carousel />
    <!-- 搜索 -->
    <div class="serch">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入医院名称"
        @select="handleSelect"
      />
      <el-button type="primary" size="default" :icon="Search"> 搜索 </el-button>
    </div>
    <!-- 主页展示 -->
    <el-row gutter="20">
      <el-col :span="20">
        <level @getLevel="getLevel" />
        <region @getRegion="getRegion" />
        <!-- 展示医院的结构 -->
        <div class="show" v-if="hasHospitalArr.length>0">
          <card
            class="item"
            v-for="(item, index) in hasHospitalArr"
            :key="index"
            :hospital="item"
          />
        </div>
          <el-empty v-else description="没用满足该条件的信息" />

        <!-- 分页器 -->
        <el-pagination
          style="margin-bottom: 10px"
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes ,total "
          :total="hasHospitalNum"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-col>
      <el-col :span="4">456</el-col>
    </el-row>
  </div>
</template>


<script setup lang='ts'>
//引入
import { onMounted, ref } from "vue";
import carousel from "./carousel/index.vue";
import { Search } from "@element-plus/icons-vue";
import level from "./level/index.vue";
import region from "./region/index.vue";
import card from "./card/index.vue";
import { reqHostpital } from "../../api/home/index";
import type { Content, HospitalResponseData } from "../../api/home/type";
//存储医院的数据
let hasHospitalArr = ref<Content>([]);
//存储医院的个数
let hasHospitalNum = ref<number>(0);
//存储区域和等级
let hostype = ref<string>("");
let districtCode = ref<string>("");
//分页器页码
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
//组件挂载完毕发送请求
onMounted(() => {
  getHostpitalInfo();
});
//获取医院的数据
const getHostpitalInfo = async () => {
  //获取医院的数据一页十个 ,
  let resault: HospitalResponseData = await reqHostpital(
    pageNo.value,
    pageSize.value,
    hostype.value,
    districtCode.value
  );
  if (resault.code == 200) {
    hasHospitalArr.value = resault.data.content;
    hasHospitalNum.value = resault.data.totalElements;
  }
};
const currentChange = () => {
  getHostpitalInfo();
};
const sizeChange = () => {
  pageNo.value = 1;
  getHostpitalInfo();
};
//子组件的自定义事件
const getLevel = (level: string) => {
  hostype.value = level;
  getHostpitalInfo();
  
};
const getRegion=(region:string) =>{
  districtCode.value = region;
   getHostpitalInfo();
}
</script>

<style scoped lang="scss">
.serch {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  // 深度选择器
  ::v-deep(.el-input) {
    width: 800px;
    margin-right: 10px;
  }
}
.show {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin-bottom: 20px;
  }
}
</style>