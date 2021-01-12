<template>
  <canvas ref="canvas" width="1050" height="180">不支持canvas</canvas>
</template>

<script>
import {ref, onMounted, onBeforeUnmount} from "@vue/composition-api";
import useECG from "./composables/useECG";
// import {Socket} from "@/utils/socket";
export default {
  name: "ECG",
  props:{
    socket: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const canvas = ref(null);
    const scaleX = ((10 / 10) * 1050) / 7000;
    const scaleY = 10 / 0.2;
    const timeOffset = 800;
    const { startDraw, handleGetPoint } = useECG(
      canvas,
      scaleX,
      scaleY,
      timeOffset
    );

    onMounted(() => {
      startDraw();
      props.socket.on("push_oscillo_event", handleGetPoint);
      props.socket.on('connect', () => {
        console.log('connect')
      })
      props.socket.on('disconnect', () => {
        console.log('disconnect')
      })
    });

    onBeforeUnmount(() => {
      // cancelAnimation()
      // props.socket.off("push_oscillo_event", handleGetPoint);
      console.log('unmounted ')
    })

    return {
      canvas,
    };
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  margin: auto;
}
</style>
