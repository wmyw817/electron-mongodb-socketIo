<template>
  <div class="ecg">
    <canvas ref="back" class="wave" width="1080" height="450"></canvas>
    <canvas ref="ecg" class="wave" width="1080" height="450"></canvas>
  </div>
</template>

<script>
import { LinkedListMax } from '../../../models/linkedList'
import {
  // QueueDraw,
  // QueueTwoPoints,
  QueueDrawPoints
} from '../../../models/queue'
import PointECG from '../../../models/PointECG'
import Socket from '@/utils/socket'
export default {
  name: 'ECG',
  data () {
    return {
      scaleX: ((10 / 10) * 1050) / 7000,
      scaleY: 10 / 0.2,
      listI: new LinkedListMax(500),
      listII: new LinkedListMax(500),
      listIII: new LinkedListMax(500),
      startTime: 0,
      timeOffset: 800
    }
  },
  mounted () {
    Socket.on('push_oscillo_event', this.onGetWave)
    Socket.on('push_oscillo_event2', this.onGetWave2)
    Socket.on('push_oscillo_event3', this.onGetWave3)

    this.drawBackground()
    const canvas = this.$refs.ecg
    const ctx = canvas.getContext('2d')

    // 上一个时间点的时间
    let lastTimestamp = 0

    // 存储需要绘制的线
    const draw1 = new QueueDrawPoints(ctx, this.scaleX, this.scaleY, 17, 50)
    const draw2 = new QueueDrawPoints(ctx, this.scaleX, this.scaleY, 17, 200)
    const draw3 = new QueueDrawPoints(ctx, this.scaleX, this.scaleY, 17, 350)

    const drawLine = (list, draw, timestamp) => {
      const arr = list.filter(({ time }) => {
        return (
          time >= this.startTime + lastTimestamp - this.timeOffset &&
          time < +this.startTime + timestamp - this.timeOffset
        )
      })
      if (!arr.length) {
        arr.push(
          new PointECG(
            {
              time: this.startTime + lastTimestamp - this.timeOffset,
              value: 0
            },
            this.startTime,
            undefined,
            this.timeOffset
          )
        )
      }
      ctx.strokeStyle = '#69ff85'
      ctx.lineWidth = 2
      for (const element of arr) {
        draw.enqueue(element)
      }
    }

    const step = (timestamp) => {
      if (this.startTime) {
        drawLine(this.listI, draw1, timestamp)
        drawLine(this.listII, draw2, timestamp)
        drawLine(this.listIII, draw3, timestamp)
      }
      lastTimestamp = timestamp
      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  },
  methods: {
    drawBackground () {
      const canvas = this.$refs.back
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.strokeStyle = '#69ff85'
      ctx.lineWidth = 2
      const x = 8
      const length = 10
      const drawRule = (scale) => {
        ctx.save()
        ctx.fillStyle = 'green'
        const baseLineY = 150 * (scale - 1) + 50 + this.scaleY
        ctx.moveTo(x, baseLineY - this.scaleY / 2)
        ctx.lineTo(x + length, baseLineY - this.scaleY / 2)
        ctx.moveTo(x, baseLineY + this.scaleY / 2)
        ctx.lineTo(x + length, baseLineY + this.scaleY / 2)
        ctx.moveTo(x + length / 2, baseLineY - this.scaleY / 2)
        ctx.lineTo(x + length / 2, baseLineY + this.scaleY / 2)
        ctx.restore()
        ctx.save()
        ctx.fillStyle = 'white'
        ctx.font = 'bold 16px serif'
        ctx.fillText('I'.repeat(scale), 10, 150 * (scale - 1) + 30)
        ctx.restore()
      }
      drawRule(1)
      drawRule(2)
      drawRule(3)
      ctx.stroke()
    },
    onGetWave (data) {
      // console.log('push_oscillo_event', data)
      if (!this.startTime) {
        const { time } = data
        this.startTime = +time
      }
      const point = new PointECG(data, this.startTime, undefined, this.timeOffset)
      this.listI.push(point)
      console.log(this.listI.size())
    },
    onGetWave2 (data) {
      // console.log('push_oscillo_event2', data)
      if (!this.startTime) {
        const { time } = data
        this.startTime = +time
      }
      const point = new PointECG(data, this.startTime, undefined, this.timeOffset)
      this.listII.push(point)
    },
    onGetWave3 (data) {
      // console.log('push_oscillo_event2', data)
      if (!this.startTime) {
        const { time } = data
        this.startTime = +time
      }
      const point = new PointECG(data, this.startTime, undefined, this.timeOffset)
      this.listIII.push(point)
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
