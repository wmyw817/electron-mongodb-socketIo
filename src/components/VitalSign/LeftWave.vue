<template>
<div class="left-wave">
  <ECG></ECG>
  <PLETH></PLETH>
  <RESP></RESP>
</div>
</template>

<script>
import ECG from "./leftWave/ECG";
import PLETH from "./leftWave/PLETH";
import RESP from "./leftWave/RESP";
export default {
  name: "LeftWave",
  components:{
    ECG,
    PLETH,
    RESP,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.left-wave {
  border-right: 1px solid $border-color;
  display: grid;
  grid-template-rows: 450px 1fr 1fr;
  &>* {
    align-content: center;
  }
  &>*:not(:last-child) {
    border-bottom: 1px dotted $border-color;
  }
}
</style>
