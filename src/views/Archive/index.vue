<template>
  <div class="app">
    <el-card class="box-card">
      <loadingVue :loading="loading"></loadingVue>
      <div class="box-card"  v-if="!loading">
        <div class="archive-desc">嗯..! 目前共计 {{  count }} 篇日志。 继续努力。</div>
        <el-divider></el-divider>
        <div
          v-for="(item, index) in yearArchive"
          :key="index"
          style="margin-top: 20px"
        >
          <h3>{{ item.year }}</h3>
          <ul class="th-wrap">
            <li class="th-item" v-for="(children,len) in item.data"  :key="len">
              <a @click="pathDetail(children)">
                <span class="category-list-count">
                  <!-- {{ item.createDate }} -->
                </span>
               <span style="font-size:14px;color:#bbb">{{ getNewDay(children.end_time) }}</span>  {{ children.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- <div class="time-line" >
        <div class="time-line-item">
        <div class="time-line-item-wrapper1">
        <div class="header_title">目前共计 9 篇日志。 继续努力。</div>  
        </div>
    </div>
    <div class="time-line-item"   v-for="(item,index) in  yearArchive" :key="index">
        <div class="time-line-item-wrapper">
          {{ item.year }}
          <div class="children" v-for="(children,len) in  item.data" :key="len">
            {{ children.title }}</div>
        </div>
        

    </div>



</div> -->
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getListArticle } from '@/api/home/index';
import { useRoute,useRouter } from 'vue-router';
import {getNewDay} from '@/utils/date'
import loadingVue from '@/components/loading.vue';

let loading = ref(true);
  const route = useRoute();
  const router = useRouter()

  let count = ref(0) ;

let yearArchive = ref([{year:'',data:[{end_time:'',title:''}]}]);

const yearSet = () => {
  getListArticle({}).then((res) => {
    if (res.code == 200) {
      loading.value =false ;
      let resArr: any = [];
      let yearArr: any = [];
      count.value = res.data.length;
      // 循环处理拿出年份
      res.data.forEach((item: any, index: number) => {
        resArr.push(item.year);
      });
      // 将重复年份去重
      yearArr = [...new Set(resArr)];
      // 从大到小排序之后在反转
      yearArr.sort();
      yearArr.reverse();
      let resa = yearArr.reduce((acc: any, cur: any, curIndex: number) => {
        // 拿到年份 和children数组
        let obj = {
          year: yearArr[curIndex],
          data: [],
        };
        acc.push(obj);
        res.data.forEach((item: any, index: number) => {
          // 判断返回的年份 是否 和我目前数据的年份是否相同 一样的话就丢进去
          if (item.year === acc[curIndex].year) {
            acc[curIndex].data.push(item);
          }
        });
        return acc;
      }, []);
      yearArchive.value = resa;
      console.log(resa, 'resaaa');
    }
  });
};

// children跳转
const pathDetail = ((item:any)=>{
    console.log(item.id,'any')
  router.push({path:'/Detail',query:{id:item.id}})
})

onMounted(() => {
  yearSet();
});
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;

  .archive-desc {
    margin-bottom: 20px;
    padding-top: 20px;
  }
  .th-wrap {
    padding: 0 40px;
  }
  .th-wrap li {
    list-style: circle;
    cursor: pointer;
    opacity: 0.75;
    margin-top: 20px;
    a {
      color: #555;
      text-decoration: none;
    }
  }
  .th-item:hover {
    opacity: 1;
  }
  .header_title {
    font-family: 'Lato', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    font-size: 14px;
    color: #555;
  }
}
</style>
