<template>
<div class="ecg">
  <div class="top">心电 监护 x1</div>
  <div class="icon">
    心
  </div>
  <div class="heart-rate">{{heartRate}}</div>
  <div class="info">
    PACE: OFF<br>
    ST1 -.--<br>
    ST2 -.--<br>
    Pvcs: OFF<br>
  </div>
</div>
</template>

<script>
export default {
name: "ECG",
  data() {
  return {
    heartRate: '80'
  }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.ecg {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: auto auto 100px;
  color: $green;
  justify-content: space-between;
  font-size: 22px;
  .top {
    grid-column: span 3;
  }
  .icon {
    color: $red;
  }
  .heart-rate {
    font-size: 140px;
    text-align: right;
    line-height: 110px;
  }
  .info {
    line-height: 40px;
    font-weight: bold;
  }
}
</style>
