export default class PointECG {
  constructor({ time = 0, value = 0 }, startTime = 0, range = 7000) {
    this.time = time;
    this.value = value;
    this.x = (time - startTime) % range;
    this.y = +value;
  }
}
