黑暗模式和白天模式

<template>
  <div class="box">
   
    <div class="border_box">
    <div class="bor_right" @click="btnSwitch">
      <div  v-if="!blackFlag"><i class="iconfont  icon-taiyang"></i></div>
      <div  v-else><i class="iconfont  icon-yueliang"></i></div>
    </div>
    </div>  
  </div>
</template>

<script  lang="ts"  setup>
import {ref,onMounted,watch} from 'vue'

import { useToggle } from '@vueuse/shared'
import { useDark } from "@vueuse/core";

// let blackFlag = ref<boolean>(false);
  let  blackFlag = ref<any>(localStorage.getItem("APP_DARK") || false);


// 白天黑夜切换
const btnSwitch = ()=>{
  blackFlag.value = !blackFlag.value;
}



watch(
() => blackFlag.value,
(value) => {
  if (value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("APP_DARK", value);
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("APP_DARK");
  }
}
);

</script>

<style lang="scss" scoped>
  .box{
    .border_box{
      position: fixed;
      right: 20px;
      top: 15px;
      z-index: 9999;
      cursor: pointer;
      .bor_right{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color:#F1F2F3;
        font-size: 16px;
        
.demo {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
       
      }
      .bor_right:hover{
        background-color:#E0E0E3;
      }
    }

  }

</style>



<!-- <template>
  <div class="box">
    <el-switch v-model="dark" active-text="黑夜模式" />
  </div>
  
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
  const dark = ref<any>(localStorage.getItem("APP_DARK") || false);
watch(
() => dark.value,
(value) => {
  if (value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("APP_DARK", value);
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("APP_DARK");
  }
}
);
</script>

<style>

.box{
  position: relative;
  z-index: 99999;
}
</style> -->