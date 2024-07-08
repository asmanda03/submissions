/** Node: node for a singly linked list. */

class Node {
    constructor(val) {
      this.val = val;
      this.next = null;
    }
  }
  
  /** LinkedList: chained together nodes. */
  
  class LinkedList {
    constructor(vals = []) {
      this.head = null;
      this.tail = null;
      this.length = 0;
  
      for (let val of vals) this.push(val);
    }
  
    /** _get(idx): retrieve node at idx. */
  
    _get(idx) {
      let cur = this.head;
      let count = 0;
  
      while (cur !== null && count != idx) {
        count += 1;
        cur = cur.next;
      }
  
      return cur;
    }
  
    /** push(val): add new value to end of list. */
  
    push(val) {
      let newNode = new Node(val);
  
      if (!this.head) {
        this.head = newNode;
        this.tail = this.head;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
  
      this.length += 1;
    }
  
    /** unshift(val): add new value to start of list. */
  
    unshift(val) {
      let newNode = new Node(val);
  
      if (this.head === null) {
        this.head = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
  
      if (this.length === 0) this.tail = this.head;
  
      this.length += 1;
    }
  
    /** pop(): return & remove last item. */
  
    pop() {
      return this.removeAt(this.length - 1);
    }
  
    /** shift(): return & remove first item. */
  
    shift() {
      return this.removeAt(0);
    }
  
    /** getAt(idx): get val at idx. */
  
    getAt(idx) {
      if (idx >= this.length || idx < 0) {
        throw new Error("Invalid index.");
      }
  
      return this._get(idx).val;
    }
  
    /** setAt(idx, val): set val at idx to val */
  
    setAt(idx, val) {
      if (idx >= this.length || idx < 0) {
        throw new Error("Invalid index.");
      }
  
      let cur = this._get(idx);
      cur.val = val;
    }
  
    /** insertAt(idx, val): add node w/val before idx. */
  
    insertAt(idx, val) {
      if (idx > this.length || idx < 0) {
        throw new Error("Invalid index.");
      }
  
      if (idx === 0) return this.unshift(val);
      if (idx === this.length) return this.push(val);
  
      // get the one before it
      let prev = this._get(idx - 1);
  
      let newNode = new Node(val);
      newNode.next = prev.next;
      prev.next = newNode;
  
      this.length += 1;
    }
  
    /** removeAt(idx): return & remove item at idx, */
  
    removeAt(idx) {
      if (idx >= this.length || idx < 0) {
        throw new Error("Invalid index.");
      }
  
      // special case: remove first item
  
      if (idx === 0) {
        let val = this.head.val;
        this.head = this.head.next;
        this.length -= 1;
        if (this.length < 2) this.tail = this.head;
        return val;
      }
  
      let prev = this._get(idx - 1);
  
      // special case: remove tail
  
      if (idx === this.length - 1) {
        let val = prev.next.val;
        prev.next = null;
        this.tail = prev;
        this.length -= 1;
        return val;
      }
  
      // normal case: remove in middle
  
      let val = prev.next.val;
      prev.next = prev.next.next;
      this.length -= 1;
      return val;
    }
  
    average() {
      if (this.length === 0) return 0;
  
      let total = 0;
      let current = this.head;
  
      while (current) {
        total += current.val;
        current = current.next;
      }
  
      return total / this.length;
    }
  }
  
  module.exports = LinkedList;

  //tests

  const LinkedList = require("./linked-list");

describe("push", function() {
  it("appends node and increments length", function() {
    let lst = new LinkedList();

    lst.push(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.push(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.tail.val).toBe(10);

    lst.push(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.next.val).toBe(15);
    expect(lst.tail.val).toBe(15);
  });
});

describe("unshift", function() {
  it("adds node at start and increments length", function() {
    let lst = new LinkedList();

    lst.unshift(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.unshift(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(10);
    expect(lst.head.next.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.unshift(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(15);
    expect(lst.head.next.next.val).toBe(5);
    expect(lst.tail.val).toBe(5);
  });
});

describe("pop", function() {
  it("removes node at end and decrements length", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.pop()).toBe(10);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
    expect(lst.length).toBe(1);

    expect(lst.pop()).toBe(5);
    expect(lst.tail).toBe(null);
    expect(lst.head).toBe(null);
    expect(lst.length).toBe(0);
  });
});

describe("shift", function() {
  it("removes node at start and decrements length", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.shift()).toBe(5);
    expect(lst.tail.val).toBe(10);
    expect(lst.length).toBe(1);

    expect(lst.shift()).toBe(10);
    expect(lst.tail).toBe(null);
    expect(lst.head).toBe(null);
    expect(lst.length).toBe(0);
  });
});

describe("getAt", function() {
  it("gets val at index", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.getAt(0)).toBe(5);
    expect(lst.getAt(1)).toBe(10);
  });
});

describe("setAt", function() {
  it("sets val at index", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.setAt(0, 1));
    expect(lst.setAt(1, 2));
    expect(lst.head.val).toBe(1);
    expect(lst.head.next.val).toBe(2);
  });
});

describe("insertAt", function() {
  it("inserts node and adjusts nearby nodes", function() {
    let lst = new LinkedList([5, 10, 15, 20]);

    lst.insertAt(2, 12);
    expect(lst.length).toBe(5);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.head.next.next.val).toBe(12);
    expect(lst.head.next.next.next.val).toBe(15);
    expect(lst.head.next.next.next.next.val).toBe(20);

    lst.insertAt(5, 25);
    expect(lst.head.next.next.next.next.next.val).toBe(25);
    expect(lst.tail.val).toBe(25);
  });

  it("inserts into empty list", function() {
    let lst = new LinkedList();

    lst.insertAt(0, 5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
  });
});

describe("removeAte", function() {
  it("removes from 1-item list", function() {
    let lst = new LinkedList(["a"]);

    lst.removeAt(0);
    expect(lst.length).toBe(0);
    expect(lst.head).toBe(null);
    expect(lst.tail).toBe(null);
  });
});

describe("average", function() {
  it("calculates the average of items in a list", function() {
    let lst = new LinkedList([2, 3, 1, 1, 7, 6, 9]);
    expect(lst.average()).toBeCloseTo(4.1429, 4);
  });

  it("returns 0 for empty lists", function() {
    let lst = new LinkedList();
    expect(lst.average()).toBe(0);
  });
});
  