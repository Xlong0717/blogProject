<template>
  <div id="app">
    <div id="mask" ref="mask" @click="imgs">
     
    </div>
    <!-- <img v-if="!flags"
        src="http://rnp6t59x9.hn-bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20221230172720.jpg"
        class="mask_img"
        @click="dialogs"
      /> -->
      <!-- <div class="mask_img"></div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
let mask = ref('');
const dialogs = (()=>{
  console.log(111)
})

let flags = ref<boolean>(false);

const imgs =(()=>{
  mask.value.style.height = ''
  flags.value = true;
})
onMounted(() => {
  mask.value.style.height =window.document.getElementById('app').clientHeight + 'px';
  console.log(mask.value, 'value');
});
</script>

<style lang="scss" scoped>
.app{
  width: 100%;
  #mask {
  width: 100%;
  opacity: 0.6;
  background-color: black;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 998;

}
@media (min-width: 0px) and (max-width: 800px){
  .mask_img {
  width: 100%;
  height: 200px;
  z-index: 999;
  position: fixed;
  right: 36%;
  top: 30%;
  background-color: red;
}
}
.mask_img {
  width: 316px;
  height: 200px;
  z-index: 999;
  position: fixed;
  right: 36%;
  top: 30%;
  background-color: red;
}
}

</style>
