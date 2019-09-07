// ENGLISH

// Compares the current node's value to the provided value
// If equal, returns 0
// If greater, returns 1
// If lesser, returns -1 
var compareTo = function (nodeValue, value){
  if(nodeValue > value)
    return 1;
  else if(nodeValue < value)
    return -1;
  else if(Object.is(nodeValue, value))
    return 0;
  else
    throw new Error("The comparison has failed unexpectedly.");
}

function BinaryTreeNode(value){
  this.left = null;
  this.right = null;
  this.value = value === 0 ? 0 : (value || null);
}

function BinaryTree(){
  this.head = null;
  this.count = 0;

  // Adds the provided value to the binary tree
  this.add = function(value){
    console.log("Adding ", value);
    if(this.head === null){
      this.head = new BinaryTreeNode(value);
    }else{
      this.addTo(this.head, value);
    }

    ++this.count;
  }

  // Recursive add algorithm
  this.addTo = function(node, value){
    // Case 1: Value is less than the current node value
    if(compareTo(node.value, value) > 0){
      
      if(node.left === null){
        // We check if the LEFT node is null. 
        // If it is, we create a new node with 
        // the given value.
        node.left = new BinaryTreeNode(value);
      } else {
        // Otherwise we keep going left until we hit null.
        // Once we get to a null node, we create a new node with 
        // the given value.
        this.addTo(node.left, value);
      }        
    } 
    // Case 2: Value is equal or greater than the current value
    else {
      // We check if the RIGHT node is null. 
      // If it is, we create a new node with 
      // the given value.
      if(node.right === null){
        node.right = new BinaryTreeNode(value);;
      } else {
        // Otherwise we keep going right until we hit null.
        // Once we get to a null node, we create a new node with 
        // the given value.
        this.addTo(node.right, value);        
      }
    }
  }

  // Determines if the specified value exists in the binary tree.
  this.contains = function(value){
    // We create a parent reference for the findWithParent function
    // It's just throwaway storage, nothing more.
    let ref = {parent: new BinaryTreeNode()};
    return this.findWithParent(value, ref, this.head) !== null;
  }

  // Finds and returns the first node containing the specified value.
  // If the value is not found, returns null. Also returns the parent 
  // of the found node (or null) which is used in this.remove
  this.findWithParent = function(value, ref){

    // We are setting current to the head of the tree because
    // we are always starting the search from the head.
    let current = this.head;

    // We are using the parameter ref as a wrapper object to keep a reference
    // to the original object.
    ref.parent = null;

    // While we don't have a match
    while(current != null){
      let result = compareTo(current.value, value);

      if(result > 0){
        // If the value is less than current, go left
        ref.parent = current;
        current = current.left;
      }
      else if(result < 0){
        // If the value is greater than current, go right
        ref.parent = current;
        current = current.right;
      }
      else{
        // We have a match
        break;
      }
    }
    
    return current;
  }

  // REMOVE

  // Removes the first occurence of the specified value from the tree
  // Returns true if the value was removed, false otherwise
  this.remove = function(value){
    let ref = {current: new BinaryTreeNode(), parent: new BinaryTreeNode()};

    // We find the node containing the argument value and it's parent
    ref.current = this.findWithParent(value, ref);

    // If no node was found we return false.
    if(ref.current === null){
      return false;
    }

    // Otherwise we decrement the count and proceed ondward.
    --this.count;

    // Case 1: If the current has no right child, then current's left replaces current
    if(ref.current.right == null) {

      // If the parent node is null, 
      // that means we are deleting the root node.
      if(ref.parent == null){
        // In that case we promote the left child as the root node.
        this.head = ref.current.left;
      }
      // Otherwise we figure out are we updating the parent's
      // left child link or the right side link
      else {
        let result = compareTo(ref.parent.value, ref.current.value);
        if(result > 0){
          // If the parent value is greater than current value
          // we make the current left child a left child of parent
          ref.parent.left = ref.current.left
        }else if(result < 0){
          // if parent value is less than current value
          // make the current left child a right child of parent
          ref.parent.right = ref.current.left;
        }
      }
    }
    // Case 2: If current's child has no left child, then current's right child
    // replaces current
    else if(ref.current.right.left == null){
      // Because the current node's right node left child is null,
      // we promote the current node's left child (if any) as a
      // child of current node's right node left child node.
      ref.current.right.left = ref.current.left;

      if(ref.parent == null){
        this.head = ref.current.right;
      } else {
        let result = compareTo(ref.parent.value, ref.current.value);
        if(result > 0){
          // if parent value is greater than current value
          // make the current right child a left child of parent
          ref.parent.left = ref.current.right;
        }
        else if(result < 0){
          // if parent value is less than current value
          // make the current right child of parent
          ref.parent.right = ref.current.right;
        }
      }
    }
    // Case 3: If current's right child has a left child, replace current with current's
    // right child's left-most child
    else {
      // find the right's left-most child
      let leftmost = ref.current.right.left;
      let leftmostParent = ref.current.right;

      while(leftmost.left != null){
        leftmostParent = leftmost;
        leftmost = leftmost.left;
      }

      // the parent's left subtree becomes the leftmost's right subtree
      leftmostParent.left = leftmost.right;

      // assign leftmost's left and right to current's left and right children
      leftmost.left = ref.current.left;
      leftmost.right = ref.current.right;

      if(ref.parent == null){
        this.head = leftmost;
      } else {
        let result = compareTo(ref.parent.value, ref.current.value);
        if(result > 0){
          // if parent value is greater than current value
          // make leftmost the parent's left child
          ref.parent.left = leftmost;
        }
        else if(result < 0){
          // if parent value is less than current value
          // make leftmost the parent's right child
          ref.parent.right = leftmost;
        }
      }
    }

    return true;
  }  

  this.preOrderTraversal = function(cb){
    this.__preOrderTraversal__(cb, this.head);
  }

  this.preOrderTraversalRecursive = function(cb){
    this.__preOrderTraversalRecursive__(cb, this.head);
  }

  this.__preOrderTraversalRecursive__ = function(cb, node){
    if(node != null){  
      cb(node.value);
      this.__preOrderTraversal__(cb, node.left);
      this.__preOrderTraversal__(cb, node.right);    
    }
  }

  this.__preOrderTraversal__ = function(cb, node){
    if(node != null){  
      let stack = [];
      let current = node;

      let goLeftNext = true;
      stack.push(current);

      cb(current.value);

      while(stack.length > 0){              

        if(goLeftNext){
          while(current.left != null){
            stack.push(current);
            current = current.left;
            cb(current.value);
          }
        }

        if(current.right != null){
          current = current.right;
          cb(current.value);
          goLeftNext = true;
        } else {
          current = stack.pop();
          goLeftNext = false;
        }

      }
    }
  }

  this.postOrderTraversal = function(cb){
    this.__postOrderTraversal__(cb, this.head);
  }

  this.postOrderTraversalRecursive = function(cb){
    this.__postOrderTraversalRecursive__(cb, this.head);
  }

  this.__postOrderTraversalRecursive__ = function(cb, node){
    if(node != null){
      this.__postOrderTraversal__(cb, node.left);
      this.__postOrderTraversal__(cb, node.right);
      cb(node.value);
    }
  }

  this.__postOrderTraversal__ = function(cb, node){
    if(node != null){
      let stack = [];
      let auxillaryStack = [];
      let current = node;
      
      let isOnLeftSide = true;
      let goLeftNext = true;

      stack.push(current);    

      while(stack.length > 0){         
        if(goLeftNext){
          while(current.left != null){
            stack.push(current);
            current = current.left;
          }          
        }
        
        if(current.right != null){
          if(isOnLeftSide)
            auxillaryStack.push(current); 
                     
          current = current.right;

          if(!isOnLeftSide){
            auxillaryStack.push(current);
          }
          goLeftNext = true;
        } else {          
          cb(current.value);          

          while(auxillaryStack.length > 0 && stack.length === 1 && !isOnLeftSide){
            let temp = auxillaryStack.pop();
            
            if(temp !== current)
              cb(temp.value);
            if(auxillaryStack.length === 0)
              cb(this.head.value);
          }

          current = stack.pop();

          while(auxillaryStack.length > 0 && isOnLeftSide)
            cb(auxillaryStack.pop().value);

          goLeftNext = false;
        }        

        if(stack.length === 1 && isOnLeftSide)
          isOnLeftSide = false;
      }
    }
  }

  this.inOrderTraversal = function(cb){
    this.__inOrderTraversal__(cb, this.head);
  }

  this.inOrderTraversalRecursive = function(cb){
    this.__inOrderTraversalRecursive__(cb, this.head);
  }

  this.__inOrderTraversalRecursive__ = function(cb, node){
    if(node != null){
      this.__inOrderTraversal__(cb, node.left);
      cb(node.value);
      this.__inOrderTraversal__(cb, node.right);
    }
  }

  this.__inOrderTraversal__ = function(cb, node){
    if(node != null){
      // store the nodes we've skipped in this stack (avoids recursion)
      let stack = [];
      let current = node;

      // when removing recursion we need to keep track of whether or not
      // we should be going to the left node or the righ nodes next.
      let goLeftNext = true;

      // start by pushing the head onto the stack
      stack.push(current);

      while(stack.length > 0){
        // if we're heading left...
        if(goLeftNext){
          //push everything but the left-most node to the stack
          // we'll call the cb with the left-most as the argument after this block
          while(current.left != null){
            stack.push(current);
            current = current.left;
          }
        }

        cb(current.value);

        if(current.right != null){
          current = current.right;

          // once we've gone right once, we need to start going left again
          goLeftNext = true;
        }
        else{
          // if we can't go right then we need to pop off the parent node
          // so we can process it and then go to it's right node
          current = stack.pop();
          goLeftNext = false;
        }
      }
    }
  }
}
