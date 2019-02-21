function findTangent(node1, node2) {
  // 1/0 will be Infinity and 0/0 will be NaN, otherwise will be double
  return (node2[1] - node1[1]) / (node2[0] - node1[0]);
}

function findYIntercept(x, y, tangent) {
  /*  Using linear equation
    since a simple slope can't determine whether the line is parallel or not

    the equation for every linear line is y = ax + b;
    where (x,y) = the coördinates, a = slope, b = y-intercept
    for lines do become straight-aligned, they must have the same a and b

    y = ax + b; then b = y - ax;
  */
 return y - tangent * x;
}

function pushNodes(targetArray, node1Key, node2Key) {
  // prevent duplicate node to be pushed
  if(targetArray.indexOf(node1Key) === -1) targetArray.push(node1Key);
  if(targetArray.indexOf(node2Key) === -1) targetArray.push(node2Key);
}
function saveOccurance(
  nodesWithSameTangent,
  duplicates,
  node1,
  node2,
  tangentResult,
) {
  // Infinity result means the 2 nodes are connected vertically
  // NaN result means it's a duplicate node
  var node1Key = `${node1[0]},${node1[1]}`;
  var node2Key = `${node2[0]},${node2[1]}`;
  if(tangentResult === NaN) {
    // increment duplicates[node1]. set to 1 if undefined
    duplicates[node1Key] = duplicates[node1Key]
      ? duplicates[node1Key] + 1
      : 1;
    return; // no need to set anything else
  }
  var yIntercept = (tangentResult === Infinity)
    ? node1[0] // treat yIntercept as xIntercept instead
    : findYIntercept(node1[0], node1[1], tangentResult);

  // initialize undefined values, make sure everything's ready
  if(!nodesWithSameTangent[tangentResult]) {
    nodesWithSameTangent[tangentResult] = { [yIntercept]: [] };
  } else if(!nodesWithSameTangent[tangentResult][yIntercept]) {
    nodesWithSameTangent[tangentResult][yIntercept] = [];
  }

  // save nodesWithSameTangent
  // push with nodeKeys, not the actual points, for easy-compare
  pushNodes(nodesWithSameTangent[tangentResult][yIntercept], node1Key, node2Key);
}
// Main function for Question #2
function countMaxNodesInStraightLine(arrayOfNodes) {
  var nodesAmount = arrayOfNodes.length;
  if(nodesAmount < 3) return nodesAmount; // no need to count
  var nodesWithSameTangent = {};
  /* the structure will look like this
  nodesWithSameTangent = {
    [tangentResult]: {
      [yIntercept]: List of found nodes, nodes will stored in string
    }
  };

  exapmle
  nodesWithSameTangent = {
    1: {
      2: ['1,1', '2,2', '3,3'],
      45: ['1,1', '2,2', '3,3'],
    },
    3.141528: {
      10: ['1,1', '2,2', '3,3'],
    },
    Infinity: {
      10: ['1,1', '2,2', '3,3'],
    }
  };

  tangentResult will store every lines from nodes that have the same slope
  yIntercept will differ between 2 pair of nodes has the same tangent,
    but is not aligned because they're parallel each other
  */

  var duplicates = {};
  /*  store how much duplicate for each point
      will be structured like this:
        duplicates['1,1']: 1  -> means there are 2 nodes of (1,1)
        duplicates['1,1']: 3  -> means there are 4 nodes of (1,1)
  */

  for(var x = 0; x < nodesAmount; x++) {
    for( var y = x + 1; y < nodesAmount; y++) {
      var node1 = arrayOfNodes[x], node2 = arrayOfNodes[y];
      var tangentResult = findTangent(node1, node2);
      // save occurence
      saveOccurance(nodesWithSameTangent, duplicates, node1, node2, tangentResult);
    }
  }
  return Object.keys(nodesWithSameTangent)
    .reduce(function(maxOccurance, tangent) {
      var currentTangentValue = nodesWithSameTangent[tangent];
      return (maxOccurance < currentTangentValue)
        ? currentTangentValue
        : maxOccurance;
    }, 0);
}

// TODO make this as unit test
console.log(countMaxNodesInStraightLine([[1, 1], [2, 2], [3, 3]]));
// expect 3
