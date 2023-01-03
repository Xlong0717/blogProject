<template>
  <div class="app">
    <loadingVue :loading="loading" ></loadingVue>
    <transition-group v-if="!loading">
      <el-card class="box-card" v-for="(item,index) in listDetail " :key="index">
        <div class="card_item_box" >
          <!-- 头部 -->
          <div class="card_head">{{ item.title }}</div>
          <!-- 中间 -->
          <div class="card_title">
            <span>
              <i class="iconfont icon-rili1" style="margin-right: 3px"></i
              >创建时间:{{item.start_time }}</span
            >
            <el-divider direction="vertical" style="margin-top: 4px" />
            <span>
              <i
                class="iconfont icon-jiaofuriqi-copy"
                style="margin-right: 3px"
              ></i
              >修改时间:{{ item.end_time }}</span
            >
            <el-divider direction="vertical" style="margin-top: 4px" />
            <span>
              <i class="iconfont icon-wenjianjia" style="margin-right: 3px"></i
              >分类:{{ item.type_title }}</span
            >
          </div>
          <div>
            <div class="cart_title">
            <div class="left_diveder"></div>
            <div class="title_text">
              <p>{{ item.msg }}</p>
            </div>
          </div>
          <div class="follter_btn" @click="router.push(`/Detail?id=${item.id}`)">
            <div class="btn curros text-none">
              <div>
                阅读全文<i class="iconfont icon-jiantou_yemian_xiangyou_o"></i>
              </div>
            </div>
          </div>
          </div>
         
        </div>
      </el-card>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { getListArticle } from '@/api/home/index';
import {getNewDay} from '@/utils/date/index'
import {useRoute,useRouter} from 'vue-router'
import loadingVue from '@/components/loading.vue';

const route = useRoute() ;
const router = useRouter();

let loading = ref(true);

// 定义首页list 接口数据

interface Ilist {
  id: number;
  title: string;
  detail: string;
  start_time: string;
  end_time: string;
  msg:string ;
  type:number;
  type_title:number
}

// let listDetail: Array<Ilist> = [
//   // { id: 1, title: '', detail: '', start_time: '', end_time: '' },
// ];

let  listDetail = ref([
  {id: 0,
  title: '',
  detail: '',
  start_time: '',
  end_time:'',
  msg:'',
  type:1,
  type_title:''
}
]) ; 

// 定义查询列表方法
const getList = () => {
  getListArticle({}).then((res) => {
           if(res.code == 200 ){
            listDetail.value  =  res.data ; 
            listDetail.value.forEach((item:Ilist|any)=>{
                item.end_time = getNewDay(item.end_time) ; 
                item.start_time =  getNewDay(item.start_time)
                loading.value = false 
                
            })
          
           }
  });

};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
@media (min-width: 500px) and (max-width: 700px){
  .box-card{
    // background-color: red;
    height: 320px;
  }
}

@media (min-width: 300px) and (max-width: 400px){
  .box-card{
    height: 469px;
  }
}
.app {
  width: 100%;
  height: 100%;
  .box-card {
    // height: 280px;
    margin-bottom: 20px;
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
      .cart_title {
        display: flex;
        .left_diveder {
          width: 3px;
          height: 27px;
          background-color: #dddddd;
        }
        .title_text {
          color: #666666;
          margin-left: 15px;
          height: 40px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
      }
      .follter_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        .btn:hover {
          color: #ffff;
          background: #222222;
        }
        .btn {
          color: #555;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 110px;
          height: 32px;
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
