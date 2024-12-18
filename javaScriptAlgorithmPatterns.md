# JavaScript Algorithm Pattern Challenges
A comprehensive collection of JavaScript algorithm pattern questions and solutions with detailed explanations.

## Table of Contents
- [1. Two Pointers Pattern](#1-two-pointers-pattern)
- [2. Fast and Slow Pointers](#2-fast-and-slow-pointers)
- [3. Sliding Window](#3-sliding-window)
- [4. Merge Intervals](#4-merge-intervals)
- [5. In-Place Linked List Manipulation](#5-in-place-linked-list-manipulation)
- [6. Two Heaps](#6-two-heaps)
- [7. K-way Merge](#7-k-way-merge)
- [8. Top K Elements](#8-top-k-elements)
- [9. Modified Binary Search](#9-modified-binary-search)
- [10. Subsets](#10-subsets)
- [11. Greedy Techniques](#11-greedy-techniques)
- [12. Backtracking](#12-backtracking)
- [13. Dynamic Programming](#13-dynamic-programming)
- [14. Cyclic Sort](#14-cyclic-sort)
- [15. Topological Sort](#15-topological-sort)
- [16. Matrices](#16-matrices)
- [17. Stacks](#17-stacks)
- [18. Graphs](#18-graphs)
- [19. Tree Depth-First Search](#19-tree-depth-first-search)
- [20. Tree Breadth-First Search](#20-tree-breadth-first-search)
- [21. Trie](#21-trie)
- [22. Hash Maps](#22-hash-maps)
- [23. Knowing What to Track](#23-knowing-what-to-track)
- [24. Union Find](#24-union-find)
- [25. Custom Data Structures](#25-custom-data-structures)
- [26. Bitwise Manipulation](#26-bitwise-manipulation)

## 1. Two Pointers Pattern
### Question:
Write a function that finds a pair of numbers in a sorted array that sum up to a target value.
Example:
```javascript
findPairWithSum([1, 2, 3, 4, 5], 7) === [2, 4] // numbers 3 and 4
```

<details>
<summary>Solution</summary>

```javascript
function findPairWithSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const currentSum = arr[left] + arr[right];
        if (currentSum === target) {
            return [left, right];
        }
        if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [-1, -1];
}
```

Key points:
- Time Complexity: O(n)
- Space Complexity: O(1)
- Works on sorted arrays only
- Handles edge cases (no solution, empty array)
</details>

## More "Two Pointers" Pattern Coding Problems

- Valid Palindrome
- 3Sum
- Remove Nth Node from End of List
- Sort Colors
- Reverse Words in a String
- Valid Word Abbreviation
- Strobogrammatic Number
- Minimum Number of Moves to Make Palindrome
- Next Palindrome Using Same Digits
- Lowest Common Ancestor of a Binary Tree III
- Valid Palindrome II

## 2. Fast and Slow Pointers
### Question:
Detect if a linked list has a cycle in it using Floyd's Cycle Finding Algorithm.
Example:
```javascript
const list = new LinkedList([1, 2, 3, 4]);
list.next.next.next = list.next; // Creates cycle
hasCycle(list) === true
```

<details>
<summary>Solution</summary>

```javascript
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}
```

Key points:
- Time Complexity: O(n)
- Space Complexity: O(1)
- Floyd's Tortoise and Hare algorithm
- Handles edge cases (empty list, single node)
</details>

## More "Fast and Slow Pointers" Pattern Coding Problems

- Happy Number
- Linked List Cycle
- Middle of the Linked List
- Circular Array Loop
- Find the Duplicate Number
- Palindrome Linked List
- Maximum Twin Sum of a Linked List
- Split a Circular Linked List

## 3. Sliding Window
### Question:
Find the maximum sum of any contiguous subarray of size k.
Example:
```javascript
maxSubArraySum([1, 4, 2, 10, 2, 3, 1, 0, 20], 4) === 24
```

<details>
<summary>Solution</summary>

```javascript
function maxSubArraySum(arr, k) {
    let maxSum = 0;
    let windowSum = 0;
    
    // First window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
```

Key points:
- Time Complexity: O(n)
- Space Complexity: O(1)
- Efficient sliding technique
- Handles arrays shorter than k
</details>

## More "Sliding Window" Pattern Coding Problems

- Repeated DNA Sequences
- Sliding Window Maximum
- Minimum Window Subsequence
- Longest Repeating Character Replacement
- Minimum Window Substring
- Longest Substring without Repeating Characters
- Minimum Size Subarray Sum
- Maximum Average Subarray I
- Diet Plan Performance
- Best Time to Buy and Sell Stock

## 4. Merge Intervals
### Question:
Given an array of intervals, merge all overlapping intervals.
Example:
```javascript
mergeIntervals([[1,3], [2,6], [8,10], [15,18]]) === [[1,6], [8,10], [15,18]]
```

<details>
<summary>Solution</summary>

```javascript
function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = result[result.length - 1];
        
        if (current[0] <= lastMerged[1]) {
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            result.push(current);
        }
    }
    return result;
}
```

Key points:
- Time Complexity: O(n log n)
- Space Complexity: O(n)
- Sort first approach
- Handles overlapping and non-overlapping cases
</details>

## More "Intervals" Pattern Coding Problems

- Merge Intervals
- Insert Interval
- Interval List Intersections
- Employee Free Time
- Task Scheduler
- Meeting Rooms II

## 5. In-Place Linked List Manipulation
### Question:
Reverse a linked list in-place.
Example:
```javascript
reverseLinkedList(1->2->3->4->null) === 4->3->2->1->null
```

<details>
<summary>Solution</summary>

```javascript
function reverseLinkedList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}
```

Key points:
- Time Complexity: O(n)
- Space Complexity: O(1)
- In-place reversal technique
- Handles empty list and single node
</details>

## More "Linked List" Pattern Coding Problems

- Reverse Linked List
- Reverse Nodes in k-Group
- Reverse Linked List II
- Reorder List
- Swapping Nodes in a Linked List
- Reverse Nodes in Even Length Groups
- Remove Duplicates from Sorted List
- Remove Linked List Elements
- Split Linked List in Parts
- Swap Nodes in Pairs

## 6. Two Heaps
### Question:
Design a data structure that can find the median of a stream of numbers.
Example:
```javascript
const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
medianFinder.findMedian() === 1.5
medianFinder.addNum(3);
medianFinder.findMedian() === 2
```

<details>
<summary>Solution</summary>

```javascript
class MedianFinder {
    constructor() {
        this.maxHeap = []; // Left half
        this.minHeap = []; // Right half
    }
    
    addNum(num) {
        // Add to max heap first
        this.maxHeap.push(-num);
        this.maxHeap.sort((a, b) => a - b);
        
        // Balance heaps
        if (this.maxHeap.length > this.minHeap.length + 1) {
            this.minHeap.push(-this.maxHeap.shift());
            this.minHeap.sort((a, b) => a - b);
        }
        
        // Ensure max heap has smaller elements
        if (this.maxHeap.length && this.minHeap.length && 
            -this.maxHeap[0] > this.minHeap[0]) {
            const maxVal = -this.maxHeap.shift();
            const minVal = this.minHeap.shift();
            this.maxHeap.push(-minVal);
            this.minHeap.push(maxVal);
        }
    }
    
    findMedian() {
        if (this.maxHeap.length > this.minHeap.length) {
            return -this.maxHeap[0];
        }
        return ((-this.maxHeap[0] + this.minHeap[0]) / 2);
    }
}
```

Key points:
- Time Complexity: O(n log n) for addNum, O(1) for findMedian
- Space Complexity: O(n)
- Uses two heaps to maintain sorted halves
- Handles both even and odd number of elements
</details>

## More "Heaps" Pattern Coding Problems

- IPO
- Find Median from Data Stream
- Sliding Window Median
- Schedule Tasks on Minimum Machines
- Meeting Rooms III
- Largest Number After Digit Swaps by Parity
- Find Right Interval

## 7. K-way Merge
### Question:
Merge k sorted linked lists into one sorted linked list.
Example:
```javascript
const lists = [
    [1,4,5],
    [1,3,4],
    [2,6]
];
mergeKLists(lists) === [1,1,2,3,4,4,5,6]
```

<details>
<summary>Solution</summary>

```javascript
function mergeKLists(lists) {
    if (!lists.length) return null;
    
    while (lists.length > 1) {
        const mergedLists = [];
        
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = i + 1 < lists.length ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }
        
        lists = mergedLists;
    }
    
    return lists[0];
}

function mergeTwoLists(l1, l2) {
    if (!l1) return l2;
    if (!l2) return l1;
    
    if (l1.val <= l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}
```

Key points:
- Time Complexity: O(N log k) where N is total nodes, k is number of lists
- Space Complexity: O(1)
- Divide and conquer approach
- Handles empty lists and single list cases
</details>

## More "K-way Merge" Pattern Coding Problems

- Merge Sorted Array
- Kth Smallest Number in M Sorted Lists
- Find K Pairs with Smallest Sums
- Merge K Sorted Lists
- Kth Smallest Element in a Sorted Matrix

## 8. Top K Elements
### Question:
Find the k most frequent elements in an array.
Example:
```javascript
topKFrequent([1,1,1,2,2,3], 2) === [1,2]
```

<details>
<summary>Solution</summary>

```javascript
function topKFrequent(nums, k) {
    // Count frequency
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Convert to array and sort by frequency
    return Array.from(freqMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(entry => entry[0]);
}

// Alternative bucket sort solution for O(n) time complexity
function topKFrequentLinear(nums, k) {
    const freqMap = new Map();
    const bucket = [];
    const result = [];
    
    // Count frequency
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    // Put numbers in frequency buckets
    for (const [num, freq] of freqMap) {
        bucket[freq] = (bucket[freq] || new Set()).add(num);
    }
    
    // Collect top k elements
    for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
        if (bucket[i]) {
            result.push(...bucket[i]);
        }
    }
    
    return result.slice(0, k);
}
```

Key points:
- Time Complexity: O(n log n) for first solution, O(n) for bucket sort
- Space Complexity: O(n)
- Provides two approaches: sorting and bucket sort
- Handles duplicates and edge cases
</details>

## More "Top K Elements" Pattern Coding Problems

- Kth Largest Element in a Stream
- Reorganize String
- K Closest Points to Origin
- Top K Frequent Elements
- Kth Largest Element in an Array
- Third Maximum Number
- Find Subsequence of Length K with the Largest Sum
- Minimum Cost to Hire K Workers

## 9. Modified Binary Search
### Question:
Find an element in a rotated sorted array.
Example:
```javascript
search([4,5,6,7,0,1,2], 0) === 4
```

<details>
<summary>Solution</summary>

```javascript
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }
        
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}
```

Key points:
- Time Complexity: O(log n)
- Space Complexity: O(1)
- Handles rotated arrays
- Works with duplicate elements
</details>

## More "Modified Binary Search" Pattern Coding Problems

- Binary Search
- Search in Rotated Sorted Array
- First Bad Version
- Random Pick with Weight
- Find K Closest Elements
- Single Element in a Sorted Array
- Maximum Value at a Given Index in a Bounded Array
- The K Weakest Rows in a Matrix
- Search in Rotated Sorted Array II

## 10. Subsets
### Question:
Generate all possible subsets of a set of distinct integers.
Example:
```javascript
subsets([1,2,3]) === [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
```

<details>
<summary>Solution</summary>

```javascript
function subsets(nums) {
    const result = [[]];
    
    for (const num of nums) {
        const currentLength = result.length;
        for (let i = 0; i < currentLength; i++) {
            result.push([...result[i], num]);
        }
    }
    
    return result;
}

// Alternative backtracking solution
function subsetsBacktrack(nums) {
    const result = [];
    
    function backtrack(start, current) {
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}
```

Key points:
- Time Complexity: O(2^n)
- Space Complexity: O(2^n)
- Two approaches: iterative and backtracking
- Handles empty set and single element sets
</details>

## More "Subsets" Pattern Coding Problems

- Subsets
- Permutations
- Letter Combinations of a Phone Number
- Generate Parentheses
- Find K-Sum Subsets

## 11. Greedy Techniques
### Question:
Given an array of intervals of meetings, find the minimum number of meeting rooms required.
Example:
```javascript
minMeetingRooms([[0,30],[5,10],[15,20]]) === 2
```

<details>
<summary>Solution</summary>

```javascript
function minMeetingRooms(intervals) {
    const starts = intervals.map(interval => interval[0]).sort((a, b) => a - b);
    const ends = intervals.map(interval => interval[1]).sort((a, b) => a - b);
    
    let rooms = 0;
    let maxRooms = 0;
    let s = 0;
    let e = 0;
    
    while (s < starts.length) {
        if (starts[s] < ends[e]) {
            rooms++;
            s++;
        } else {
            rooms--;
            e++;
        }
        maxRooms = Math.max(maxRooms, rooms);
    }
    
    return maxRooms;
}
```

Key points:
- Time Complexity: O(n log n)
- Space Complexity: O(n)
- Greedy approach using sorted arrays
- Handles overlapping intervals efficiently
</details>

## More "Greedy" Pattern Coding Problems

- Jump Game
- Boats to Save People
- Gas Station
- Two City Scheduling
- Minimum Number of Refueling Stops
- Largest Palindromic Number
- Assign Cookies
- Rearranging Fruits
- Number of Steps to Reduce a Binary Number to One
- Jump Game II

## 12. Backtracking
### Question:
Generate all valid combinations of n pairs of parentheses.
Example:
```javascript
generateParenthesis(3) === ["((()))","(()())","(())()","()(())","()()()"]
```

<details>
<summary>Solution</summary>

```javascript
function generateParenthesis(n) {
    const result = [];
    
    function backtrack(current, open, close) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}
```

Key points:
- Time Complexity: O(4^n / √n)
- Space Complexity: O(n)
- Uses backtracking with validity checks
- Generates only valid combinations
</details>

## More "Backtracking/DFS" Pattern Coding Problems

- N-Queens
- Word Search
- House Robber III
- Restore IP Addresses
- Flood Fill
- Minimum Moves to Spread Stones Over Grid
- Binary Tree Paths
- Binary Watch
- Optimal Account Balancing
- Sudoku Solver
- Matchsticks to Square

## 13. Dynamic Programming
### Question:
Find the length of the longest increasing subsequence in an array.
Example:
```javascript
lengthOfLIS([10,9,2,5,3,7,101,18]) === 4 // [2,3,7,101]
```

<details>
<summary>Solution</summary>

```javascript
function lengthOfLIS(nums) {
    if (!nums.length) return 0;
    
    const dp = new Array(nums.length).fill(1);
    let maxLength = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}

// Alternative O(n log n) solution using binary search
function lengthOfLISOptimal(nums) {
    const tails = [];
    
    for (const num of nums) {
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        tails[left] = num;
        if (left === tails.length) {
            tails.push(num);
        }
    }
    
    return tails.length;
}
```

Key points:
- Time Complexity: O(n²) for DP solution, O(n log n) for optimal solution
- Space Complexity: O(n)
- Two approaches: classic DP and binary search
- Handles empty array and arrays with duplicates
</details>

## More "Dynamic Programming" Pattern Coding Problems

- 0/1 Knapsack
- Coin Change
- N-th Tribonacci Number
- Partition Equal Subset Sum
- Counting Bits
- 01 Matrix
- House Robber II
- Maximum Product Subarray
- Combination Sum
- Word Break
- Palindromic Substrings
- Longest Common Subsequence
- Word Break II
- Decode Ways
- Count the Number of Good Subsequences
- Climbing Stairs

## 14. Cyclic Sort
### Question:
Given an array containing n numbers where each number is between 1 and n, find the missing number.
Example:
```javascript
findMissingNumber([3, 1, 4, 5, 2, 7, 8, 6, 10]) === 9
```

<details>
<summary>Solution</summary>

```javascript
function findMissingNumber(nums) {
    let i = 0;
    
    // Place each number in its correct position
    while (i < nums.length) {
        const correctPos = nums[i] - 1;
        if (correctPos < nums.length && nums[i] !== nums[correctPos]) {
            [nums[i], nums[correctPos]] = [nums[correctPos], nums[i]];
        } else {
            i++;
        }
    }
    
    // Find the missing number
    for (i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    
    return nums.length + 1;
}
```

Key points:
- Time Complexity: O(n)
- Space Complexity: O(1)
- In-place sorting technique
- Handles numbers from 1 to n
</details>

## More "Cyclic Sort" Pattern Coding Problems
- Introduction to Cyclic Sort
- Missing Number
- First Missing Positive
- Find the Corrupt Pair
- Find the First K Missing Positive Numbers

## 15. Topological Sort
### Question:
Given a list of tasks and their dependencies, find a valid order to complete all tasks.
Example:
```javascript
const tasks = 4;
const prerequisites = [[1,0],[2,1],[3,2]];
findOrder(tasks, prerequisites) === [0,1,2,3]
```

<details>
<summary>Solution</summary>

```javascript
function findOrder(numTasks, prerequisites) {
    // Build adjacency list
    const graph = Array.from({ length: numTasks }, () => []);
    const inDegree = new Array(numTasks).fill(0);
    
    for (const [task, prereq] of prerequisites) {
        graph[prereq].push(task);
        inDegree[task]++;
    }
    
    // Find all sources (tasks with no prerequisites)
    const queue = [];
    for (let i = 0; i < numTasks; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    const result = [];
    
    while (queue.length) {
        const task = queue.shift();
        result.push(task);
        
        for (const nextTask of graph[task]) {
            inDegree[nextTask]--;
            if (inDegree[nextTask] === 0) {
                queue.push(nextTask);
            }
        }
    }
    
    return result.length === numTasks ? result : [];
}
```

Key points:
- Time Complexity: O(V + E)
- Space Complexity: O(V + E)
- Uses Kahn's algorithm
- Detects cycles in dependencies
</details>

## More "Topological Sort" Pattern Coding Problems
- Compilation Order
- Alien Dictionary
- Verifying an Alien Dictionary
- Course Schedule II
- Course Schedule
- Build a Matrix with Conditions
- Longest Path With Different Adjacent Characters
- Find All Possible Recipes from Given Supplies

## 16. Matrices
### Question:
Rotate a matrix (2D array) 90 degrees clockwise in-place.
Example:
```javascript
const matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
rotateMatrix(matrix);
// matrix is now:
// [7,4,1],
// [8,5,2],
// [9,6,3]
```

<details>
<summary>Solution</summary>

```javascript
function rotateMatrix(matrix) {
    const n = matrix.length;
    
    // Transpose matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
    
    return matrix;
}

// Alternative solution with layers
function rotateMatrixLayers(matrix) {
    const n = matrix.length;
    
    for (let layer = 0; layer < Math.floor(n/2); layer++) {
        const first = layer;
        const last = n - 1 - layer;
        
        for (let i = first; i < last; i++) {
            const offset = i - first;
            
            // Save top
            const top = matrix[first][i];
            
            // Move left to top
            matrix[first][i] = matrix[last-offset][first];
            
            // Move bottom to left
            matrix[last-offset][first] = matrix[last][last-offset];
            
            // Move right to bottom
            matrix[last][last-offset] = matrix[i][last];
            
            // Move top to right
            matrix[i][last] = top;
        }
    }
    
    return matrix;
}
```

Key points:
- Time Complexity: O(n²)
- Space Complexity: O(1)
- Two approaches: transpose/reverse and layer-by-layer
- Handles square matrices of any size
</details>

## More "Matrix" Pattern Coding Problems
- Set Matrix Zeroes
- Rotate Image
- Spiral Matrix
- Where Will the Ball Fall
- Transpose Matrix
- Count Negative Numbers in a Sorted Matrix
- Minimum Time Takes to Reach Destination Without Drowning
- Smallest Rectangle Enclosing Black Pixels
- Island Perimeter

## 17. Stacks
### Question:
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
Example:
```javascript
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // returns -3
minStack.pop();
minStack.top();    // returns 0
minStack.getMin(); // returns -2
```

<details>
<summary>Solution</summary>

```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        
        if (!this.minStack.length || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    
    pop() {
        if (!this.stack.length) return null;
        
        const val = this.stack.pop();
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
        return val;
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
```

Key points:
- Time Complexity: O(1) for all operations
- Space Complexity: O(n)
- Uses auxiliary stack to track minimums
- Handles duplicate values correctly
</details>

## More "Stack" Pattern Coding Problems
- Basic Calculator
- Remove All Adjacent Duplicates In String
- Minimum Remove to Make Valid Parentheses
- Exclusive Time of Functions
- Flatten Nested List Iterator
- Implement Queue Using Stacks
- Daily Temperatures
- Decode String
- Minimum String Length After Removing Substrings
- Valid Parentheses

## 18. Graphs
### Question:
Implement a function to detect if there is a cycle in a directed graph.
Example:
```javascript
const graph = {
    vertices: 4,
    edges: [[0,1], [1,2], [2,3], [3,1]]
};
hasCycle(graph) === true
```

<details>
<summary>Solution</summary>

```javascript
function hasCycle(graph) {
    const visited = new Set();
    const recursionStack = new Set();
    const adjList = buildAdjList(graph);
    
    function dfs(vertex) {
        if (recursionStack.has(vertex)) return true;
        if (visited.has(vertex)) return false;
        
        visited.add(vertex);
        recursionStack.add(vertex);
        
        for (const neighbor of adjList[vertex]) {
            if (dfs(neighbor)) return true;
        }
        
        recursionStack.delete(vertex);
        return false;
    }
    
    for (let i = 0; i < graph.vertices; i++) {
        if (!visited.has(i) && dfs(i)) return true;
    }
    
    return false;
}

function buildAdjList(graph) {
    const adjList = Array.from({ length: graph.vertices }, () => []);
    for (const [from, to] of graph.edges) {
        adjList[from].push(to);
    }
    return adjList;
}
```

Key points:
- Time Complexity: O(V + E)
- Space Complexity: O(V)
- Uses DFS with recursion stack## 19. Tree Depth-First Search
### Question:
Given a binary tree and a target sum, find if there exists a path from root to leaf where the sum of node values equals the target.
Example:
```javascript
const tree = {
    val: 5,
    left: { val: 4, left: { val: 11, left: { val: 7 }, right: { val: 2 } } },
    right: { val: 8, right: { val: 4, right: { val: 1 } } }
};
hasPathSum(tree, 22) === true  // Path: 5->4->11->2
```

<details>
<summary>Solution</summary>

```javascript
function hasPathSum(root, targetSum) {
    if (!root) return false;
    
    // If leaf node, check if we've reached target
    if (!root.left && !root.right) {
        return targetSum === root.val;
    }
    
    // Recursively check left and right subtrees
    return hasPathSum(root.left, targetSum - root.val) ||
           hasPathSum(root.right, targetSum - root.val);
}

// Iterative solution using stack
function hasPathSumIterative(root, targetSum) {
    if (!root) return false;
    
    const stack = [[root, targetSum]];
    
    while (stack.length) {
        const [node, currentSum] = stack.pop();
        
        if (!node.left && !node.right && currentSum === node.val) {
            return true;
        }
        
        if (node.right) {
            stack.push([node.right, currentSum - node.val]);
        }
        if (node.left) {
            stack.push([node.left, currentSum - node.val]);
        }
    }
    
    return false;
}
```

Key points:
- Time Complexity: O(n)
- Space Complexity: O(h) where h is height of tree
- Both recursive and iterative approaches
- Handles edge cases (empty tree, single node)
</details>

## More "Graph" Pattern Coding Problems
- Network Delay Time
- Paths in Maze That Lead to Same Room
- Clone Graph
- Graph Valid Tree
- Bus Routes
- Reconstruct Itinerary
- Find the Town Judge
- Find Center of Star Graph

## 20. Tree Breadth-First Search
### Question:
Return the level order traversal of a binary tree nodes' values (i.e., from left to right, level by level).
Example:
```javascript
const tree = {
    val: 3,
    left: { val: 9 },
    right: { val: 20, left: { val: 15 }, right: { val: 7 } }
};
levelOrder(tree) === [[3], [9, 20], [15, 7]]
```

<details>
<summary>Solution</summary>

```javascript
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}

// Alternative using recursive approach
function levelOrderRecursive(root) {
    const result = [];
    
    function traverse(node, level) {
        if (!node) return;
        
        if (result.length === level) {
            result.push([]);
        }
        
        result[level].push(node.val);
        
        traverse(node.left, level + 1);
        traverse(node.right, level + 1);
    }
    
    traverse(root, 0);
    return result;
}
```

Key points:
- Time Complexity: O(n)
- Space Complexity: O(w) where w is max width of tree
- Queue-based approach for iterative solution
- Maintains level ordering
</details>

## 21. Trie
### Question:
Implement a trie (prefix tree) with insert, search, and startsWith methods.
Example:
```javascript
const trie = new Trie();
trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
```

<details>
<summary>Solution</summary>

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
    }
    
    search(word) {
        const node = this.traverse(word);
        return node !== null && node.isEndOfWord;
    }
    
    startsWith(prefix) {
        return this.traverse(prefix) !== null;
    }
    
    traverse(str) {
        let node = this.root;
        for (const char of str) {
            if (!node.children.has(char)) {
                return null;
            }
            node = node.children.get(char);
        }
        return node;
    }
}
```

Key points:
- Time Complexity: O(m) for all operations, where m is word length
- Space Complexity: O(ALPHABET_SIZE * m * n) for n words
- Efficient prefix searching
- Memory-efficient for common prefixes
</details>

## More "Tree DFS" Pattern Coding Problems
- Flatten Binary Tree to Linked List
- Diameter of Binary Tree
- Serialize and Deserialize Binary Tree
- Invert Binary Tree
- Binary Tree Maximum Path Sum
- Convert Sorted Array to Binary Search Tree
- Build Binary Tree from Preorder and Inorder Traversal
- Binary Tree Right Side View
- Lowest Common Ancestor of a Binary Tree
- Validate Binary Search Tree
- Nested List Weight Sum II
- Inorder Successor in BST
- Height of Binary Tree After Subtree Removal Queries
- Delete Nodes And Return Forest
- Maximum Depth of Binary Tree
- Kth Smallest Element in a BST

## More "Tree BFS" Pattern Coding Problems
- Binary Tree Level Order Traversal
- Binary Tree Zigzag Level Order Traversal
- Populating Next Right Pointers in Each Node
- Vertical Order Traversal of a Binary Tree
- Symmetric Tree
- Word Ladder
- Connect All Siblings of a Binary Tree

## More "Trie" Pattern Coding Problems
- Implement Trie (Prefix Tree)
- Search Suggestions System  
- Replace Words
- Design Add and Search Words Data Structure
- Word Search II
- Top K Frequent Words
- Longest Common Prefix
- Index Pairs of a String
- Lexicographical Numbers

## 22. Hash Maps
### Question:
Find all pairs of numbers in an array that sum to a target value.
Example:
```javascript
findPairs([1, 5, 3, 7, 9, 2, 6], 8) === [[1,7], [2,6], [3,5]]
```

<details>
<summary>Solution</summary>

```javascript
function findPairs(nums, target) {
    const pairs = [];
    const seen = new Map();
    
    for (const num of nums) {
        const complement = target - num;
        
        if (seen.has(complement)) {
            pairs.push([complement, num]);
            seen.delete(complement); // Avoid duplicates
        } else {
            seen.set(num, complement);
        }
    }
    
    return pairs.sort((a, b) => a[0] - b[0]);
}

// Alternative with Set for unique values
function findPairsWithSet(nums, target) {
    const pairs = new Set();
    const seen = new Set();
    
    for (const num of nums) {
        const complement = target - num;
        
        if (seen.has(complement)) {
            pairs.add(JSON.stringify([Math.min(num, complement), 
                                    Math.max(num, complement)]));
        }
        seen.add(num);
    }
    
    return Array.from(pairs).map(JSON.parse).sort((a, b) => a[0] - b[0]);
}
```

Key points:
- Time Complexity: O(n)
- Space Complexity: O(n)
- Handles duplicates
- Returns sorted results
</details>

## More "Hash Map" Pattern Coding Problems
- Design HashMap
- Fraction to Recurring Decimal
- Logger Rate Limiter
- Next Greater Element I
- Isomorphic Strings
- Find Duplicate File in System
- Dot Product of Two Sparse Vectors
- High Five
- Bulls and Cows
- Custom Sort String
- Number of Distinct Islands
- Number of Wonderful Substrings
- Total Appeal of a String
- Continuous Subarray Sum
- Unique Number of Occurrences
- Longest Palindrome

## 23. Knowing What to Track
### Question:
Find the longest substring without repeating characters.
Example:
```javascript
lengthOfLongestSubstring("abcabcbb") === 3 // "abc"
```

<details>
<summary>Solution</summary>

```javascript
function lengthOfLongestSubstring(s) {
    const lastSeen = new Map();
    let start = 0;
    let maxLength = 0;
    
    for (let end = 0; end < s.length; end++) {
        const char = s[end];
        
        if (lastSeen.has(char)) {
            // Move start pointer to position after last occurrence
            start = Math.max(start, lastSeen.get(char) + 1);
        }
        
        lastSeen.set(char, end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}

// Alternative using Set
function lengthOfLongestSubstringSet(s) {
    const seen = new Set();
    let start = 0;
    let maxLength = 0;
    
    for (let end = 0; end < s.length; end++) {
        while (seen.has(s[end])) {
            seen.delete(s[start]);
            start++;
        }
        seen.add(s[end]);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
}
```

Key points:
- Time Complexity: O(n)
- Space Complexity: O(min(m,n)) where m is alphabet size
- Uses sliding window with tracking
- Two approaches: Map and Set
</details>

## More "Knowing What to Track" Pattern Coding Problems
- Palindrome Permutation
- Valid Anagram
- Design Tic-Tac-Toe
- Group Anagrams
- Maximum Frequency Stack
- First Unique Character in a String
- Find All Anagrams in a String
- Longest Palindrome by Concatenating Two-Letter Words
- Rank Teams by Votes
- Pairs of Songs With Total Durations Divisible by 60
- Minimum Number of Pushes to Type Word II
- Ransom Note

## 24. Union Find
### Question:
Given a set of points where each point is represented by a pair of coordinates (x, y), find the number of isolated islands. An island is formed by connecting adjacent points that share either the same x or y coordinate.
Example:
```javascript
const points = [[1,1], [2,2], [2,3], [3,3], [4,1]];
countIslands(points) === 2
```

<details>
<summary>Solution</summary>

```javascript
class UnionFind {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = new Array(size).fill(0);
        this.count = size;
    }
    
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            this.count--;
        }
    }
    
    getCount() {
        return this.count;
    }
}

function countIslands(points) {
    const n = points.length;
    const uf = new UnionFind(n);
    
    // Create maps for x and y coordinates
    const xMap = new Map();
    const yMap = new Map();
    
    for (let i = 0; i < n; i++) {
        const [x, y] = points[i];
        
        // Connect points with same x coordinate
        if (xMap.has(x)) {
            uf.union(i, xMap.get(x));
        }
        xMap.set(x, i);
        
        // Connect points with same y coordinate
        if (yMap.has(y)) {
            uf.union(i, yMap.get(y));
        }
        yMap.set(y, i);
    }
    
    return uf.getCount();
}
```

Key points:
- Time Complexity: O(N × α(N)) where α is inverse Ackermann function
- Space Complexity: O(N)
- Uses path compression and union by rank
- Handles disconnected components efficiently
</details>

## More "Union Find" Pattern Coding Problems
- Redundant Connection
- Number of Islands
- Most Stones Removed with Same Row or Column
- Longest Consecutive Sequence
- Last Day Where You Can Still Cross
- Regions Cut by Slashes
- Accounts Merge
- Minimize Malware Spread
- Find if Path Exists in Graph
- The Skyline Problem
- Evaluate Division

## 25. Custom Data Structures
### Question:
Implement a LRU (Least Recently Used) Cache.
Example:
```javascript
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);      // returns 1
cache.put(3, 3);   // evicts key 2
cache.get(2);      // returns -1 (not found)
```

<details>
<summary>Solution</summary>

```javascript
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        
        // Initialize dummy head and tail
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    get(key) {
        const node = this.cache.get(key);
        if (!node) return -1;
        
        // Move to front
        this.removeNode(node);
        this.addToFront(node);
        
        return node.value;
    }
    
    put(key, value) {
        let node = this.cache.get(key);
        
        if (node) {
            // Update existing node
            node.value = value;
            this.removeNode(node);
            this.addToFront(node);
        } else {
            // Add new node
            node = new Node(key, value);
            this.cache.set(key, node);
            this.addToFront(node);
            
            // Remove LRU if over capacity
            if (this.cache.size > this.capacity) {
                const lru = this.tail.prev;
                this.removeNode(lru);
                this.cache.delete(lru.key);
            }
        }
    }
    
    removeNode(node) {
        const prev = node.prev;
        const next = node.next;
        prev.next = next;
        next.prev = prev;
    }
    
    addToFront(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }
}
```

Key points:
- Time Complexity: O(1) for both get and put
- Space Complexity: O(capacity)
- Uses doubly-linked list with hash map
- Maintains insertion order
</details>

## More "Custom Data Structures" Pattern Coding Problems
- Snapshot Array
- Time Based Key-Value Store
- LRU Cache
- Insert Delete GetRandom O(1)
- Min Stack
- Range Module
- Shortest Word Distance II
- Design HashSet
- Max Stack
- Moving Average from Data Stream
- Two Sum III - Data structure design
- LFU Cache

## 26. Bitwise Manipulation
### Question:
Find the number that appears once in an array where all other numbers appear exactly three times.
Example:
```javascript
singleNumber([2,2,3,2]) === 3
singleNumber([0,1,0,1,0,1,99]) === 99
```

<details>
<summary>Solution</summary>

```javascript
function singleNumber(nums) {
    let ones = 0;
    let twos = 0;
    
    for (const num of nums) {
        ones = (ones ^ num) & ~twos;
        twos = (twos ^ num) & ~ones;
    }
    
    return ones;
}

// Alternative solution using counting bits
function singleNumberBits(nums) {
    const bits = new Array(32).fill(0);
    
    // Count bits at each position
    for (const num of nums) {
        for (let i = 0; i < 32; i++) {
            bits[i] += (num >> i) & 1;
        }
    }
    
    // Reconstruct the single number
    let result = 0;
    for (let i = 0; i < 32; i++) {
        if (bits[i] % 3 !== 0) {
            result |= (1 << i);
        }
    }
    
    return result;
}

// More examples with common bit manipulation techniques
function commonBitOperations(n) {
    // Check if power of 2
    const isPowerOfTwo = n > 0 && (n & (n - 1)) === 0;
    
    // Get rightmost 1-bit
    const rightmostOne = n & -n;
    
    // Clear rightmost 1-bit
    const clearRightmostOne = n & (n - 1);
    
    // Count number of 1 bits
    let count = 0;
    let num = n;
    while (num) {
        num &= (num - 1);
        count++;
    }
    
    // Get/Set/Clear bit at position i
    const getBit = (n, i) => (n >> i) & 1;
    const setBit = (n, i) => n | (1 << i);
    const clearBit = (n, i) => n & ~(1 << i);
    
    return {
        isPowerOfTwo,
        rightmostOne,
        clearRightmostOne,
        numberOfOneBits: count,
        getBit: getBit(n, 3),  // Get bit at position 3
        setBit: setBit(n, 2),  // Set bit at position 2
        clearBit: clearBit(n, 1) // Clear bit at position 1
    };
}
```

Key points:
- Time Complexity: O(n) for single number solutions
- Space Complexity: O(1) for basic solution, O(32) for bit counting solution
- Uses XOR and bit counting techniques
- Common bit manipulation operations included
- Handles both positive and negative numbers
- Efficient for memory-constrained environments
</details>

## More "Bitwise Manipulation" Pattern Coding Problems
- Find the Difference
- Complement of Base 10 Integer
- Flipping an Image
- Single Number
- Single Number II
- Encode and Decode Strings
- Sum of All Subset XOR Totals
- Find The K-th Lucky Number
- Minimum Number of K Consecutive Bit Flips
- Find the Longest Substring Having Vowels in Even Counts
- Count Triplets That Can Form Two Arrays of Equal XOR
- Longest Subarray With Maximum Bitwise AND
- Reverse Bits
