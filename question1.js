// can't use ES6 right now, will set up babel later

function countCharDifference(a, b) {
  // this function only works if a.length === b.length
  // please report if the requirement is different
  var count = 0;
  for(var i = 0; i < a.length; i++) {
    if (a.charAt(i) !== b.charAt(i)) count++;
  }

  return count;
}

function findTransformableWords(testedWord, wordList) {
  var a = wordList.filter(function (loopedWord) {
    return countCharDifference(testedWord, loopedWord) === 1;
  });
  return a;
}

// recursively trace the path from destination (endWord)
function tracePath(result, builtPath, tracedWord, currentNode) {
  if(tracedWord[currentNode].distance <= 0) return;
  var prevNodes = tracedWord[currentNode].prevNodes;
  // track possibilities if theres more than 1
  for(var i = 1; i < prevNodes.length; i++) { // iterate from index = 1
    const newPath = [...builtPath];
    newPath.unshift(prevNodes[i]);
    result.push(newPath);
    tracePath(result, newPath, tracedWord, prevNodes[i]);
  }
  // push prevNodes[0] last, to avoid affecting the remaining path
  builtPath.unshift(prevNodes[0]);
  tracePath(result, builtPath, tracedWord, prevNodes[0]);
}

// Main function for Question #1
function transform(beginWord, endWord, wordList) {
  // I'll solve this with dijkstra, hope it's not too much :)
  var distance = 0;
  var tracedWord = {
    [beginWord]: {
      distance: distance,
      prevNodes: [],
    },
  };
  var endWordReached = false;
  // define the loop limit (at worst, it won't exceed the wordList's length)
  while(!endWordReached && distance <= wordList.length) {
    distance++;
    Object.keys(tracedWord).forEach(function(currentNode) { // TODO change this to ES6
      var transformableWords = findTransformableWords(currentNode, wordList);
      transformableWords.forEach(function(nextNode) {
        // if the nextWord already traced, look at its distance
        if(!tracedWord[nextNode] || tracedWord[nextNode].distance > distance ) {
          tracedWord[nextNode] = {
            distance: distance,
            prevNodes: [ currentNode ],
          };
        } else if(tracedWord[nextNode].distance === distance) {
          tracedWord[nextNode].prevNodes.push(currentNode);
        }
        if(nextNode === endWord) endWordReached = true;
      });
    });
  };
  var result = []
  if(endWordReached) {
    var initialBuiltPath = [endWord]
    result.push(initialBuiltPath);
    tracePath(result, initialBuiltPath, tracedWord, endWord);
  }
  return result;
}

// log the output
// TODO make it as a unit test
console.log(transform('hit', 'cog', ['hot','dot','dog','lot','log','cog']));
console.log(transform('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']));
