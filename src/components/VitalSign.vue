<template>
  <div class="vital-sign">
    <TopStatus></TopStatus>
    <LeftWave></LeftWave>
    <RightData></RightData>
    <BottomSetting></BottomSetting>
  </div>
</template>

<script>
import TopStatus from "./VitalSign/TopStatus";
import LeftWave from "./VitalSign/LeftWave";
import RightData from "./VitalSign/RightData";
import BottomSetting from "./VitalSign/BottomSetting";
export default {
  name: "VitalSign",
  components: {
    TopStatus,
    LeftWave,
    RightData,
    BottomSetting,
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
