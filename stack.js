function StackLL(){
    this.list = new LinkedList();

    this.push = function(item) {
      // Dodajemo argument sa prednje strane povezane liste
      // zato što je ga brže ukloniti iz povezane liste na ovaj način
      this.list.addFirst(item);
      }

    this.pop = function() {
      // Provjeravamo da li je povezana lista prazna
      if(this.list.count === 0) {
        throw new Error("The stack is empty.");
      }

      // Skladištimo referencu čvora prije brisanja
      // da bi smo mogli vratiti njegovu vrijednost
      let node = this.list.head;
    
      this.list.removeFirst();

      return node.value;
    }
  
    this.peek = function() {
      if(this.list.count === 0) {
        throw new Error("The stack is empty.");
      }
      
      // Ovdje samo vraćamo vrijednost bez brisanja
      return this.list.head.value;
    }

    this.count = function() {
      return this.list.count;
      }
  } 

  function StackArr() {
    this.items = [];

    this.push = function(item) {
      this.items[this.items.length] = item;
      }

    this.pop = function() { 
      if(this.items.length === 0) {
        throw new Error("The stack is empty");
    } 

    let value = this.items[this.items.length - 1];

    if(typeof(value) === "object") {
      
      if(Number.prototype.isPrototypeOf(value) || 
          String.prototype.isPrototypeOf(value) || 
                Boolean.prototype.isPrototypeOf(value) || 
                Symbol.prototype.isPrototypeOf(value)) {
        
        // Deep copy
        value = JSON.parse(JSON.stringify(value));
            }else{
              
        // Shallow copy
        value = Object.assign({}, value);
      }
    }
    
    delete this.items[this.items.length - 1];
    --this.items.length;
    return value;
      }

    this.peek = function() {
      return this.items[this.items.length - 1];
      }
  }