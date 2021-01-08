<template>
  <div class="temp">
    <div class="text">体温</div>
    <div class="sign">sign</div>
    <div class="unit">℃</div>
    <div class="data">{{ data.TEMP1 }}</div>
    <div></div>
    <div class="data">{{ data.TEMP2 }}</div>
    <div class="info">TD: -.-</div>
  </div>
</template>

<script>
import VitalSign from "@/models/vitalSign";
export default {
  name: "TEMP",
  props: {
    data: {
      required: true,
      type: VitalSign,
    },
  },
  data() {
    return {
      temp1: 32.2,
      temp2: "--.-",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.temp {
  display: grid;
  grid-template-columns: 3fr 2fr 3fr;
  grid-template-rows: 30px 50px 30px;
  color: $white;
  justify-content: space-between;
  font-size: 22px;
  padding: 10px;
  .text {
  }
  .sign {
    color: $red;
  }
  .unit {
    text-align: right;
  }
  .data {
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
