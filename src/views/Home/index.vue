<template>
  <div class="app">
    <transition-group>
      <el-card class="box-card">
        <div class="card_item_box">
          <!-- 头部 -->
          <div class="card_head">Vue双向数据绑定原理</div>
          <!-- 中间 -->
          <div class="card_title">
            <span>
              <i class="iconfont icon-rili1" style="margin-right: 3px"></i
              >创建时间:2022-01-18 18:38:34</span
            >
            <el-divider direction="vertical" style="margin-top: 4px" />
            <span>
              <i
                class="iconfont icon-jiaofuriqi-copy"
                style="margin-right: 3px"
              ></i
              >修改时间:2022-01-18 18:38:34</span
            >
            <el-divider direction="vertical" style="margin-top: 4px" />
            <span>
              <i class="iconfont icon-wenjianjia" style="margin-right: 3px"></i
              >分类:Vue原理解析</span
            >
          </div>
          <div class="cart_title"><div class="left_diveder"></div><div class="title_text"><p>基于autojs实现的弹琴自助脚本(可自定义)</p></div> </div>
          <div class="follter_btn">
            <div class="btn curros text-none"><div>阅读全文<i class="iconfont icon-jiantou_yemian_xiangyou_o"></i></div></div>
          </div>
        </div>
      </el-card>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {getListArticle} from '@/api/home/index'

onMounted(() => {
  getListArticle({}).then((res)=>{
    console.log(res,'resss')
  })
  // axios.post('http://127.0.0.1:3007/api/articleList', {}).then((res) => {
  //   console.log(res, 'res');
  // });
});
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  .box-card {
    height: 280px;
    .card_item_box {
      padding: 10px 40px 40px 40px;
      .card_head {
        display: flex;
        justify-content: center;
        // margin-top: 10px;
        font-size: 22px;
        color: #606266;
        font-weight: 500;
      }
      .card_title {
        display: flex;
        justify-content: center;
        color: #999;
        font-size: 12px;
        margin-top: 15px;
        margin-bottom: 60px;
      }
      .cart_title{
        display: flex;
        .left_diveder{
          width: 3px;
          height: 27px;
          background-color: #DDDDDD;
        }
        .title_text{
          color: #666666;
          margin-left: 15px;
        }
      }
      .follter_btn{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        .btn:hover{
          color: #ffff;
     background:#222222;
        }
        .btn{
          color: #555;
          display: flex;
          justify-content: center;
           align-items: center;
          width: 110px;
          height:32px;
          border: 2px solid #555;
          text-decoration: none;
          transition: background 0.5s;
     -webkit-transition: background 0.5s;
        }
      }
    }
  }
}
</style>
