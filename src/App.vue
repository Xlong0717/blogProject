<template>
  <div id="app">
    <music></music>
    <darkBlack />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// import home from '@/views/Home/index.vue'
import darkBlack from "./components/darkBlack.vue";
import music from "./components/music.vue";
import { useDark, useToggle } from "@vueuse/core";
import { onMounted, ref } from "vue";

// const isDark = useDark()
// const toggleDark = useToggle(isDark)
// let blackFlag = ref<boolean>(false);

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
