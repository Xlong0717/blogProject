<template>
  <div v-viewer>
    <el-card  class="box-card">
      <loadingVue :loading="loading" ></loadingVue>
      <v-md-preview v-highlight  left-toolbar="undo redo | customToolbar"  :default-fullscreen="true" :default-show-toc="true"   :text="str"  ></v-md-preview>
    </el-card>

  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import {articleDetail} from '@/api/home/index'
import { useRoute,useRouter } from 'vue-router';
import loadingVue from '@/components/loading.vue';
const route = useRoute () ; 
let str  = ref('');
let loading = ref(true);
onMounted(()=>{
  console.log(route.query.id,'route.query.id111111111')
  articleDetail({id:route.query.id}).then((res)=>{
        console.log(res,'res')
            str.value = res.data.container;
            loading.value = false ;
  })
})

</script>

<style lang="scss" scoped></style>
