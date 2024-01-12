<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <div class="right">
        <ul>
          <li :class="{ active: regionFlag == '' }" @click="changeLevel('')">
            全部
          </li>
          <li
            v-for="region in RegionArr"
            :key="region.value"
            :class="{ active: regionFlag == region.value }"
            @click="changeLevel(region.value)"
          >
            {{ region.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reqHosLevel } from "../../../api/home/index";
import { onMounted, ref } from "vue";
import {
  HospitalLevelAndRegionResponseData,
  HosLevelArr,
} from "../../../api/home/type";
let RegionArr = ref<HosLevelArr>([]);
onMounted(() => {
  getRegion();
});
const getRegion = async () => {
  let reauslt: HospitalLevelAndRegionResponseData = await reqHosLevel("Beijin");
  if (reauslt.code == 200) {
    RegionArr.value = reauslt.data;
  }
};
let regionFlag = ref<string>("");
const changeLevel = (region: string) => {
  regionFlag.value = region;
  $emit('getRegion',region)
};
let $emit = defineEmits(['getRegion'])
</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 10px;
  .content {
    display: flex;

    font-size: 14px;
    .left {
      margin-right: 10px;
      width: 40px;
    }
    .right {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 15px;
          margin-bottom: 11px;
          &.active {
            color: #55a6fe;
          }
        }
        li:hover {
          color: #55a6fe;
          cursor: pointer;
        }
      }
    }
  }
}
</style>