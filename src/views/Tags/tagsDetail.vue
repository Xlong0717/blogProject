<template>
  <div class="app">
    <loadingVue :loading="loading"></loadingVue>
    <el-card class="box-card" shadow="always" v-if="!loading" >
      <div class="title"><h2>{{ text }}</h2></div>
      <div class="header_msg"><div>目前共计{{ typeList.length }} 个标签</div></div>
      <div class="ul_list">
        <ul v-for="(item,index) of typeList" :key="index">
         <li  @click="pathDetail(item)"><div class="text_box"><div class="times">{{ getNewDay(item.end_time) }}</div><div class="box_title">{{ item.title }}</div></div></li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script  setup lang="ts">
import {ref,onMounted} from 'vue' ;
import loadingVue from '@/components/loading.vue';
import { useRoute,useRouter } from 'vue-router';
import {artList} from  '@/api/home/index'
import {getNewDay} from '@/utils/date/index'
const route = useRoute();
const router = useRouter()

interface ItypeList {
  detailId:number,
  end_time:string,
  id:number,
  title:string
}

let loading = ref(true);

let text   = ref('')



let typeList =ref([
  {title:'',end_time:'',id:1,detailId:1}
]);

// 跳转到文章详情页

const pathDetail = ((item:ItypeList)=>{
  router.push({path:'/Detail',query:{id:item.id}})
})

onMounted(()=>{
  artList(route.query.type as any).then((res)=>{
        if(res.code == 200 ){
          typeList.value = res.data ; 
          text.value = typeList.value[0].title
          loading.value = false;
        }
  })
})

</script>



<style lang="scss" scoped>

.app {
  width: 100%;
  height: 100%;
  .box-card {
    .ul_list {
      margin-left: 30px;
      ul {
        li {
          list-style-type: circle;
          cursor: pointer;
          opacity: 0.75;
          .text_box{
            display: flex;
            .times{
              // opacity: 0.75;
              color: #bbb;
              margin-top: 4px;
            }
            .box_title{
              margin-left: 10px;
              margin-bottom: 10px;
              font-size: 18px;
            }
          }
        }
        li:hover {
          opacity: 1;
        }
      }
    }

    .title {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
    }
    .header_msg {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>