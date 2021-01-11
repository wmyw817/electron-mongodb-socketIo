export class Queue {
  constructor() {
    // 队列尾
    this.count = 0;
    // 队列第一项
    this.lowestCount = 0;
    // 记录数据
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  isEmpty() {
    return this.count === this.lowestCount;
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.items = {};
    this.count = this.lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString += `,${this.items[i]}`;
    }
    return objString;
  }

  getFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  getEnd() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  getBeforeEnd() {
    if (this.size() < 1) {
      return undefined
    }
    return this.items[this.count - 2];
  }

  [Symbol.iterator]() {
    let i = this.lowestCount;
    const next = () => {
      const value = this.items[i];
      i++;
      return {
        value,
        done: i > this.count,
      };
    };
    return {
      next,
    };
  }
}

export class QueueDraw extends Queue {
  constructor(ctx, scaleX, scaleY, offsetX = 0, offsetY = 0) {
    super();
    this.ctx = ctx;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }
  enqueue(element) {
    const end = this.getEnd();
    if (end && end.x > element.x) {
      this.clear();
      super.enqueue(element);
    } else {
      super.enqueue(element);
      this.clearAndDraw();
    }
  }

  clearAndDraw() {
    if (this.size() < 2) return;
    const front = this.getFront();
    const end = this.getEnd();

    this.ctx.clearRect(
        this.offsetX - 1,
        this.offsetY,
        end.x * this.scaleX + 10,
        this.scaleY * 2
    );
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#69ff85';
    this.ctx.lineJoin = "round";
    this.ctx.moveTo(
        front.x * this.scaleX + this.offsetX,
        this.scaleY - front.y * this.scaleY + this.offsetY
    );
    for (let element of this) {
      this.ctx.lineTo(
          element.x * this.scaleX + this.offsetX,
          this.scaleY - element.y * this.scaleY + this.offsetY
      );
    }
    this.ctx.stroke();
  }
}

export class QueueTwoPoints extends Queue {
  constructor(ctx, scaleX, scaleY, offsetX = 0, offsetY = 0) {
    super();
    this.ctx = ctx;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }
  enqueue(element) {
    super.enqueue(element);
    if (this.size() > 2) {
      this.dequeue()
      this.clearAndDraw()
    }
  }

  clearAndDraw() {
    if (this.size() < 2) return;
    const front = this.getFront();
    const end = this.getEnd();
    if (front.x > end.x) {
      this.ctx.clearRect(this.offsetX - 1,
          this.offsetY,
          end.x * this.scaleX + 10,
          this.scaleY * 2)
    } else {
      this.ctx.clearRect(
          front.x * this.scaleX + this.offsetX,
          this.offsetY,
          (end.x - front.x) * this.scaleX + 10,
          this.scaleY * 2
      );
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#69ff85';
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(
          front.x * this.scaleX + this.offsetX,
          this.scaleY - front.y * this.scaleY + this.offsetY
      );
      this.ctx.lineTo(
          end.x * this.scaleX + this.offsetX,
          this.scaleY - end.y * this.scaleY + this.offsetY
      );
      this.ctx.stroke();
    }
  }
}

export class QueueDrawPoints extends Queue {
  constructor(ctx, scaleX, scaleY, offsetX = 0, offsetY = 0, max = 5) {
    super();
    this.ctx = ctx;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.max = max;
  }
  enqueue(element) {
    const end = this.getEnd();
    if (end && end.x > element.x) {
      this.clear();
      super.enqueue(element);
    } else {
      super.enqueue(element);
      if (this.size() > this.max) {
        this.dequeue()
      }
      this.clearAndDraw();
    }
  }

  clearAndDraw() {
    if (this.size() < 2) return;
    const front = this.getFront();
    const end = this.getEnd();

    const beforeEnd = this.getBeforeEnd();
    if (this.size() === 2) {
      this.ctx.clearRect(
          this.offsetX - 1,
          this.offsetY,
          end.x * this.scaleX + 10,
          this.scaleY * 2
      );
    } else {
      this.ctx.clearRect(
          beforeEnd.x * this.scaleX + this.offsetX,
          this.offsetY,
          (end.x - beforeEnd.x) * this.scaleX + 10,
          this.scaleY * 2
      );
    }
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#69ff85';
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(
        front.x * this.scaleX + this.offsetX,
        this.scaleY - front.y * this.scaleY + this.offsetY
    );
    for (let element of this) {
      this.ctx.lineTo(
          element.x * this.scaleX + this.offsetX,
          this.scaleY - element.y * this.scaleY + this.offsetY
      );
    }
    this.ctx.stroke();
  }
}
