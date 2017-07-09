console.log('begin ======================');

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

//binary heap data structure
//and node has children X * 2 and X * 2 + 1
function Heap () {
  //internally organized as an array
  this.array = [null]// start array at 1
  
  //swap the values at two positions
  this.swap = function (a, b) {
      var temp = this.array[a];
      this.array[a] = this.array[b];
      this.array[b] = temp;
  }

  //process position 1 based
  this.processRemove = function (pos) {
    //console.log('processing: ' + this.array[pos]);
    //break if at end
    if (pos > this.array.length - 1) {
      return;
    }

    var current = this.array[pos];

    //x times 2 and x times 2 + 1
    var childIndex1 = (pos * 2);
    var childIndex2 = (pos * 2) + 1;

    //difference between me and my children
    //will be positive if I am larger than you
    var c1 = { diff: current - (this.array[childIndex1] || Number.POSITIVE_INFINITY), pos: childIndex1 };
    var c2 = { diff: current - (this.array[childIndex2] || Number.POSITIVE_INFINITY), pos: childIndex2 }; 
    var valid = [c1,c2].filter((n) => { return n && n.diff > 0; });
    //console.log(valid);
    var smallestValid = valid.sort(function (a, b) { return b.diff - a.diff; })[0];
    //console.log(smallestValid);

    if (smallestValid && smallestValid.diff > 0) {
      this.swap(pos, smallestValid.pos);
      this.processRemove(smallestValid.pos);
      return;
    }

    return;

  }
  this.bubbleUp = function  (pos) {
    //quit if at the top
    if (pos == 1) {
      return;
    }
    var parentIndex = Math.floor(pos/2);
    if (this.array[pos] < this.array[parentIndex]) {
      //swap
      this.swap(pos, parentIndex);
      //bubble up more
      this.bubbleUp(parentIndex);
    }
    return;
  }
  this.push = function  (value) {
    //put value on back
    this.array.push(value)
    //bubble up starting at last position
    this.bubbleUp(this.array.length - 1)
  }

  this.pop = function () {
    // there are no items!
    if (this.array.length == 1) {
      return null;
    }
    //get top
    var result = this.array.splice(1, 1)[0];
    //ensure heap is valid
    //move back to front
    var back = this.array.pop();
    this.array.insert(1, back)
    this.processRemove(1);
    //return result
    return result;
  }
  this.toString = function () {
    console.log(this.array);
  }

}

//try it out!
var heapTest = new Heap();
for(var i = 1; i < 100; i ++) {
  heapTest.push(i);
}
for(var i = 1; i < 100; i ++) {
  console.log(heapTest.pop());
}
