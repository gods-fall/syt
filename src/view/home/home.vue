<template>
  <div>
    <!-- 轮播 -->
    <carousel />
    <!-- 搜索 -->
    <div class="serch">
      <el-autocomplete
        v-model="hosName"
        :fetch-suggestions="fetchData"
        placeholder="请输入医院名称"
        :trigger-on-focus="false"
        @select="goDetail"
      />
      <el-button type="primary" size="default" :icon="Search"> 搜索 </el-button>
    </div>
    <!-- 主页展示 -->
    <el-row gutter="20">
      <el-col :span="20">
        <level @getLevel="getLevel" />
        <region @getRegion="getRegion" />
        <!-- 展示医院的结构 -->
        <div class="show" v-if="hasHospitalArr.length > 0">
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
      <el-col :span="4">
        <div class="deparment">
          <div class="deheader">
            <div class="left">
              <svg
                t="1705043762418"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4333"
                width="16"
                height="16"
              >
                <path
                  d="M400.696008 129.093147c-17.248849 0-31.233352 13.984503-31.233352 31.233352l0 30.470989c0 17.248849 13.984503 31.233352 31.233352 31.233352s31.233352-13.984503 31.233352-31.233352l0-30.470989C431.92936 143.078673 417.944857 129.093147 400.696008 129.093147z"
                  fill="#999999"
                  p-id="4334"
                ></path>
                <path
                  d="M623.647823 129.093147c-17.248849 0-31.233352 13.984503-31.233352 31.233352l0 30.470989c0 17.248849 13.985526 31.233352 31.233352 31.233352 17.248849 0 31.233352-13.984503 31.233352-31.233352l0-30.470989C654.881175 143.078673 640.896672 129.093147 623.647823 129.093147z"
                  fill="#999999"
                  p-id="4335"
                ></path>
                <path
                  d="M425.695379 312.937269c11.209296 18.047028 41.974997 48.588625 86.152149 48.588625 43.958164 0 75.100442-30.308283 86.573751-48.223305 9.302877-14.528901 5.068436-33.846876-9.455349-43.149752-14.539134-9.307993-33.851992-5.063319-43.149752 9.455349-0.121773 0.198521-13.379729 19.449981-33.968649 19.449981-19.993357 0-32.428573-18.107403-33.271778-19.373233-9.17087-14.417361-28.28009-18.799158-42.829458-9.760295C421.089477 279.028994 416.591023 298.28557 425.695379 312.937269z"
                  fill="#999999"
                  p-id="4336"
                ></path>
                <path
                  d="M564.242851 625.945145l-20.278859 0L543.963992 462.486306c0-17.253966-13.985526-31.233352-31.233352-31.233352-17.248849 0-31.233352 13.979386-31.233352 31.233352l0 163.457816-20.283975 0c-45.924959 0-83.289961 37.363979-83.289961 83.289961l0 103.024421c0 45.924959 37.363979 83.289961 83.289961 83.289961l103.029538 0c45.924959 0 83.289961-37.363979 83.289961-83.289961L647.532813 709.234083C647.532813 663.309124 610.168834 625.945145 564.242851 625.945145zM585.066109 812.258505c0 11.286044-9.537214 20.822235-20.822235 20.822235L461.214337 833.080739c-11.286044 0-20.822235-9.537214-20.822235-20.822235L440.392102 709.234083c0-11.286044 9.537214-20.822235 20.822235-20.822235l103.029538 0c11.286044 0 20.822235 9.537214 20.822235 20.822235L585.066109 812.258505z"
                  fill="#999999"
                  p-id="4337"
                ></path>
                <path
                  d="M250.808256 625.945145l-17.482163 0 0-266.970354c0-35.483142 28.864398-64.35368 64.343447-64.35368 17.248849 0 31.233352-13.984503 31.233352-31.233352s-13.985526-31.233352-31.233352-31.233352c-69.924559 0-126.810151 56.890708-126.810151 126.820384l0 266.970354-23.079648 0c-45.924959 0-83.289961 37.363979-83.289961 83.289961l0 103.024421c0 45.924959 37.363979 83.289961 83.289961 83.289961l103.029538 0c45.924959 0 83.289961-37.363979 83.289961-83.289961L334.099241 709.234083C334.098217 663.309124 296.734238 625.945145 250.808256 625.945145zM271.630491 812.258505c0 11.286044-9.537214 20.822235-20.822235 20.822235L147.778718 833.080739c-11.286044 0-20.822235-9.537214-20.822235-20.822235L126.956484 709.234083c0-11.286044 9.537214-20.822235 20.822235-20.822235l103.029538 0c11.286044 0 20.822235 9.537214 20.822235 20.822235L271.630491 812.258505z"
                  fill="#999999"
                  p-id="4338"
                ></path>
                <path
                  d="M876.565113 625.945145l-21.961174 0 0-266.970354c0-69.929676-56.890708-126.820384-126.815267-126.820384-17.248849 0-31.233352 13.985526-31.233352 31.233352s13.984503 31.233352 31.233352 31.233352c35.483142 0 64.348564 28.869514 64.348564 64.35368l0 266.970354-18.605753 0c-45.924959 0-83.289961 37.363979-83.289961 83.289961l0 103.024421c0 45.924959 37.363979 83.289961 83.289961 83.289961l103.034655 0c45.924959 0 83.289961-37.363979 83.289961-83.289961L959.856098 709.234083C959.854051 663.309124 922.490072 625.945145 876.565113 625.945145zM897.387347 812.258505c0 11.286044-9.537214 20.822235-20.822235 20.822235L773.530458 833.080739c-11.286044 0-20.822235-9.537214-20.822235-20.822235L752.708224 709.234083c0-11.286044 9.537214-20.822235 20.822235-20.822235l103.034655 0c11.286044 0 20.822235 9.537214 20.822235 20.822235L897.387347 812.258505z"
                  fill="#999999"
                  p-id="4339"
                ></path>
              </svg>
              <span>常见科室</span>
            </div>
            <div class="right">
              <span>全部</span>
              <!-- <svg t="1705043919132" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6812" width="16" height="16"><path d="M412.367 6.389l-63.88 62.071 460.007 446.973-460.007 446.975 63.88 62.071 523.885-509.044z" fill="#272636" p-id="6813"></path></svg> -->
            </div>
          </div>
          <div class="demiddle">
            <ul>
              <li>神经内科</li>
              <li>心理内科</li>
              <li>心理内科</li>
              <li>心理内科</li>
              <li>神经内科</li>
              <li>心理内科</li>
              <li>心理内科</li>
              <li>心理内科</li>
            </ul>
          </div>
        </div>
        <!-- 平台科室 -->
        <div class="notice">
          
          <div class="noticecontent">
            <div class="left">
              <svg
                t="1705045685750"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8174"
                width="16"
                height="16"
              >
                <path
                  d="M285.952 623.616c-94.464 0-171.264-76.8-171.264-171.264s76.8-171.264 171.264-171.264c11.008 0 21.76 1.024 32.512 3.072 16.64 3.072 27.648 19.2 24.32 35.84-3.072 16.64-19.2 27.648-35.84 24.32-6.912-1.28-13.824-2.048-20.736-2.048-60.672 0-109.824 49.152-109.824 109.824s49.152 109.824 109.824 109.824c16.896 0 30.72 13.824 30.72 30.72s-14.08 30.976-30.976 30.976z"
                  fill="#d81e06"
                  p-id="8175"
                ></path>
                <path
                  d="M313.088 343.296c-13.824 0-26.624-9.472-29.952-23.552-3.84-15.872-5.632-32.256-5.632-48.896 0-116.48 94.72-211.456 211.456-211.456 55.552 0 108.032 21.504 147.712 60.16 39.68 38.912 62.208 90.624 63.488 146.176 0.512 16.896-13.056 30.976-29.952 31.488h-0.768c-16.64 0-30.208-13.312-30.72-29.952-1.792-80.64-69.12-146.432-150.016-146.432-82.688 0-150.016 67.328-150.016 150.016 0 11.776 1.28 23.296 4.096 34.816 3.84 16.384-6.4 33.024-22.784 36.864-2.304 0.512-4.608 0.768-6.912 0.768z"
                  fill="#d81e06"
                  p-id="8176"
                ></path>
                <path
                  d="M702.72 623.616c-16.896 0-30.72-13.824-30.72-30.72s13.824-30.72 30.72-30.72c73.472 0 133.12-59.648 133.12-133.12s-59.648-133.12-133.12-133.12c-8.96 0-18.176 1.024-26.88 2.816-16.64 3.328-32.768-7.424-36.352-24.064-3.328-16.64 7.424-32.768 23.808-36.352 12.8-2.56 26.112-3.84 39.168-3.84 107.264 0 194.56 87.296 194.56 194.56s-87.04 194.56-194.304 194.56z"
                  fill="#d81e06"
                  p-id="8177"
                ></path>
                <path
                  d="M286.976 562.176h415.744v61.44H286.976z"
                  fill="#d81e06"
                  p-id="8178"
                ></path>
                <path
                  d="M272.896 794.88H209.152v-61.44h63.744c4.608 0 8.448-3.84 8.448-8.448V599.04h61.44v125.952c0 38.656-31.232 69.888-69.888 69.888zM474.112 608.256h61.44v189.44h-61.44zM837.376 807.68H734.72c-38.4 0-69.888-31.232-69.888-69.888v-129.792h61.44v129.792c0 4.608 3.84 8.448 8.448 8.448h102.656v61.44z"
                  fill="#d81e06"
                  p-id="8179"
                ></path>
                <path
                  d="M142.336 875.776c-59.392 0-107.52-48.128-107.52-107.52s48.128-107.52 107.52-107.52 107.52 48.128 107.52 107.52-48.128 107.52-107.52 107.52z m0-153.6c-25.344 0-46.08 20.736-46.08 46.08s20.736 46.08 46.08 46.08 46.08-20.736 46.08-46.08-20.736-46.08-46.08-46.08zM501.76 977.152c-59.392 0-107.52-48.128-107.52-107.52s48.128-107.52 107.52-107.52 107.52 48.128 107.52 107.52-48.384 107.52-107.52 107.52z m0-153.6c-25.344 0-46.08 20.736-46.08 46.08s20.736 46.08 46.08 46.08 46.08-20.736 46.08-46.08-20.736-46.08-46.08-46.08zM888.576 881.664c-59.392 0-107.52-48.128-107.52-107.52s48.128-107.52 107.52-107.52 107.52 48.128 107.52 107.52-48.384 107.52-107.52 107.52z m0-153.6c-25.344 0-46.08 20.736-46.08 46.08s20.736 46.08 46.08 46.08 46.08-20.736 46.08-46.08-20.736-46.08-46.08-46.08z"
                  fill="#d81e06"
                  p-id="8180"
                ></path>
              </svg>
              <span>平台公告</span>
            </div>
            <div class="right">
              <span>全部</span>
            </div>
          </div>
          <div class="demiddle">
            <ul>
              <li>神经内科</li>
              <li>心理内科</li>
              <li>心理内科</li>
            </ul>
          </div>
        </div>
        <!-- 停诊公告 -->
         <div class="notice">
          
          <div class="noticecontent">
            <div class="left">
              <svg
                t="1705045685750"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8174"
                width="16"
                height="16"
              >
                <path
                  d="M285.952 623.616c-94.464 0-171.264-76.8-171.264-171.264s76.8-171.264 171.264-171.264c11.008 0 21.76 1.024 32.512 3.072 16.64 3.072 27.648 19.2 24.32 35.84-3.072 16.64-19.2 27.648-35.84 24.32-6.912-1.28-13.824-2.048-20.736-2.048-60.672 0-109.824 49.152-109.824 109.824s49.152 109.824 109.824 109.824c16.896 0 30.72 13.824 30.72 30.72s-14.08 30.976-30.976 30.976z"
                  fill="#d81e06"
                  p-id="8175"
                ></path>
                <path
                  d="M313.088 343.296c-13.824 0-26.624-9.472-29.952-23.552-3.84-15.872-5.632-32.256-5.632-48.896 0-116.48 94.72-211.456 211.456-211.456 55.552 0 108.032 21.504 147.712 60.16 39.68 38.912 62.208 90.624 63.488 146.176 0.512 16.896-13.056 30.976-29.952 31.488h-0.768c-16.64 0-30.208-13.312-30.72-29.952-1.792-80.64-69.12-146.432-150.016-146.432-82.688 0-150.016 67.328-150.016 150.016 0 11.776 1.28 23.296 4.096 34.816 3.84 16.384-6.4 33.024-22.784 36.864-2.304 0.512-4.608 0.768-6.912 0.768z"
                  fill="#d81e06"
                  p-id="8176"
                ></path>
                <path
                  d="M702.72 623.616c-16.896 0-30.72-13.824-30.72-30.72s13.824-30.72 30.72-30.72c73.472 0 133.12-59.648 133.12-133.12s-59.648-133.12-133.12-133.12c-8.96 0-18.176 1.024-26.88 2.816-16.64 3.328-32.768-7.424-36.352-24.064-3.328-16.64 7.424-32.768 23.808-36.352 12.8-2.56 26.112-3.84 39.168-3.84 107.264 0 194.56 87.296 194.56 194.56s-87.04 194.56-194.304 194.56z"
                  fill="#d81e06"
                  p-id="8177"
                ></path>
                <path
                  d="M286.976 562.176h415.744v61.44H286.976z"
                  fill="#d81e06"
                  p-id="8178"
                ></path>
                <path
                  d="M272.896 794.88H209.152v-61.44h63.744c4.608 0 8.448-3.84 8.448-8.448V599.04h61.44v125.952c0 38.656-31.232 69.888-69.888 69.888zM474.112 608.256h61.44v189.44h-61.44zM837.376 807.68H734.72c-38.4 0-69.888-31.232-69.888-69.888v-129.792h61.44v129.792c0 4.608 3.84 8.448 8.448 8.448h102.656v61.44z"
                  fill="#d81e06"
                  p-id="8179"
                ></path>
                <path
                  d="M142.336 875.776c-59.392 0-107.52-48.128-107.52-107.52s48.128-107.52 107.52-107.52 107.52 48.128 107.52 107.52-48.128 107.52-107.52 107.52z m0-153.6c-25.344 0-46.08 20.736-46.08 46.08s20.736 46.08 46.08 46.08 46.08-20.736 46.08-46.08-20.736-46.08-46.08-46.08zM501.76 977.152c-59.392 0-107.52-48.128-107.52-107.52s48.128-107.52 107.52-107.52 107.52 48.128 107.52 107.52-48.384 107.52-107.52 107.52z m0-153.6c-25.344 0-46.08 20.736-46.08 46.08s20.736 46.08 46.08 46.08 46.08-20.736 46.08-46.08-20.736-46.08-46.08-46.08zM888.576 881.664c-59.392 0-107.52-48.128-107.52-107.52s48.128-107.52 107.52-107.52 107.52 48.128 107.52 107.52-48.384 107.52-107.52 107.52z m0-153.6c-25.344 0-46.08 20.736-46.08 46.08s20.736 46.08 46.08 46.08 46.08-20.736 46.08-46.08-20.736-46.08-46.08-46.08z"
                  fill="#d81e06"
                  p-id="8180"
                ></path>
              </svg>
              <span>平台公告</span>
            </div>
            <div class="right">
              <span>全部</span>
            </div>
          </div>
          <div class="demiddle">
            <ul>
              <li>神经内科</li>
              <li>心理内科</li>
              <li>心理内科</li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script setup lang='ts'>
