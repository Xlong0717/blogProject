<template>
  <div class="app">
    <transition-group>
      <el-card class="box-card">
        <div class="card_head">
            Vue双向数据绑定原理
        </div>
        <div class="card_title">
          <span> <i class="iconfont icon-rili1" style="margin-right:3px"></i>创建时间:2022-01-18 18:38:34</span>
          <el-divider direction="vertical"  style="margin-top:4px;"/>
          <span> <i class="iconfont icon-jiaofuriqi-copy" style="margin-right:3px"></i>修改时间:2022-01-18 18:38:34</span>
          <el-divider direction="vertical"  style="margin-top:4px;"/>
          <span> <i class="iconfont icon-wenjianjia" style="margin-right:3px"></i>分类:Vue原理解析</span>
        </div>
        

      </el-card>
    </transition-group>
  </div>
</template>


<script setup lang="ts">
import axios from 'axios';
import { onMounted,ref } from 'vue';


onMounted(()=>{
  axios.post('http://127.0.0.1:3007/api/articleList',{}).then((res)=>{
    console.log(res,'res')
  })
})

</script>



<style lang="scss"  scoped>
  .app{
    width: 100%;
    height: 100%;
    .box-card{
      height: 220px;
    }
    .card_head{
      display: flex;
      justify-content: center;
      // margin-top: 10px;
      font-size: 22px;
      color: #606266;
      font-weight: 500;
    }
    .card_title{
      display: flex;
      justify-content: center;
      color: #999;
      font-size: 12px;
    }
  }
</style>