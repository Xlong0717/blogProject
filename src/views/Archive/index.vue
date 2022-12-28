<template>
  <div class="app">
    <el-card class="box-card">
    
      <div class="time-line">
        <div class="time-line-item">
        <!-- <div class="time-line-item-time">2014-07-02</div> -->
        <div class="time-line-item-wrapper1">
        <div class="header_title">目前共计 9 篇日志。 继续努力。</div>  
        </div>
    </div>
    <div class="time-line-item">
        <!-- <div class="time-line-item-time">2014-07-02</div> -->
        <div class="time-line-item-wrapper">
            aaaaaaaaaaaaaaaaaaaaaaa
        </div>
    </div>
    <div class="time-line-item">
        <!-- <div class="time-line-item-time">2014-07-02</div> -->
        <div class="time-line-item-wrapper">
            bbbbbbbbbbbbbbbbbbbbbbb

        </div>
    </div>
    <div class="time-line-item">
        <!-- <div class="time-line-item-time">2014-07-02</div> -->
        <div class="time-line-item-wrapper">
           ccccccccccccccccccccccccc
        </div>
    </div>

</div>

    </el-card>

  </div>
</template>


<script setup lang="ts">
import { onMounted,ref } from 'vue';
import {getListArticle} from '@/api/home/index'


onMounted(()=>{
  getListArticle({}).then((res)=>{
    console.log(res,'res')
  })

})


</script>



<style lang="scss" scoped>
.app{
  width: 100%;
  height: 100%;
  .header_title{
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 14px;
    color: #555;
  }

  .time-line {
            padding: 30px;
        }

        .time-line .time-line-item {
            display: flex;
            margin-left: 40px;
        }

        .time-line .time-line-item .time-line-item-time {
            padding-right: 8px;
            font-size: 14px;
        }

        .time-line .time-line-item .time-line-item-wrapper {
            position: relative;
            padding-left: 20px;
            // line-height: 100%;
            line-height: 7px;
            padding-bottom: 8px;
            flex: 1;
            height: 100px;
        }

        .time-line .time-line-item .time-line-item-wrapper1 {
            position: relative;
            padding-left: 20px;
            line-height: 100%;
            padding-bottom: 8px;
            flex: 1;
            height: 60px;
        }

        .time-line .time-line-item .time-line-item-wrapper::before {
            content: '';
            position: absolute;
            left: 3px;
            top: 0;
            width: 8px;
            height: 8px;
            background-color: #AAAAAA;
            border-radius: 50%;
            z-index: 1;
        }



        .time-line .time-line-item .time-line-item-wrapper1::before {
            content: '';
            position: absolute;
            left: 1px;
            top: 0;
            width: 12px;
            height: 12px;
            background-color: #AAAAAA;
            border-radius: 50%;
            z-index: 1;
        }

        .time-line .time-line-item .time-line-item-wrapper::after {
            content: '';
            position: absolute;
            left: 5px;
            top: 0;
            width: 2px;
            height: 100%;
            background-color: #F5F5F5;
            width: 4px;
        }

        .time-line .time-line-item .time-line-item-wrapper1::after {
            content: '';
            position: absolute;
            left: 5px;
            top: 0;
            width: 2px;
            height: 100%;
            background-color: #F5F5F5;
            width: 4px;
        }

        .time-line .time-line-item:last-child .time-line-item-wrapper::after {
            display: none;
        }


        .time-line .time-line-item:last-child .time-line-item-wrapper1::after {
            display: none;
        }

  
}


</style>