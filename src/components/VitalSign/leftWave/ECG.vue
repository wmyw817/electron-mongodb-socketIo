<template>
<div class="ecg">
  <canvas ref="ecg" class="wave" width="7000" height="1000"></canvas>
</div>
</template>

<script>
import {LinkedListMax} from "../../../models/linkedList";
import {Queue} from "../../../models/queue";

export default {
name: "ECG",
  props:{
  startTime:{
    required: false,
    type: Number
  },
    listI:{
      required: true,
      type: LinkedListMax
    }
  },
  mounted() {
  const canvas = this.$refs.ecg
    const ctx = canvas.getContext('2d')

    function drawLine() {
      const peak = line.getPeak()
      if (peak) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(0,153,255,1)';
        ctx.clearRect(0 ,0, peak.x + 10, 1000)
        ctx.moveTo(peak.x, peak.y)
        for (let element of line) {
          console.log(element.x, element.y)
          ctx.lineTo(element.x, element.y)
        }
        ctx.moveTo(peak.x, peak.y)
        ctx.stroke();
      }
    }
    const line = new Queue()
    const step = (timestamp) => {
      if (this.startTime) {
        const element = this.listI.getElementByTime(this.startTime + timestamp - 1000)
        if (element) {
          const peak = line.getPeak()
          if (peak && element.x < peak.x) {
            line.clear()
          }
          line.enqueue(element)
        }

        drawLine()
      }
      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step);
  }
}
</script>

<style lang="scss" scoped>
.ecg {
  .wave {
    width: 700px;
    height: 100%;
  }

}
</style>
