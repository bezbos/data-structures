let input = "";

while(!Object.is("quit", input.toLowerCase())){
  console.log("> ");
  input = prompt("Next string.");

  console.log("Additive: ", additiveHash(input));
  console.log("Folding: ", foldingHash(input));
  console.log("DJB2: ", djb2(input));
}

// Sums the characters in the string
// Terrible hashing function!
function additiveHash(input){
  let currentHashValue = 0;

  for(let c of input){
    currentHashValue += c.charCodeAt(0);
  }

  return currentHashValue;
}

// Hashing function first reported by Dan Bernstein
// http://www.cse.yorku.ca/~oz/hash.html
function djb2(input){
  let hash = 5381;

  for(let c of input){
    hash = ((hash << 5) + hash) + c.charCodeAt(0);
  }

  return hash;
}

function foldingHash(input){
  let hashValue = 0;

  let startIndex = 0;
  let currentFourBytes;

  do{
    currentFourBytes = getNextBytes(startIndex, input);
    hashValue += currentFourBytes;

    startIndex += 4;
  } while (currentFourBytes != 0);

  return hashValue;
}

// Gets the next found bytes of the string converted to an
// integer - If there are not enough characters, 0 is used.
function getNextBytes(startIndex, str){
  let currentFourBytes = 0;

  currentFourBytes += getByte(str, startIndex);
  currentFourBytes += getByte(str, startIndex + 1) << 8;
  currentFourBytes += getByte(str, startIndex + 2) << 16;
  currentFourBytes += getByte(str, startIndex + 3) << 32;

  return currentFourBytes;
}

function getByte(str, index){
  if(index < str.length){
    return str[index].charCodeAt(0);
  }

  return 0;
}
