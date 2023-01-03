<template>
  <div v-viewer>
    <el-card  class="box-card">
      <loadingVue :loading="loading" ></loadingVue>
      <v-md-preview v-highlight  left-toolbar="undo redo | customToolbar"  :default-fullscreen="true" :default-show-toc="true"   :text="str"  ></v-md-preview>
    </el-card>

  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted,watch} from 'vue'
import {articleDetail} from '@/api/home/index'
import { useRoute,useRouter } from 'vue-router';
import loadingVue from '@/components/loading.vue';
import {useDialogs} from '@/store/dialog'
import { storeToRefs } from 'pinia'

const store = useDialogs()
const {dialogFlag,routeId} = storeToRefs(store);
const route = useRoute () ; 
let str  = ref('');
let loading = ref(true);

let detailId= ref<number>(0);

const detailText =((id:number | null  )=>{
  articleDetail({id}).then((res)=>{
            str.value = res.data.container;
            loading.value = false ;
  })
})


onMounted(()=>{
  detailId.value = route.query.id as any;
  detailText(route.query.id as null )
})



watch(routeId,(newval,oldval)=>{
  detailText(newval);
})

</script>

<style lang="scss" scoped></style>
