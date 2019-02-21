function findTangent(node1, node2) {
  return (node2[1] - node1[1]) / (node2[0] - node1[0]);
}

// Main function for Question #2
function countMaxNodesInStraightLine(arrayOfNodes) {
  var tangentOccurenceCounts = {};
  for(var x = 0; x < arrayOfNodes.length; x++) {
    for( var y = x + 1; y < arrayOfNodes.length; y++) {
      var tangentResult = findTangent(arrayOfNodes[x], arrayOfNodes[y]);
      if(tangentOccurenceCounts['' + tangentResult]) {
        tangentOccurenceCounts['' + tangentResult]++;
      } else {
        tangentOccurenceCounts['' + tangentResult] = 1;
      }
    }
  }
  return Object.keys(tangentOccurenceCounts)
    .reduce(function(maxOccurance, tangent) {
      var currentTangentValue = tangentOccurenceCounts[tangent];
      return (maxOccurance < currentTangentValue)
        ? currentTangentValue
        : maxOccurance;
    }, 0);
}

// TODO make this as unit test
console.log(countMaxNodesInStraightLine([[1, 1], [2, 2], [3, 3]]));
// expect 3
