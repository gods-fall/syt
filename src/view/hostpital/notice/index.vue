<template>
  <div class="notice">
    <div class="title">
      {{ notice?.title }}
    </div>
    <div class="firstIntro">
      {{ notice?.text1 }}
    </div>
    <div v-for="(item,index) in notice.hosIron" :key="index" class="show">
      <div class="childTitle">{{ item.childTitle }}</div>
      <div class="ruleIntro">{{ item.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import mock from '@/mock/index.json';

let notice = mock
console.log(notice)
</script>

<style scoped lang="scss">
.notice {
  white-space: pre-line;

  .title {
    text-align: center;
    font-size: 30px;
    line-height: 30px;
  }

  .firstIntro {
    color: #7f7f7f;
    line-height: 30px;
    margin-top: 30px;
  }

  .show {
    color: #7f7f7f;
    line-height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>