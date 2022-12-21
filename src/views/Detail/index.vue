<template>
  <div>
    <v-md-preview  :text="str"></v-md-preview>
  </div>
</template>

<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import {articleDetail} from '@/api/home/index'
import { useRoute,useRouter } from 'vue-router';
const route = useRoute () ; 
let str  = ref('');

onMounted(()=>{
  articleDetail({id:route.query.id}).then((res)=>{
            str.value = res.data.container;
  })
})

</script>

<style lang="scss" scoped></style>
