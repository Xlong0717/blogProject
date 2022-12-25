<template>
  <div  id="app">
    <router-view></router-view>
  </div>






</template>


<script setup lang="ts">
import home from '@/views/Home/index.vue'
import { onMounted } from 'vue';


onMounted(()=>{
     setTimeout(() => {
      window.L2Dwidget.init({
          pluginRootPath: 'live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: 'live2d-widget-model-haru_1/assets/',
          tagMode: false,
          debug: false,
          model: { jsonPath: '../live2dw/live2d-widget-model-haru_1/assets/haru01.model.json' },
          display: { position: 'right', width: 100, height: 300 },
          mobile: { show: true },
          log: false
          })
    }, 1000)
})


</script>



<style scoped>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#app::before {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  background: #222;
}

a {
  text-decoration: none;
  color: #333333;
}
</style>
