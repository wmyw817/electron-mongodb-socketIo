<template>
  <div class="nibp">
    <div class="text">血压</div>
    <div class="unit">mmHg</div>
    <div class="sbp">{{ data.SBP }}</div>
    <div class="map">{{ data.MAP }}</div>
    <div class="dbp">{{ data.DBP }}</div>
    <div class="info">等待测压</div>
  </div>
</template>

<script>
import VitalSign from '@/models/vitalSign'
export default {
  name: 'NIBP',
  props: {
    data: {
      required: true,
      type: VitalSign
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.nibp {
  display: grid;
  grid-template-columns: 3fr 2fr 3fr;
  grid-template-rows: 30px minmax(100px, 120px) 30px;
  color: $white;
  justify-content: space-between;
  font-size: 22px;
  padding: 10px;
  .text {
    grid-column: 1/3;
  }
  .unit {
    text-align: right;
  }
  .sbp,
  .dbp {
    line-height: 80px;
    font-size: 70px;
    text-align: center;
  }
  .map {
    line-height: 120px;
    font-size: 23px;
    text-align: center;
    height: 80px;
  }
}
</style>
