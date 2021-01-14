<template>
  <canvas ref="canvas" width="840" height="200">不支持canvas</canvas>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
import useECG from '@/composables/useECG'
export default {
  name: 'ECG',
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const canvas = ref(null)
    const scaleX = (10 / 10) * (840 / 7000)
    const scaleY = 10 / 0.2
    const { startDraw, handleGetPoint, cancelAnimation } = useECG(
      canvas,
      scaleX,
      scaleY,
      0,
      0
    )
    const {
      startDraw: startDraw2,
      handleGetPoint: handleGetPoint2,
      cancelAnimation: cancelAnimation2
    } = useECG(canvas, scaleX, scaleY, 0, 100)
    props.socket.on('push_oscillo_1event', handleGetPoint)
    props.socket.on('push_oscillo_2event', handleGetPoint2)
    onMounted(() => {
      startDraw()
      startDraw2()
    })

    onBeforeUnmount(() => {
      cancelAnimation()
      cancelAnimation2()
    })

    return {
      canvas
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  margin: auto;
}
</style>
