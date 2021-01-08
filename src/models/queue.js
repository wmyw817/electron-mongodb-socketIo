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

  getPeak() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
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

