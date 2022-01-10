class Node {
  constructor (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor () {
    this.root = null;
  }

  insert (value) {
    const newNode = new Node(value);
    //First element
    if (!this.root) {
      this.root = newNode;
    }
    //More than one element
    else {
      let currentNode = this.root;

      while (true) {
        //verify if insert to left or right
        if (value < currentNode.value) {
          //Insert to left
          if (!currentNode.left) {
            //found a spot in left
            currentNode.left = newNode;
            return this; //stop the infinit loop
          }
          //this spot is already filled, update to next spot
          currentNode = currentNode.left;
        } else {
          //insert to right
          if (!currentNode.right) {
            //found a spot in right
            currentNode.right = newNode;
            return this; //stop the infinit loop
          }
          //this spot is already filled, update to next spot
          currentNode = currentNode.right;
        }
      }
    }


    return this
  }

  lookup (value) {
    if (!this.root)
      return null;

    let currentNode = this.root;
    while (true) {
      if (value === currentNode.value) {
        //value found
        return currentNode;
      } else if (value < currentNode.value) {
        // the value is on the left
        if (!currentNode.left) {
          return null; //this value doesnt exists in this tree
        } else {
          // update to next level on left
          currentNode = currentNode.left;
        }
      } else {
        // the value is on the right
        if (!currentNode.right) {
          return null; //this value doesnt exists in this tree
        } else {
          //update to next level on right
          currentNode = currentNode.right;
        }
      }
    }
  }
  remove (value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        //We have a match, get to work!

        //Option 1: No right child: 
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {

            //if parent > current value, make current left child a child of parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;

              //if parent < current value, make left child a right child of parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }

          //Option 2: Right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if (parentNode === null) {
            this.root = currentNode.right;
          } else {

            //if parent > current, make right child of the left the parent
            if (currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;

              //if parent < current, make right child a right child of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }

          //Option 3: Right child that has a left child
        } else {

          //find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while (leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }

          //Parent's left subtree is now leftmost's right subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if (parentNode === null) {
            this.root = leftmost;
          } else {
            if (currentNode.value < parentNode.value) {
              parentNode.left = leftmost;
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }
        return true;
      }
    }
  }
}

/**
 *           100 
 *    50            200
 * 25    75      150     250
 */

const tree = new BinarySearchTree();

console.log(tree.lookup(200));

tree.insert(100);
tree.insert(200);
tree.insert(50);
tree.insert(75);
tree.insert(25);
tree.insert(150);
tree.insert(250);


// console.log(tree.lookup(200));

tree.remove(200);
console.log(JSON.stringify(traverse(tree.root)));

// console.log(tree.root);



function traverse (node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);

  return tree;
}