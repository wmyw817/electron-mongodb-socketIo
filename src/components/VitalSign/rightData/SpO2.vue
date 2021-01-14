<template>
<div class="spo2">
  <div class="text">血氧</div>
  <div class="bar"></div>
  <div class="data">
    <span>{{data.SPO2}}</span>
    <span class="unit">%</span>
  </div>
  <div class="pulse">
    脉率<br>
    <span class="value">{{data.PULSE}}</span>
  </div>
</div>
</template>

<script>
import VitalSign from '@/models/vitalSign'
export default {
  name: 'SpO2',
  props: {
    data: {
      required: true,
      type: VitalSign
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.spo2 {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: 30px minmax(100px, 130px);
  color: $red;
  font-size: 22px;
  justify-content: space-between;
  padding: 10px;
  .text {
    grid-column: 1/4;
  }
  .data {
    line-height: 120px;
    font-size: 120px;
    .unit {
      font-size: 45px;
    }
  }
  .pulse {
    text-align: right;
    color: $green;
    .value {
      font-size: 50px;
    }
  }
}
</style>
