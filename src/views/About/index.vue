<template>
  <div class="app">
    <loadingVue :loading="loading"></loadingVue>
    <el-card class="box-card" shadow="always" v-if="!loading">
      <h1 class="about-title">关于我</h1>
      <v-md-preview :text="str"></v-md-preview>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import loadingVue from '@/components/loading.vue';
import { personDetail } from '@/api/home/index';
let loading = ref(true);
let str = ref('');

// 查询个人信息
const selDetail = () => {
  personDetail({}).then((res) => {
    if (res.code == 200) {
      str.value = res.data.user_text;
      loading.value = false;
    }
  });
};

onMounted(() => {
  selDetail();
});
</script>

<style scoped lang="scss">
.app {
  width: 100% !important;
  height: 100% !important;
  .box-card {
    margin-bottom: 20px;
  }
}
</style>
