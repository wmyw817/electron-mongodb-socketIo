<template>
<div class="nibp">
  <div class="text">血压</div>
  <div class="unit">mmHg</div>
  <div class="sbp">{{sbp}}</div>
  <div class="map">{{map}}</div>
  <div class="dbp">{{dbp}}</div>
  <div class="info">等待测压</div>
</div>
</template>

<script>
export default {
name: "NIBP",
  data() {
  return {
    sbp: 120,
    dbp: 80,
    map:90,

  }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.nibp {
  display: grid;
  grid-template-columns: 3fr 2fr 3fr;
  grid-template-rows: 50px 160px 30px;
  color: $white;
  justify-content: space-between;
  font-size: 22px;
  .text{
    grid-column: 1/3;

  }
  .unit {
    text-align: right;
  }
  .sbp,
  .dbp{
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
