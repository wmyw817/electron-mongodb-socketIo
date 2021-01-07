<template>
<div class="spo2">
  <div class="text">血氧</div>
  <div class="bar"></div>
  <div class="data">
    <span>99</span>
    <span class="unit">%</span>
  </div>
  <div>
    脉率<br>
    {{pulseRate}}
  </div>
</div>
</template>

<script>
export default {
  name: "SpO2",
  data() {
    return {
      spo2: '99',
      pulseRate: 80
    }
  }
}
</script>

<style lang="scss" scoped>
.spo2 {
  display: grid;
}
</style>
