function Queue() {
      this.items = [];
      this.arrayLength = 0;
      this.size = 0;
      this.head = 0;
      this.tail = -1;

      this.enqueue = function(item) {
    
        // We check if the array needs to grow
        if(this.size === this.arrayLength) {
            // We declare a new array and initialize it's slots
            this.arrayLength = (this.size === 0) ? 8 : (this.size * 2);
            let newArray = [];
            for(let i = 0; i < this.arrayLength; i++) {
              newArray[i] = undefined;
            }

          if(this.size > 0) {
            let targetIndex = 0;

            // If we wrapped...
            if(this.tail < this.head) {
                // Copy items[head]..items[end]
              for(let i = this.head; i < this.arrayLength; i++) {
                  newArray[targetIndex] = this.items[i];
                  ++targetIndex;
                }

                // Copy items[0]..items[tail]
                for(let i = 0; i <= this.tail; i++) {
                  newArray[targetIndex] = this.items[i];
                  ++targetIndex;
                }
            }
          }
      }
    }

    this.dequeue = function() {
      let value = this.items[0];

      if(typeof(value) === "object") {  
          if(Number.prototype.isPrototypeOf(value) || 
          String.prototype.isPrototypeOf(value) || 
          Boolean.prototype.isPrototypeOf(value) || 
          Symbol.prototype.isPrototypeOf(value)) {
        
              // Deep copy
              value = JSON.parse(JSON.stringify(value));
          } else {
              // Shallow copy
              value = Object.assign({}, value);
         }
     }
    
      delete this.items[0];
      --this.items.length;
    
      return value;
    } 
}