import PointECG from "@/models/PointECG";
import { QueueDrawPoints } from "@/models/queue";
import { LinkedListMax } from "../../../models/linkedList";
export default function (canvas, scaleX, scaleY, timeOffset) {
  let ctx; // canvas 上下文
  let lastTimestamp = 0; // 用于存储上次的时间戳
  let points; // 存储用于绘制的点
  let list = new LinkedListMax(500); // 存储从服务器获取的数据
  let startTime;
  let requestId

  const drawLine = (list, draw, timestamp) => {
    const arr = list.filter(({ time }) => {
      return (
        +time >= startTime + lastTimestamp - timeOffset &&
        +time < startTime + timestamp - timeOffset
      );
    });
    console.log(arr.length)

    if (!arr.length) {
      arr.push(
        new PointECG(
          {
            time: startTime + lastTimestamp - timeOffset,
            value: 0,
          },
          startTime,
          undefined,
          timeOffset
        )
      );
    }
    ctx.save();
    ctx.strokeStyle = "#69ff85";
    ctx.lineWidth = 2;
    for (let element of arr) {
      draw.enqueue(element);
    }
    ctx.restore();
  };

  const step = (timestamp) => {
    if (startTime) {
      drawLine(list, points, timestamp);
    }

    lastTimestamp = timestamp;
    requestId = window.requestAnimationFrame(step);

  };

  const handleGetPoint = (data) => {
    if (!startTime) {
      const {time} = data
          startTime = +time
    }
    const point = new PointECG(data, startTime, undefined, timeOffset);
    list.push(point);
    console.log(point.x)
  };

  const startDraw = () => {
    ctx = canvas.value.getContext("2d");
    points = new QueueDrawPoints(ctx, scaleX, scaleY, 17, 50);
    requestId = window.requestAnimationFrame(step);
  };

  const cancelAnimation = () => {
    window.cancelAnimationFrame(requestId)
  }

  return {
    startDraw,
    handleGetPoint,
    cancelAnimation
  };
}
