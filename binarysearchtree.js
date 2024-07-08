class Node {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  class BinarySearchTree {
    constructor(root = null) {
      this.root = root;
    }
  
    /** insert(val): insert a new node into the BST with value val.
     * Returns the tree. Uses iteration. */
  
    insert(val) {
  
    }
  
    /** insertRecursively(val): insert a new node into the BST with value val.
     * Returns the tree. Uses recursion. */
  
    insertRecursively(val) {
  
    }
  
    /** find(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses iteration. */
  
    find(val) {
  
    }
  
    /** findRecursively(val): search the tree for a node with value val.
     * return the node, if found; else undefined. Uses recursion. */
  
    findRecursively(val) {
  
    }
  
    /** dfsPreOrder(): Traverse the array using pre-order DFS.
     * Return an array of visited nodes. */
  
    dfsPreOrder() {
  
    }
  
    /** dfsInOrder(): Traverse the array using in-order DFS.
     * Return an array of visited nodes. */
  
    dfsInOrder() {
  
    }
  
    /** dfsPostOrder(): Traverse the array using post-order DFS.
     * Return an array of visited nodes. */
  
    dfsPostOrder() {
  
    }
  
    /** bfs(): Traverse the array using BFS.
     * Return an array of visited nodes. */
  
    bfs() {
  
    }
  
    /** Further Study!
     * remove(val): Removes a node in the BST with the value val.
     * Returns the removed node. */
  
    remove(val) {
  
    }
  
    /** Further Study!
     * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  
    isBalanced() {
  
    }
  
    /** Further Study!
     * findSecondHighest(): Find the second highest value in the BST, if it exists.
     * Otherwise return undefined. */
  
    findSecondHighest() {
      
    }
  }
  
  module.exports = BinarySearchTree;

  
  //tests
  const BinarySearchTree = require("./binary-search-tree");

describe("insert", function() {
  it("inserts a node at the correct position", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    expect(binarySearchTree.root.val).toEqual(15);
    expect(binarySearchTree.root.right.val).toEqual(20);
    expect(binarySearchTree.root.left.right.val).toEqual(12);
  });

  it("inserts a node at the root if there is nothing there", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(15);
    expect(binarySearchTree.root.val).toEqual(15);
    expect(binarySearchTree.root.left).toBe(null);
    expect(binarySearchTree.root.right).toBe(null);
  });
});

describe("insertRecursively", function() {
  it("inserts a node at the correct position", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insertRecursively(15)
      .insertRecursively(20)
      .insertRecursively(10)
      .insertRecursively(12);
    expect(binarySearchTree.root.val).toEqual(15);
    expect(binarySearchTree.root.right.val).toEqual(20);
    expect(binarySearchTree.root.left.right.val).toEqual(12);
  });

  it("inserts a node at the root if there is nothing there", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree.insertRecursively(15);
    expect(binarySearchTree.root.val).toEqual(15);
    expect(binarySearchTree.root.left).toBe(null);
    expect(binarySearchTree.root.right).toBe(null);
  });
});

describe("find", function() {
  it("finds a node correctly", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    var foundNode = binarySearchTree.find(20);
    expect(foundNode.val).toBe(20);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right).toBe(null);
  });

  it("returns undefined if a node is not found", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    var foundNode = binarySearchTree.find(120);
    expect(foundNode).toBe(undefined);
  });
});

describe("findRecursively", function() {
  it("finds a node correctly", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    var foundNode = binarySearchTree.findRecursively(20);
    expect(foundNode.val).toBe(20);
    expect(foundNode.left).toBe(null);
    expect(foundNode.right).toBe(null);
  });

  it("returns undefined if a node is not found", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12);
    var foundNode = binarySearchTree.findRecursively(120);
    expect(foundNode).toBe(undefined);
  });
});

describe("dfsPreOrder", function() {
  it("returns an array of values found with DFS Pre Order", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
    expect(binarySearchTree.dfsPreOrder()).toEqual([15, 10, 1, 5, 12, 20, 50]);
  });
});

