<template>
  <div class="vital-sign">
    <TopStatus></TopStatus>
    <LeftWave :listI="listI" :startTime="nowTime"></LeftWave>
    <RightData :data="rightData"></RightData>
    <BottomSetting></BottomSetting>
  </div>
</template>

<script>
import TopStatus from "./VitalSign/TopStatus";
import LeftWave from "./VitalSign/LeftWave";
import RightData from "./VitalSign/RightData";
import BottomSetting from "./VitalSign/BottomSetting";
import io from "socket.io-client";
import { URL } from "@/config/URL";
import VitalSign from "@/models/vitalSign";
import { LinkedListMax } from "@/models/linkedList";
import { equalsECG } from "@/utils";
import PointECG from "@/models/PointECG";
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
      listI: new LinkedListMax(500, equalsECG),
      nowTime: undefined,
    };
  },
  mounted() {
    this.initIo();
  },
  beforeDestroy() {
    if (this.io) {
      this.io.close();
      this.io = null;
    }
  },
  methods: {
    onPushEvent(data) {
      this.rightData.update(data);
      console.log("push event", data);
    },
    onGetWave(data) {
      if (this.listI.size() === 0) {
        this.nowTime = +data.time;
      }
      const point = new PointECG(data, this.nowTime);
      this.listI.push(point);
    },
    initIo() {
      if (this.io) {
        this.io.close();
        this.io = null;
      }
      this.io = io(URL.SOCKET, {
        query: {
          loginUserNum: 1,
        },
      });
      this.io.on("connect", function () {
        console.log("connect");
      });
      this.io.on("disconnect", function () {
        console.log("disconnect");
      });
      this.io.on("push_event", this.onPushEvent);
      this.io.on("push_oscillo_event", this.onGetWave);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/index";
.vital-sign {
  height: 100%;
  display: grid;
  grid-template-rows: 40px auto 40px;
  grid-template-columns: 60% 40%;
  background: $background;
}
</style>
