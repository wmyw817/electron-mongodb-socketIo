import { defaultEquals } from "../utils";

class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

export class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let node = this.head;
      for (let i = 0; i < index; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  getElement(element) {
    const index = this.indexOf(element);
    return this.getElementAt(index);
  }

  insert(index, element) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current.element; i++) {
      if (this.equalsFn(current.element, element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  filter(fn) {
    const arr = [];
    let current = this.head;
    if (current) {
      for (let i = 0; ; i++) {
        if (fn(current.element, i)) {
          arr.push(current.element);
        }
        if (current.next) {
          current = current.next;
        } else {
          break;
        }
      }
    }
    return arr;
  }

  toString() {
    if (this.head == null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.count && current != null; i++) {
      objString += `,${current.element}`;
      current = current.next;
    }
    return objString;
  }
}

export class LinkedListMax extends LinkedList {
  constructor(maxCount, equalsFn) {
    super(equalsFn);
    this.maxCount = maxCount;
  }

  push(element) {
    super.push(element);
    if (this.count > this.maxCount) {
      this.removeAt(0);
    }
  }

  filter(fn) {
    const arr = super.filter(fn);
    arr.forEach(item => {
      this.remove(item)
    })
    return arr
  }

  toString() {
    if (this.head == null) {
      return "";
    }
    let objString = `${this.head.element.x} ${this.head.element.y}`;
    let current = this.head.next;
    for (let i = 1; i < this.count && current != null; i++) {
      objString += `,${current.element.x} ${current.element.y}`;
      current = current.next;
    }
    return objString;
  }
}
