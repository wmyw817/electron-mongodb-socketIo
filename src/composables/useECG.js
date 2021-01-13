import PointECG from "@/models/PointECG";
import { QueueDrawPoints } from "@/models/queue";
import { LinkedListMax } from "@/models/linkedList";
export default function (canvas, scaleX, scaleY, offsetX, offsetY) {
  let ctx; // canvas 上下文
  let lastTimestamp = 0; // 用于存储上次的时间戳
  let lastEndTime = 0; // 用于存储上个取出的结尾
  let points; // 存储用于绘制的点
  let list = new LinkedListMax(50); // 存储从服务器获取的数据
  let startTime;
  let requestId;

  const drawLine = (list, points, timestamp) => {
    const arr = list.filter(
      ({ time }) => +time >= lastEndTime && +time < startTime + timestamp
    );

    if (!arr.length) {
      arr.push(
        new PointECG(
          {
            time: lastEndTime + timestamp - lastTimestamp,
            value: 0,
          },
          startTime
        )
      );
    }
    lastEndTime = +arr[arr.length - 1].time;
    ctx.save();
    ctx.strokeStyle = "#69ff85";
    ctx.lineWidth = 2;
    for (let element of arr) {
      points.enqueue(element);
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
      const { time } = data;
      startTime = +time;
      lastEndTime = startTime;
    }
    const point = new PointECG(data, startTime);
    list.push(point);
  };

  const startDraw = () => {
    ctx = canvas.value.getContext("2d");
    points = new QueueDrawPoints(ctx, scaleX, scaleY, offsetX, offsetY);
    requestId = window.requestAnimationFrame(step);
  };

  const cancelAnimation = () => {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
  };

  return {
    startDraw,
    handleGetPoint,
    cancelAnimation,
  };
}
