<template>
  <div  id="app">
    <router-view></router-view>
  </div>






</template>


<script setup lang="ts">
import home from '@/views/Home/index.vue'



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
