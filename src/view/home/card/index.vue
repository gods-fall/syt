<template>
  <el-card class="box-card" shadow="hover" @click="goDetail">
    <div class="content">
      <div class="left">
        <div class="hospitak_name">{{hospital.hosname}}</div>
        <div class="tips">
          <div class="level">
            <svg
              t="1704887705711"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4320"
              width="15"
              height="15"
            >
              <path
                d="M904.075636 517.655273l-93.090909 372.363636a23.202909 23.202909 0 0 1-22.574545 17.617455H372.363636V482.443636l14.336-39.982545 97.117091-271.150546 1.303273-3.630545 0.884364-3.746909A61.719273 61.719273 0 0 1 546.234182 116.363636h0.069818c18.222545 0 34.839273 7.586909 46.778182 21.341091 11.915636 13.777455 17.082182 31.301818 14.522182 49.314909l-31.744 222.021819L564.48 488.727273h317.021091c9.890909 0 15.732364 5.608727 18.338909 8.96a22.760727 22.760727 0 0 1 4.235636 19.968zM302.545455 907.636364H139.636364c-12.823273 0-23.272727-10.426182-23.272728-23.272728V512c0-12.823273 10.449455-23.272727 23.272728-23.272727h162.909091v418.909091z m578.955636-488.727273H644.980364l31.720727-221.998546C688.058182 117.550545 626.455273 46.545455 546.304 46.545455h-0.069818a131.723636 131.723636 0 0 0-128.139637 101.21309L320.954182 418.909091H139.636364a93.090909 93.090909 0 0 0-93.090909 93.090909v372.363636a93.090909 93.090909 0 0 0 93.090909 93.090909h648.773818a93.090909 93.090909 0 0 0 90.321454-70.49309l93.090909-372.363637C986.507636 475.834182 942.08 418.909091 881.501091 418.909091z"
                fill="#797979"
                p-id="4321"
              ></path>
            </svg>
            <span>{{hospital.param.hostypeString}}</span>
          </div>
          <div class="time">
            <svg
              t="1704887871896"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6322"
              width="15"
              height="15"
            >
              <path
                d="M917.333333 512c0-223.850667-181.482667-405.333333-405.333333-405.333333S106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333z m-425.984-5.333333a21.333333 21.333333 0 0 0 6.101334 20.928l124.8 116.394666a21.333333 21.333333 0 0 0 29.12-31.189333l-118.08-110.122667L533.333333 501.333333v-170.666666a21.333333 21.333333 0 0 0-42.666666 0v170.666666c0 1.834667 0.213333 3.626667 0.682666 5.333334zM149.333333 512c0-200.298667 162.368-362.666667 362.666667-362.666667s362.666667 162.368 362.666667 362.666667-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512z m612.501334 305.002667a21.333333 21.333333 0 1 0-30.336 29.994666l74.304 75.157334a21.333333 21.333333 0 1 0 30.336-29.994667l-74.304-75.157333z m-480.362667 29.994666a21.333333 21.333333 0 0 0-30.336-29.994666L176.832 892.16a21.333333 21.333333 0 1 0 30.336 29.994667l74.304-75.157334zM778.496 128A117.525333 117.525333 0 0 1 896 245.333333a21.333333 21.333333 0 0 0 42.666667 0C938.666667 157.077333 866.901333 85.333333 778.496 85.333333h-20.992a21.333333 21.333333 0 1 0 0 42.666667h20.992zM245.504 85.333333C157.098667 85.333333 85.333333 157.077333 85.333333 245.333333a21.333333 21.333333 0 0 0 42.666667 0C128 180.629333 180.672 128 245.504 128h20.992a21.333333 21.333333 0 1 0 0-42.666667h-20.992z"
                fill="#3D3D3D"
                p-id="6323"
              ></path>
            </svg>
            <span>每天{{hospital.bookingRule?.releaseTime}}放号</span>
          </div>
        </div>
      </div>
      <div class="right">
        <img :src="`data:image/jpeg;base64,${hospital.logoData}`" alt="" />

      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
//接收父组件传递 
let props =  defineProps(['hospital']);
import {useRouter} from 'vue-router'

let $router = useRouter();
const goDetail = ()=>{
  $router.push({path: '/hostpital/register', query: {hoscoed: props.hospital.hoscode}})
  // console.log(props.hospital)
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: space-between;
  .left {
    width: 60%;
    .hostpital_name {
    }
    .tips {
      color: #7f7f7f;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      vertical-align:middle;
      .level {
        display: flex; 
        align-items: center;
        span {
            margin-left: 5px;
        }
      }
      .time {
         display: flex; 
        align-items: center;
         span {
            margin-left: 5px;
        }
      }
    }
  }
  .right {
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>