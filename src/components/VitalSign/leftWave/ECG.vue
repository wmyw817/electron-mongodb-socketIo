<template>
  <div class="ecg">
    <canvas ref="back" class="wave" width="1080" height="450"></canvas>
    <canvas ref="canvas" class="wave" width="1080" height="450"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
import useECG from '@/composables/useECG'
import Socket from '@/utils/socket'
export default {
  name: 'ECG',
  setup () {
    const canvas = ref(null)
    const scaleX = (10 / 10) * (1050 / 7000)
    const scaleY = 10 / 0.2
    const { startDraw, handleGetPoint, cancelAnimation } = useECG(
      canvas,
      scaleX,
      scaleY,
      17,
      50
    )
    const {
      startDraw: startDraw2,
      handleGetPoint: handleGetPoint2,
      cancelAnimation: cancelAnimation2
    } = useECG(canvas, scaleX, scaleY, 17, 200)
    const {
      startDraw: startDraw3,
      handleGetPoint: handleGetPoint3,
      cancelAnimation: cancelAnimation3
    } = useECG(canvas, scaleX, scaleY, 17, 350)
    Socket.on('push_oscillo_event', handleGetPoint)
    Socket.on('push_oscillo_event2', handleGetPoint2)
    Socket.on('push_oscillo_event3', handleGetPoint3)
    onMounted(() => {
      startDraw()
      startDraw2()
      startDraw3()
    })

    onBeforeUnmount(() => {
      cancelAnimation()
      cancelAnimation2()
      cancelAnimation3()
    })

    return {
      canvas,
      scaleY
    }
  },
  mounted () {
    this.drawBackground()
  },
  methods: {
    drawBackground () {
      const canvas = this.$refs.back
      const ctx = canvas.getContext('2d')
      const x = 8
      const length = 10
      const drawRule = (scale) => {
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = '#69ff85'
        ctx.lineWidth = 2
        const baseLineY = 150 * (scale - 1) + 50 + this.scaleY
        ctx.moveTo(x, baseLineY - this.scaleY / 2)
        ctx.lineTo(x + length, baseLineY - this.scaleY / 2)
        ctx.moveTo(x, baseLineY + this.scaleY / 2)
        ctx.lineTo(x + length, baseLineY + this.scaleY / 2)
        ctx.moveTo(x + length / 2, baseLineY - this.scaleY / 2)
        ctx.lineTo(x + length / 2, baseLineY + this.scaleY / 2)
        ctx.stroke()
        ctx.fillStyle = 'white'
        ctx.font = 'bold 16px serif'
        ctx.fillText('I'.repeat(scale), 10, 150 * (scale - 1) + 30)
        ctx.restore()
      }
      drawRule(1)
      drawRule(2)
      drawRule(3)
    }
  }
}
</script>

<style lang="scss" scoped>
.ecg {
  position: relative;
  canvas {
    position: absolute;
    left: 0;
    top: 0;
  }
  .wave {
    height: 450px;
  }
}
</style>
