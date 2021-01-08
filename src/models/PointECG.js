export default class PointECG {
  constructor({ time = 0, value = 0 }, nowTime = 0, range = 7000) {
    this.time = time;
    this.value = value;
    this.x = (time - nowTime) % range;
    this.y = value * 1000 + 200;
  }
}
