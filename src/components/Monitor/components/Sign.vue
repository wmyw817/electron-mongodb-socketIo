<template>
  <div class="sign">
    <div class="item">
      <div class="title">心率</div>
      <div class="value">{{ sign.HR }}</div>
    </div>
    <div class="item">
      <div class="title">血氧</div>
      <div class="value">{{ sign.SPO2 }}</div>
    </div>
    <div class="item">
      <div class="title">呼吸</div>
      <div class="value">{{ sign.RESP }}</div>
    </div>
    <div class="item">
      <div class="title">血压</div>
      <div class="value bp">{{ sign.SBP }}/{{ sign.DBP }}</div>
    </div>
  </div>
</template>

<script>
import VitalSign from '@/models/vitalSign'
import { reactive } from '@vue/composition-api'
export default {
  name: 'Sign',
  props: {
    socket: {
      required: true,
      type: Object
    }
  },
  setup (props) {
    const sign = reactive(new VitalSign())
    props.socket.on('push_event', (data) => {
      sign.update(data)
    })
    return {
      sign
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.sign {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 4px;
  .item {
    display: grid;
    grid-template-columns: 32px 140px;
    white-space: nowrap;
    &:nth-child(1) {
      color: $green;
    }
    &:nth-child(2) {
      color: $blue;
    }
    &:nth-child(3) {
      color: $yellow;
    }
    &:nth-child(4) {
      color: $white;
    }
    .value {
      font-size: 5em;
      line-height: 86px;
    }
    .bp {
      font-size: 2em;
    }
  }
}
</style>
