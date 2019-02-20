# some_logical_assessment
collection of some logical assessment



1) Design a micro service that accepts two words(beginWord and endWord), and a
dictionary&#39;s word list to find all shortest transformation sequence(s)
from beginWord to endWord, such that:
Only one letter can be changed at a time
Each transformed word must exist in the word list. Note that beginWord is not a
transformed word.
Example 1:
Input:
beginWord = &quot;hit&quot;,
endWord = &quot;cog&quot;,
wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]
Output:
[
  [&quot;hit&quot;,&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;cog&quot;],
  [&quot;hit&quot;,&quot;hot&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]
]
Example 2:
Input:
beginWord = &quot;hit&quot;
endWord = &quot;cog&quot;
wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]
Output: []
Explanation: The endWord &quot;cog&quot; is not in wordList, therefore no
possible transformation.

2) Develop a micro service that take ’n’ points on a 2D plane as input,
and finds the maximum number of points that lie on the same straight
line.
Example 1:
Input: [[1,1],[2,2],[3,3]]
Output: 3
Explanation:
^
|
|        o

|     o
|  o  
+-------------&gt;
0  1  2  3 4
The solution should follow the structure below.
/**
 * Definition for a InputPoint.
 * class Point {
 *     int x;
 *     int y;
 *     Point() { x = 0; y = 0; }
 *     Point(int a, int b) { x = a; y = b; }
 * }
 */
class Solution {
    public int findSolution(InputPoint[] points) {
        // logic to be added here
    }
}
