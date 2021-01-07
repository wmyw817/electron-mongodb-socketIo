<template>
<div class="temp">
  <div class="text">体温</div>
  <div class="sign">sign</div>
  <div class="unit">℃</div>
  <div class="data">{{temp1}}</div>
  <div></div>
  <div class="data">{{temp2}}</div>
  <div class="info">TD: -.-</div>
</div>
</template>

<script>
export default {
name: "TEMP",
  data() {
  return {
    temp1: 32.2,
    temp2: '--.-'
  }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.temp {
  display: grid;
  grid-template-columns: 3fr 2fr 3fr;
  grid-template-rows: 50px 50px 50px;
  color: $white;
  justify-content: space-between;
  font-size: 22px;
  .text{

  }
  .sign {
    color: $red;
  }
  .unit {
    text-align: right;
  }
  .data{
    line-height: 50px;
    font-size: 60px;
    text-align: center;
  }
  .info {
    grid-column: 1/4;
    text-align: center;
  }
}
</style>
