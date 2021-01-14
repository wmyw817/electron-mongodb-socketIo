<template>
<div class="right-data">
  <ECG :data="data"></ECG>
  <NIBP :data="data"></NIBP>
  <TEMP :data="data"></TEMP>
  <SpO2 :data="data"></SpO2>
  <RESP :data="data"></RESP>
</div>
</template>

<script>
import ECG from './rightData/ECG'
import NIBP from './rightData/NIBP'
import TEMP from './rightData/TEMP'
import SpO2 from './rightData/SpO2'
import RESP from './rightData/RESP'
import VitalSign from '@/models/vitalSign'
export default {
  name: 'RightData',
  props: {
    data: {
      required: true,
      type: VitalSign
    }
  },
  components: {
    ECG,
    NIBP,
    TEMP,
    SpO2,
    RESP
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.right-data {
  display: grid;
  grid-template-rows: repeat(5, auto);
  &>* {
    align-content: center;
  }
  &>*:not(:last-child) {
    border-bottom: 1px dotted $border-color;
  }
}
</style>
