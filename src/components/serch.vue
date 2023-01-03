<template>
  <div class="dialogs" @click="dialogClose" v-if="dialogFlag">
    <div class="dialog_center" @click.stop>
      <div class="headers_box">
        <div class="left_icon">
          <strong
            ><i class="iconfont icon-seach-copy" style="font-size: 20px"></i
          ></strong>
        </div>
        <div class="center_serch">
          <input
            class="serch_input"
            placeholder="搜索....."
            v-model="serchVal"
            @input="serchList"
          />
        </div>
        <div @click="dialogClose" class="right_icon" title="关闭">
          <strong
            ><i class="iconfont icon-guanbi-copy" style="font-size: 20px"></i
          ></strong>
        </div>
      </div>
      <div class="center_icon" v-if="serchArr.length == 0">
        <div class="icon_foolter" v-if="iconFlag">
          <i class="iconfont icon-kulian-copy" style="font-size: 64px"></i>
        </div>
        <div class="icon_foolter" v-if="!iconFlag">
          <i class="iconfont icon-seach-copy" style="font-size: 64px"></i>
        </div>
      </div>
      <div class="dialog_conter" v-if="serchArr.length > 0">
        <!-- <ul v-for="(item,index) in serchArr" :key="index">
            <li>{{ item }}</li>
          </ul> -->
        <ul v-for="(item, index) in serchArr" :key="index">
          <li @click="pathDetail(item)">
            <a class="header_title"> {{ item.title }}</a>
            <div class="detail">{{ item.msg }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDialogs } from '@/store/dialog';
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { getListArticle } from '@/api/home';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useDialogs();
const { dialogFlag } = storeToRefs(store);


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


// 输入框绑定值
const serchVal = ref<string>('');

let serchArr = ref([]);

let iconFlag = ref<boolean>(false);

const serchList = () => {
  if (serchVal.value) {
    getListArticle({ like: serchVal.value }).then((res) => {
      if (res.code == 200) {
        serchArr.value = res.data;
        serchArr.value.length == 0
          ? (iconFlag.value = true)
          : (iconFlag.value = false);
        console.log(serchArr, 'serchArrserchArrserchArr');
      }
    });
  } else {
    serchArr.value = [];
    iconFlag.value = false;
  }
};

const pathDetail = (item: any) => {
  router.push(`/Detail?id=${item.id}`);
  serchArr.value = [];
  dialogClose();
  serchVal.value = '';
  store.SETROUTEID(item.id);
};

// 关闭遮罩层
const dialogClose = () => {
  store.SETFLAG(false);
  serchVal.value = '';
  serchArr.value = [];
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.dialogs {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 0px) and (max-width: 800px) {
    .dialog_center {
      width: 100%;
      height: 100%;
    }
  }

  @media (min-width: 800px) and (max-width: 9999999px) {
    .dialog_center {
      width: 700px;
      height: 80%;
      background-color: red;
    }
  }

  .dialog_center {
    // width: 700px;
    // height: 80%;
    background-color: #fff;
    position: relative;
    z-index: 10000;
    border-radius: 5px;
    .headers_box {
      width: 100%;
      background-color: #f5f5f5;
      height: 36px;
      padding: 5px 0px 5px 0px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      .left_icon {
        width: 40px;
        margin-left: 20px;
      }
      .right_icon {
        width: 40px;
        margin-left: 20px;
        cursor: pointer;
      }
      .center_serch {
        flex: 1;
        .serch_input {
          border: none;
          width: 100%;
          height: 34px;
          background-color: #f5f5f5;
          outline: none;
        }
      }
    }
  }
  .dialog_conter {
    position: relative;
    padding-left: 30px;
    overflow: auto;
    height: calc(100% - 51px);
    ul {
      li {
        margin-top: 20px;
        .header_title {
          font-size: 16px;
          font-weight: bold;
          color: #555555;
          border-bottom: 1px solid #555555;
          cursor: pointer;
        }
        .header_title:hover {
          color: #222;
          border-bottom-color: #222;
        }
        .detail {
          color: #555555;
          height: 40px;
          width: 100%;
          opacity: 0.6;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          cursor: pointer;
        }
        .detail:hover {
          opacity: 1;
        }
      }
    }
  }
  .center_icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon_foolter {
      margin-bottom: 100px;
    }
  }
}
</style>
