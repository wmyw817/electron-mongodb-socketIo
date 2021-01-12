<template>
  <div class="list">
    <Monitor v-for="i in 10" :key="i" :user="i+''"></Monitor>
  </div>
</template>

<script>
import Monitor from "./Monitor/Monitor";
export default {
  name: "MonitorList",
  components:{
    Monitor
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 180px;
  border-left: 1px dotted $border-color;
  border-top: 1px dotted $border-color;
  background: $background;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  & > * {
    border-right: 1px dotted $border-color;
    border-bottom: 1px dotted $border-color;
  }
}
</style>
