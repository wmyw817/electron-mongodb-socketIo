<template>
<div class="resp">
  <div class="text">呼吸</div>
  <div class="text">x1</div>
  <div></div>
  <div class="icon">lung</div>
  <div class="value">{{data.RESP}}</div>
  <div></div>
</div>
</template>

<script>
import VitalSign from '@/models/vitalSign'
export default {
  name: 'RESP',
  props: {
    data: {
      required: true,
      type: VitalSign
    }
  },
  data () {
    return {
      value: '25'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.resp {
  padding: 10px;
  font-size: 22px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: 30px 90px;
  color: $yellow;
  .value {
    font-size: 90px;
    line-height: 90px;
  }
}
</style>
