const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  root() {
    return this.treeRoot;
  }

  add(data) {
    let newNode = new Node(data);
    if (this.treeRoot === null) {
      this.treeRoot = newNode;
    } else {
      this.insertNode(this.treeRoot, newNode);
    }
  }
  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.leftChild === null) {
        node.leftChild = newNode;
      } else {
        this.insertNode(node.leftChild, newNode);
      }
    } else {
      if (node.rightChild === null) {
        node.rightChild = newNode;
      } else {
        this.insertNode(node.rightChild, newNode);
      }
    }
  }
  has(data) {
    let current = this.treeRoot;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data <= current.data) {
        current = current.leftChild;
      } else {
        if (data >= current.data) {
          current = current.rightChild;
        }
      }
    }
    return false;
  }

  find(data) {
    let current = this.treeRoot;
    while (current) {
      if (data === current.data) return current;
      if (data <= current.data) {
        current = current.leftChild;
      } else if (data >= current.data) {
        current = current.rightChild;
      }
    }
    return null;
  }

  remove(data) {
    this.treeRoot = this.removeNode(this.treeRoot, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.leftChild = this.removeNode(node.leftChild, data);
      return node;
    } else if (data > node.data) {
      node.rightChild = this.removeNode(node.rightChild, data);
      return node;
    } else {
      if (node.leftChild === null && node.rightChild === null) {
        node = null;
        return node;
      }
      if (node.leftChild === null) {
        node = node.rightChild;
        return node;
      } else if (node.rightChild === null) {
        node = node.leftChild;
        return node;
      }
      let aux = this.findMinNode(node.rightChild);
      node.data = aux.data;
      node.rightChild = this.removeNode(node.rightChild, aux.data);
      return node;
    }
  }

  findMinNode(node) {
    if (node.leftChild === null) {
      return node;
    } else {
      return this.findMinNode(node.leftChild);
    }
  }

  min() {
    let node = this.treeRoot;
    while (node.leftChild) {
      node = node.leftChild;
    }
    return node.data;
  }

  max() {
    let node = this.treeRoot;
    while (node.rightChild) {
      node = node.rightChild;
    }
    return node.data;
  }
}


module.exports = {
  BinarySearchTree
};