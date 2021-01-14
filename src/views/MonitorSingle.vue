<template>
  <div class="vital-sign">
    <TopStatus></TopStatus>
    <LeftWave></LeftWave>
    <RightData :data="rightData"></RightData>
    <BottomSetting></BottomSetting>
  </div>
</template>

<script>
import TopStatus from '@/components/VitalSign/TopStatus'
import LeftWave from '@/components/VitalSign/LeftWave'
import RightData from '@/components/VitalSign/RightData'
import BottomSetting from '@/components/VitalSign/BottomSetting'
import VitalSign from '@/models/vitalSign'

import Socket from '@/utils/socket'
export default {
  name: 'MonitorSingle',
  components: {
    TopStatus,
    LeftWave,
    RightData,
    BottomSetting
  },
  data () {
    return {
      io: null,
      rightData: new VitalSign()

    }
  },
  created () {
    Socket.create(1)
  },
  mounted () {
    Socket.on('connect', function () {
      console.log('connect')
    })
    Socket.on('disconnect', function () {
      console.log('disconnect')
    })
    Socket.on('push_event', this.onPushEvent)
  },
  beforeDestroy () {
    Socket.destroy()
  },
  methods: {
    onPushEvent (data) {
      this.rightData.update(data)
      // console.log("push event", data);
    }

  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.vital-sign {
  height: 100%;
  display: grid;
  grid-template-rows: 40px auto 40px;
  grid-template-columns: 1080px 1fr;
  background: $background;
}
</style>
