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
