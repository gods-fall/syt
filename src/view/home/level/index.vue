<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <div class="right">
        <ul>
          <li :class="{ active: colorFlag == '' }" @click="changeLevel('')">
            全部
          </li>
          <li
            v-for="level in LevelArr"
            :key="level.value"
            :class="{ active: colorFlag == level.value }"
            @click="changeLevel(level.value)"
          >
            {{ level.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHosLevel } from "../../../api/home/index";
import { onMounted, ref } from "vue";
import { HospitalLevelAndRegionResponseData } from "../../../api/home/type";
onMounted(() => {
  getLevel();
});
let LevelArr = ref<HospitalLevelAndRegionResponseData>([]);
const getLevel = async () => {
  let resault: HospitalLevelAndRegionResponseData = await reqHosLevel(
    "Hostype"
  );
  if (resault.code == 200) {
    LevelArr.value = resault.data;
   
  }
};
//控制医院等级高亮
let colorFlag = ref<string>("");
const changeLevel = (level: string) => {
  colorFlag.value = level;
  console.log(level)
  //自定义事件触发 ,传给父
  $emit('getLevel',level);
};

let $emit =defineEmits(['getLevel']) ;
</script>

<style scoped lang="scss">
.level {
  h1 {
    color: #7f7f7f;
    font-size: 14px;
    font-weight: 900;
    margin: 10px 0;
  }
  .content {
    display: flex;

    font-size: 14px;
    .left {
      color: #7f7f7f;
      margin-right: 10px;
    }
    .right {
      color: #7f7f7f;
      ul {
        display: flex;
        li {
          margin-right: 10px;
          &.active {
            color: #55a6fe;
          }
        }
        li:hover {
          cursor: pointer;
          color: #55a6fe;
        }
      }
    }
  }
}
</style>