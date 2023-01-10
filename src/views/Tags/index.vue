<template>
  <div class="app">
    <loadingVue :loading="loading"></loadingVue>
    <el-card class="box-card" shadow="always" v-if="!loading">
      <div class="title"><h2>文章标签</h2></div>
      <div class="header_msg">
        <div>目前共计{{ ArchilveType.length }} 个标签</div>
      </div>
      <div class="ul_list">
        <ul v-for="(item, index) of ArchilveType" :key="index">
          <li @click="pathDetail(item)">{{ item.type_title }}</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { artilsTypes } from '@/api/home/index';
import loadingVue from '@/components/loading.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

interface Archilve {
  end_time: string;
  start_time: string;
  type: number;
  type_title: string;
}

let loading = ref(true);

let ArchilveType = ref([
  {
    end_time: '',
    start_time: '',
    type: 1,
    type_title: '',
  },
]);
const selArchiveType = () => {
  artilsTypes({}).then((res) => {
    if (res.code == 200) {
      ArchilveType.value = res.data;
      let resArr = res.data;

      for (let i = 0; i < resArr.length; i++) {
        for (let j = i + 1; j < resArr.length; j++) {
          if (resArr[i].type_title == resArr[j].type_title) {
            resArr.splice(j, 1);
          }
        }
      }

      loading.value = false;
    }
  });
};

// 跳转到分类详情

const pathDetail = (item: Archilve) => {
  router.push({ path: '/TagsDetail', query: { type: item.type } });
};
onMounted(() => {
  selArchiveType();
});
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
