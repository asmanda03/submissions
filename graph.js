class Node {
    constructor(value, adjacent = new Set()) {
      this.value = value;
      this.adjacent = adjacent;
    }
  }
  
  class Graph {
    constructor() {
      this.nodes = new Set();
    }
  
    addVertex(vertex) {
      this.nodes.add(vertex);
    }
  
    addVertices(vertexArray) {
      // Add an array of verticies to our graph
  
      for (let vertex of vertexArray) {
        this.addVertex(vertex);
      }
    }
  
    addEdge(v1, v2) {
      // Connect two verticies
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    }
  
    removeEdge(v1, v2) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    }
  
    removeVertex(vertex) {
      for (let node of this.nodes) {
        if (node.adjacent.has(vertex)) {
          node.adjacent.delete(vertex);
        }
      }
      this.nodes.delete(vertex);
    }
  
    depthFirstSearch(start) {
      const visited = new Set();
      const result = [];
  
      function traverse(vertex) {
        // base case
        if (!vertex) {
          return null;
        }
        // visit node
        visited.add(vertex);
        result.push(vertex.value);
  
        // visit neighbors
        vertex.adjacent.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            return traverse(neighbor);
          }
        });
      }
  
      traverse(start);
  
      return result;
    }
  
    depthFirstSearchIterative(start) {
      // Create an empty stack
      const stack = [start];
      const result = [];
      const visited = new Set();
      let currentVertex;
  
      // visit node
      visited.add(start);
  
      // while there are still neighbors to visit
      while (stack.length) {
        currentVertex = stack.pop();
        result.push(currentVertex.value);
  
        // visit neighbors and push onto stack
        currentVertex.adjacent.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            stack.push(neighbor);
          }
        });
      }
      return result;
    }
  
    breadthFirstSearch(start) {
      // Create an empty queue
      const queue = [start];
      const result = [];
      const visited = new Set();
      let currentVertex;
  
      // visit node
      visited.add(start);
  
      // While there is still remaining vertices in queue
      while (queue.length) {
        currentVertex = queue.shift();
        result.push(currentVertex.value);
  
        // visit neighbors
        currentVertex.adjacent.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        });
      }
      return result;
    }
  
    shortestPath(start, end) {
      if (start === end) {
        return [start.value];
      }
  
      var queue = [start];
      let visited = new Set();
      let predecessors = {};
      let path = [];
  
      while (queue.length) {
        let currentVertex = queue.shift();
  
        if (currentVertex === end) {
          let stop = predecessors[end.value];
          while (stop) {
            path.push(stop);
            stop = predecessors[stop];
          }
          path.unshift(start.value);
          path.reverse();
          return path;
        }
  
        visited.add(currentVertex);
        for (let vertex of currentVertex.adjacent) {
          if (!visited.has(vertex)) {
            predecessors[vertex.value] = currentVertex.value;
            queue.push(vertex);
          }
        }
      }
    }
  }
  
  module.exports = { Graph, Node };

  //test
  const { Graph, Node } = require("./graph");

describe("addVertex", function() {
  it("should add a key in the adjacency", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    expect(graph.nodes.has(a)).toBe(false);
    expect(graph.nodes.has(b)).toBe(false);
    expect(graph.nodes.has(c)).toBe(false);
    graph.addVertex(a);
    graph.addVertex(b);
    graph.addVertex(c);
    expect(graph.nodes.has(a)).toBe(true);
    expect(graph.nodes.has(b)).toBe(true);
    expect(graph.nodes.has(c)).toBe(true);
  });
});

describe("addVertices", function() {
  it("should add multiple keys in the adjacency", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    expect(graph.nodes.has(a)).toBe(false);
    expect(graph.nodes.has(b)).toBe(false);
    expect(graph.nodes.has(c)).toBe(false);
    graph.addVertices([a, b, c]);
    expect(graph.nodes.has(a)).toBe(true);
    expect(graph.nodes.has(b)).toBe(true);
    expect(graph.nodes.has(c)).toBe(true);
  });
});

describe("addEdge", function() {
  it("should add the appropriate edges to the adjacency list", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addVertices([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);
    expect(a.adjacent).toContain(b, c);
    expect(b.adjacent).toContain(a, d);
    expect(c.adjacent).toContain(a, d);
    expect(d.adjacent).toContain(b, c);
  });
});

describe("removeEdge", function() {
  it("should remove the vertices from the adjacency list", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addVertices([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);

    graph.removeEdge(b, a);
    graph.removeEdge(c, d);

    expect(a.adjacent).not.toContain(b);
    expect(c.adjacent).not.toContain(d);
  });
});

describe("removeVertex", function() {
  it("should remove the vertex as well as any edges", function() {
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addVertices([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);

    graph.removeVertex(c);
    graph.removeVertex(d);

    expect(a.adjacent.has(c)).toBeFalsy()
    expect(b.adjacent.has(d)).toBeFalsy()

    expect(graph.nodes.has(a)).toBeTruthy();
    expect(graph.nodes.has(b)).toBeTruthy();
    expect(graph.nodes.has(c)).toBeFalsy();
    expect(graph.nodes.has(d)).toBeFalsy();
  });
});

describe("DFS", function() {
  it("return an array of the nodes searched using DFS", function() {
    let graph = new Graph();
    let S = new Node("S");
    let P = new Node("P");
    let U = new Node("U");
    let X = new Node("X");
    let Q = new Node("Q");
    let Y = new Node("Y");
    let V = new Node("V");
    let R = new Node("R");
    let W = new Node("W");
    let T = new Node("T");

    graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

    graph.addEdge(S, P);
    graph.addEdge(S, U);

    graph.addEdge(P, X);
    graph.addEdge(U, X);

    graph.addEdge(P, Q);
    graph.addEdge(U, V);

    graph.addEdge(X, Q);
    graph.addEdge(X, Y);
    graph.addEdge(X, V);

    graph.addEdge(Q, R);
    graph.addEdge(Y, R);

    graph.addEdge(Y, W);
    graph.addEdge(V, W);

    graph.addEdge(R, T);
    graph.addEdge(W, T);

    var result = JSON.stringify(graph.depthFirstSearch(S));
    var validResult =
      result ===
        JSON.stringify(["S", "U", "V", "W", "T", "R", "Q", "Y", "X", "P"]) ||
      result ===
        JSON.stringify(["S", "P", "X", "U", "V", "W", "Y", "R", "Q", "T"]);

    expect(validResult).toBe(true);
  });
});

describe("BFS", function() {
  it("should return an array of the nodes searched using BFS", function() {
    let graph = new Graph();
    let S = new Node("S");
    let P = new Node("P");
    let U = new Node("U");
    let X = new Node("X");
    let Q = new Node("Q");
    let Y = new Node("Y");
    let V = new Node("V");
    let R = new Node("R");
    let W = new Node("W");
    let T = new Node("T");

    graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

    graph.addEdge(S, P);
    graph.addEdge(S, U);

    graph.addEdge(P, X);
    graph.addEdge(U, X);

    graph.addEdge(P, Q);
    graph.addEdge(U, V);

    graph.addEdge(X, Q);
    graph.addEdge(X, Y);
    graph.addEdge(X, V);

    graph.addEdge(Q, R);
    graph.addEdge(Y, R);

    graph.addEdge(Y, W);
    graph.addEdge(V, W);

    graph.addEdge(R, T);
    graph.addEdge(W, T);

    expect(graph.breadthFirstSearch(S)).toEqual([
      "S",
      "P",
      "U",
      "X",
      "Q",
      "V",
      "Y",
      "R",
      "W",
      "T"
    ]);
  });
});