describe("dfsInOrder", function() {
  it("returns an array of values found with DFS In Order", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
    expect(binarySearchTree.dfsInOrder()).toEqual([1, 5, 10, 12, 15, 20, 50]);
  });
});

describe("dfsPostOrder", function() {
  it("returns an array of values found with DFS Post Order", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
    expect(binarySearchTree.dfsPostOrder()).toEqual([5, 1, 12, 10, 50, 20, 15]);
  });
});

describe("BFS", function() {
  it("should return the correct output", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
    expect(binarySearchTree.bfs()).toEqual([15, 10, 20, 1, 12, 50, 5]);
  });
});

describe("remove", function() {
  it("remove should correctly remove a node with no children", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);
    binarySearchTree.remove(50);
    expect(binarySearchTree.root.right.val).toBe(20);
    expect(binarySearchTree.root.right.right).toBe(null);

    binarySearchTree.remove(5);
    expect(binarySearchTree.root.left.left.val).toBe(1);
    expect(binarySearchTree.root.left.left.right).toBe(null);
  });

  it("remove should correctly remove a node with one child", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50);

    binarySearchTree.remove(1);
    expect(binarySearchTree.root.left.left.val).toBe(5);
    expect(binarySearchTree.root.left.left.left).toBe(null);
    expect(binarySearchTree.root.left.left.right).toBe(null);

    binarySearchTree.remove(20);
    expect(binarySearchTree.root.right.val).toBe(50);
    expect(binarySearchTree.root.right.right).toBe(null);
    expect(binarySearchTree.root.right.left).toBe(null);
  });

  it("remove should correctly remove a node with two children", function() {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(15)
      .insert(20)
      .insert(10)
      .insert(12)
      .insert(1)
      .insert(5)
      .insert(50)
      .insert(60)
      .insert(30)
      .insert(25)
      .insert(23)
      .insert(24)
      .insert(70);

    binarySearchTree.remove(10);
    expect(binarySearchTree.root.left.val).toBe(12);
    expect(binarySearchTree.root.left.left.val).toBe(1);
    expect(binarySearchTree.root.left.left.right.val).toBe(5);

    binarySearchTree.remove(50);
    expect(binarySearchTree.root.right.val).toBe(20);
    expect(binarySearchTree.root.right.right.val).toBe(60);
    expect(binarySearchTree.root.right.right.left.val).toBe(30);
  });

  it("should remove a node with two children and handle the children of the removed node", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree
      .insert(22)
      .insert(49)
      .insert(85)
      .insert(66)
      .insert(95)
      .insert(90)
      .insert(100)
      .insert(88)
      .insert(93)
      .insert(89);

    binarySearchTree.remove(85);
    expect(binarySearchTree.root.right.right.val).toBe(88); // 88
    expect(binarySearchTree.root.right.right.right.left.left.val).toBe(89); // 89
  });
});

describe("isBalanced", function() {
  it("checks if it is balanced", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(15);
    binarySearchTree.insert(20);
    binarySearchTree.insert(10);
    binarySearchTree.insert(12);
    expect(binarySearchTree.isBalanced()).toEqual(true);

    var binarySearchTree2 = new BinarySearchTree();
    binarySearchTree2.insert(5);
    expect(binarySearchTree2.isBalanced()).toEqual(true);
    binarySearchTree2.insert(6);
    expect(binarySearchTree2.isBalanced()).toEqual(true);
    binarySearchTree2.insert(7);
    expect(binarySearchTree2.isBalanced()).toEqual(false);
  });
});

describe("findSecondHighest", function() {
  it("finds the 2nd largest", function() {
    var binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(15);
    binarySearchTree.insert(20);
    binarySearchTree.insert(10);
    binarySearchTree.insert(12);
    expect(binarySearchTree.findSecondHighest()).toEqual(15);

    var binarySearchTree2 = new BinarySearchTree();
    expect(binarySearchTree2.findSecondHighest()).toEqual(undefined);
  });
});