//引入
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import carousel from "./carousel/index.vue";
import {Search} from "@element-plus/icons-vue";
import level from "./level/index.vue";
import region from "./region/index.vue";
import card from "./card/index.vue";
import {reqHosSearch, reqHostpital} from "../../api/home/index";
import type {Content, HospitalResponseData, HospitalSearch,} from "../../api/home/type";

let $router = useRouter();
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
const getRegion = (region: string) => {
  districtCode.value = region;
  getHostpitalInfo();
};
//收集医院的名字
let hosName = ref<string>("");
const fetchData = async (ketword: string, cd: any) => {
  let res: HospitalSearch = await reqHosSearch(ketword);
  // console.log(res.data)
  // console.log(hosName)
  let showData = res.data.map((item) => {
    return {
      value: item.hosname,
      hoscode: item.hoscode, //存储医院编码
    };
  });
  cd(showData);
};
//跳转详情页
const goDetail = (item: any) => {
  //跳转医院详情页,query
  $router.push({path: '/hostpital/register', query: {hoscoed: item.hoscode}})
};
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
    width: 600px;
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
.deparment {
  .deheader {
    color: #7f7f7f;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      span {
        color: #7f7f7f;
        margin-left: 5px;
      }
    }
  }
  .demiddle {
    display: flex;
   
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        color: #7f7f7f;
        width: 40%;
        margin-top: 20px;
      }
    }
  }

}
  .notice {
      margin-top: 20px;
    .noticecontent {
      color: #7f7f7f;
      display: flex; 
      justify-content: space-between;
      .left {
        span {
          margin-left: 5px;
        }
      }
      .right {

      }
    }
    .demiddle {
      color: #7f7f7f;
      ul {
        li {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 20px;
        }
      }
    }
  }
</style>