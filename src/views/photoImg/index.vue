<template>
  <div class="app">
    <el-card class="box-card">
      <div class="header_title">相册</div>
      <loadingVue :loading="loading"></loadingVue>
      <div class="header_box" v-if="!loading">
        <div class="dates">
          <span>
            <i class="iconfont icon-rili1" style="margin-right: 3px"></i
            >创建时间:{{ getNewDay(timeData.start_time) }}
          </span>
          <el-divider direction="vertical" />
          <span>
            <i
              class="iconfont icon-jiaofuriqi-copy"
              style="margin-right: 3px"
            ></i
            >修改时间:{{ getNewDay(timeData.end_time) }}
          </span>
          <el-divider direction="vertical" />
          <span>
            <i class="iconfont icon-yanjing-copy" style="margin-right: 3px"></i
            >浏览:{{ timeData.num_counter }}
          </span>
        </div>
      </div>
      <div class="btn_box" v-if="!loading">
        <div class="left_btn"><div>相册</div></div>
      </div>
      <div v-if="!loading">
        <div class="img_box" v-for="(item, index) in imgArr" :key="index">
          <div class="imgtitle_box">
            <div class="title_year">
              <h1>{{ item.time.substring(0, 4) }}年</h1>
            </div>
            <div class="title_month">{{ item.time.substring(4, 5) }}月</div>
          </div>
          <div class="img_list" v-viewer>
            <div class="children" v-for="childern in item.data" :key="childern">
              <img :src="childern" />
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { imgCounter, imgList } from '@/api/home/index';
import { getNewDay } from '@/utils/date/index';
import loadingVue from '@/components/loading.vue';

let loading = ref(true);
let timeData = ref({
  num_counter: '',
  end_time: '',
  start_time: '',
});

let imgArr = ref([{ year: '', month: '', img_url: '', time: '', data: [] }]);

const imgDetail = async () => {
  let res1 = await imgData();
  console.log(res1, 'res');
  timeData.value = res1.data;

  imgList({}).then((res) => {
    if (res.code == 200) {
      loading.value = false;
      imgArr.value = res.data;
      let resImg = imgArr.value.reduce(
        (acc: any, cur: any, indexs, arrs: any) => {
          let obj = {
            time: `${cur.year}${cur.month}`,
            url: cur.img_url,
            data: [cur.img_url],
          };
          acc.push(obj);
          acc.forEach((item: any, index: number, arr: any) => {
            if (arr[0].time === item.time) {
              if (index !== 0) {
                arr[0].data.push(arr[index].url);
                acc.splice(index, 1);
              }
            }
          });
          return acc;
        },
        []
      );
        // 排序算法
      for (let i = 0; i < resImg.length; i++) {
        for (let y = i; y > 0; y--) {
          if (resImg[y].time > resImg[y - 1].time) {
            [resImg[y - 1], resImg[y]] = [resImg[y], resImg[y - 1]];
          }
        }
      }
      imgArr.value = resImg;
    }
  });
};

const imgData = () => {
  return imgCounter({}).then((res) => {
    return res;
  });
};

onMounted(() => {
  imgDetail();
});
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  .box-card {
    .header_title {
      text-align: center;
      word-break: break-word;
      font-weight: 400;
      font-size: 22px;
      color: #555555;
    }
    .header_box {
      width: 100%;
      display: flex;
      justify-content: center;
      .dates {
        color: #999;
        font-size: 12px;
        margin-top: 15px;
        margin-bottom: 60px;
        font-size: 12px;
      }
    }
    .btn_box {
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      .left_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 26px;
        width: 50px;
        height: 26px;
        font-size: 16px;
        color: #08c;
        border: 1px solid #e5e5e5;
        background-color: #fff;
        position: relative;
        top: 1px;
        border-bottom: none;
        // border-bottom: 5px solid #fff;
      }
    }
    .img_box {
      width: 100%;
      margin-top: 50px;
      .imgtitle_box {
        display: flex;
        color: #707070;
        font-weight: bold;
        .title_year {
          font-size: 16px;
        }
        .title_month {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      .img_list {
        margin-top: 30px;
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
        .children {
          margin-left: 20px;
          img {
            width: 140px;
            height: 140px;
            box-sizing: border-box;
            margin: auto;
            padding: 3px;
            border: 1px solid #ddd;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
