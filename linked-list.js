function Node(value, next) {
    this.value = value;
    this.next = next;
  }

  function LinkedList() {
    this.head = null;
    this.tail = null;
      this.count = 0;

      this.__typeCheck__ = function (val) {
        
          // We check if val is of type object?
      // NOTE: We do this because we don't want a value of a node to be another node
      if(typeof(val) === "object") {
        
        // Then we check if it's not a Node?
        if(!(val instanceof Node)) {

          // If it's not a Node, we create a new Node with the value of val.
          val = new Node(val, null);
        }
      }
      else {
      
        // If val is not a type of object, we create a new Node with the value of val.
        val = new Node(val, null);
      }

      return val;
      }

    this.addFirst = function (val) {
  
      val = this.__typeCheck__(val);

          // Save off the head node so we don't lose it.
      let temp = this.head;
    
          // Set head reference to the new node.
          this.head = val;

      // Point head to the new node.
      this.head.next = temp;
        
          // Increment the number of linked list elements.
          ++this.count;

          if(this.count === 1) {
            
              //If the linked list was empty, head and tail shound both point to the new node.
              this.tail = this.head;
          }

    }

    this.addLast = function (val) {

          val = this.__typeCheck__(val);

          if(this.count === 0) {
              this.head = val;
          }
          else {
              this.tail.next = val;
          }

          this.tail = val;

          ++this.count;
      }

      this.removeLast = function() {
      
      // We make sure the linked list isn't empty.
      if(this.count !== 0) {
        // In case we have only one element, we set both head and tail to null.
        if(this.count === 1) {
          this.head = this.tail = null;
        }
        else {
          // We iterate over the nodes until we reach the second to last node.
          let current = this.head;
          while(current.next !== this.tail) {
            current = current.next;
          }
          
          // We set the captured node's next property to null
          // then we set it as the tail. The old last node will be GC.
          current.next = null;
          this.tail = current;
        }

        --this.count;
      }
      }

      this.removeFirst = function() {
      
      // We make sure the linked list isn't empty.
      if(this.count !== 0) {
        // In case we have only one element, we set both head and tail to null.
        if(this.count === 1) {
          this.head = this.tail = null;
        }
        else {
          // We set the head as the next element of the old head.
          this.head = this.head.next;         
        }

        --this.count;
      }
      }
  }