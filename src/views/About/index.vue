<template>
  <el-card class="box-card" shadow="always">
    <h1 class="about-title">关于我</h1>
    <v-md-preview v-highlight  left-toolbar="undo redo | customToolbar"  :default-fullscreen="true" :default-show-toc="true"   :text="str"  ></v-md-preview>
  </el-card>
  
</template>


<script setup lang="ts">
import {ref} from 'vue';

let str = `
**<blockquote class="blockquote-center">一蓑烟雨任平生</blockquote>**
<br/>

## 个人信息

- 姓名：夏龙
- 城市：武汉
- 职业：前端开发工程师

## 联系方式

- Email：871956494@qq.com
- GitHub：[https://github.com/Xlong0717](https://github.com/Xlong0717)

## 博客搭建

- 托管：腾讯云
- 框架:Vue3 + TS + element ui plus 后端:nodejs express mysql 

**欢迎互加友链**
`






</script>