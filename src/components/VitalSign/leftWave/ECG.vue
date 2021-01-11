<template>
  <div class="ecg">
    <canvas ref="back" class="wave" width="1080" height="600"></canvas>
    <canvas ref="ecg" class="wave" width="1080" height="600"></canvas>
  </div>
</template>

<script>
import { LinkedListMax } from "../../../models/linkedList";
import {
  // QueueDraw,
  // QueueTwoPoints,
  QueueDrawPoints
} from "../../../models/queue";
import PointECG from "../../../models/PointECG";

export default {
  name: "ECG",
  props: {
    startTime: {
      required: true,
      type: Number,
    },
    listI: {
      required: true,
      type: LinkedListMax,
    },
    listII: {
      required: true,
      type: LinkedListMax,
    },
  },
  data() {
    return {
      scaleX: ((10 / 10) * 1050) / 7000,
      scaleY: 10 / 0.1
    }
  },
  mounted() {
    this.drawBackground()
    const canvas = this.$refs.ecg;
    const ctx = canvas.getContext("2d");


    // 上一个时间点的时间
    let lastTimestamp = 0;

    // 时间偏移
    const timeOffset = 1000;

    // 存储需要绘制的线
    const draw1 = new QueueDrawPoints(ctx, this.scaleX, this.scaleY, 17, 0);
    const draw2 = new QueueDrawPoints(ctx, this.scaleX, this.scaleY, 17, 200);

    const drawLine = (list, draw, timestamp) => {
      const arr = list.filter(({ time }) => {
        return (
          time >= this.startTime + lastTimestamp - timeOffset &&
          time < +this.startTime + timestamp - timeOffset
        );
      });
      if (!arr.length) {
        arr.push(
          new PointECG(
            {
              time: this.startTime + lastTimestamp - timeOffset,
              value: 0,
            },
            this.startTime
          )
        );
      }
      ctx.strokeStyle = "#69ff85";
      ctx.lineWidth = 2;
      for (let element of arr) {
        draw.enqueue(element);
      }
    };

    const step = (timestamp) => {
      drawLine(this.listI, draw1, timestamp);
      drawLine(this.listII, draw2, timestamp);
      lastTimestamp = timestamp;
      window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  },
  methods: {
    drawBackground() {
      const canvas = this.$refs.back
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "#69ff85";
      ctx.lineWidth = 2;
      const x = 8;
      const length = 10;
      const drawRule = (scale) => {
        ctx.save();
        ctx.fillStyle = "green";
        ctx.moveTo(x, this.scaleY*(2*scale - 1) - this.scaleY / 2);
        ctx.lineTo(x + length, this.scaleY*(2*scale - 1) - this.scaleY / 2);
        ctx.moveTo(x, this.scaleY*(2*scale - 1) + this.scaleY / 2);
        ctx.lineTo(x + length, this.scaleY*(2*scale - 1) + this.scaleY / 2);
        ctx.moveTo( x + length/2, this.scaleY*(2*scale - 1) - this.scaleY / 2);
        ctx.lineTo(x + length/2, this.scaleY*(2*scale - 1) + this.scaleY / 2);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = "white";
        ctx.font = "bold 16px serif";
        ctx.fillText('I'.repeat(scale), 10, this.scaleY*(2*(scale - 1)) + 30)
        ctx.restore();
      }
      drawRule(1);
      drawRule(2);
      drawRule(3);
      ctx.stroke();
    }
  }
};
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
    height: 600px;
  }
}
</style>
