<template>
  <div class="vital-sign">
    <TopStatus></TopStatus>
    <LeftWave :listI="listI" :listII="listII" :startTime="startTime"></LeftWave>
    <RightData :data="rightData"></RightData>
    <BottomSetting></BottomSetting>
  </div>
</template>

<script>
import TopStatus from "./VitalSign/TopStatus";
import LeftWave from "./VitalSign/LeftWave";
import RightData from "./VitalSign/RightData";
import BottomSetting from "./VitalSign/BottomSetting";
import VitalSign from "@/models/vitalSign";
import { LinkedListMax } from "@/models/linkedList";
import PointECG from "@/models/PointECG";
import Socket from '@/utils/socket'
export default {
  name: "VitalSign",
  components: {
    TopStatus,
    LeftWave,
    RightData,
    BottomSetting,
  },
  data() {
    return {
      io: null,
      rightData: new VitalSign(),
      listI: new LinkedListMax(700),
      listII: new LinkedListMax(700),
      startTime: new Date().getTime(),
    };
  },
  created() {

  },
  mounted() {
    Socket.create(1)
    Socket.on("connect", function () {
      console.log("connect");
    });
    Socket.on("disconnect", function () {
      console.log("disconnect");
    });
    Socket.on("push_event", this.onPushEvent);
    Socket.on("push_oscillo_event", this.onGetWave);
    Socket.on("push_oscillo_event2", this.onGetWave2);
  },
  beforeDestroy() {
    Socket.destroy()
  },
  methods: {
    onPushEvent(data) {
      this.rightData.update(data);
      // console.log("push event", data);
    },
    onGetWave(data) {
      // console.log('push_oscillo_event', data)
      const point = new PointECG(data, this.startTime);
      this.listI.push(point);
    },
    onGetWave2(data) {
      // console.log('push_oscillo_event2', data)
      const point = new PointECG(data, this.startTime);
      this.listII.push(point);
    }
  },
};
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
