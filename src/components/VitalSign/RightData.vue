<template>
<div class="right-data">
  <ECG></ECG>
  <NIBP></NIBP>
  <TEMP></TEMP>
  <SpO2></SpO2>
  <RESP></RESP>
</div>
</template>

<script>
import ECG from './RightData/ECG'
import NIBP from './RightData/NIBP'
import TEMP from './RightData/TEMP'
import SpO2 from './RightData/SpO2'
import RESP from './RightData/RESP'
export default {
  name: "RightData",
  components:{
    ECG,
    NIBP,
    TEMP,
    SpO2,
    RESP,
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.right-data {

  display: grid;
  grid-template-rows: repeat(5, auto);

  &>*:not(:last-child) {
    border-bottom: 1px dotted $border-color;
  }
}
</style>
