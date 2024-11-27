# LeetCode Solutions

## Table of Contents

1. [String Reversal](#1-string-reversal)
2. [Palindrome Check](#2-palindrome-check)
3. [Integer Reversal](#3-integer-reversal)
4. [Max Character](#4-max-character)
5. [FizzBuzz](#5-fizzbuzz)
6. [Array Chunking](#6-array-chunking)
7. [Anagrams](#7-anagrams)
8. [String Capitalization](#8-string-capitalization)
9. [Pyramid Pattern](#9-pyramid-pattern)
10. [Vowel Counter](#10-vowel-counter)
11. [Matrix Spiral](#11-matrix-spiral)
12. [Fibonacci](#12-fibonacci)
13. [Queue Implementation](#13-queue-implementation)
14. [Queue Weaving](#14-queue-weaving)
15. [Stack Queue](#15-stack-queue)
16. [Linked List](#16-linked-list)
17. [Linked List Midpoint](#17-linked-list-midpoint)
18. [Circular List Detection](#18-circular-list-detection)
19. [From Last Node](#19-from-last-node)
20. [Tree Implementation](#20-tree-implementation)
21. [Tree Level Width](#21-tree-level-width)
22. [Binary Search Tree](#22-binary-search-tree)
23. [BST Validation](#23-bst-validation)
24. [LRU Cache](#24-lru-cache)
25. [Trie Implementation](#25-trie-implementation)
26. [Valid Parentheses](#26-valid-parentheses)
27. [Minimum Brackets to Remove](#27-minimum-brackets-to-remove)
28. [Kth Largest Element](#28-kth-largest-element)
29. [Binary Search](#29-binary-search)
30. [Level Order Traversal](#30-level-order-traversal)
31. [Reverse Linked List Range](#31-reverse-linked-list-range)
32. [Flatten Multilevel List](#32-flatten-multilevel-list)

## 1. String Reversal
### Question:
Given a string, return a new string with the reversed order of characters.
```javascript
reverse('apple') === 'leppa'
reverse('hello') === 'olleh'
reverse('Greetings!') === '!sgniteerG'
```

<details>
<summary>Solution</summary>

```javascript
function reverse(str) {
  return str.split('').reverse().join('');
}
```
</details>

## 2. Palindrome Check
### Question:
Given a string, return true if the string is a palindrome or false if it is not.
```javascript
palindrome("abba") === true
palindrome("abcdefg") === false
```

<details>
<summary>Solution</summary>

```javascript
function isPalindrome(str) {
    const reverse = str.split('').reverse().join('');
    return str === reverse;
}

// Alternative solution using every()
function isPalindrome2(str) {
    return str.split('').every((char, i) => {
        return char === str[str.length - i - 1];
    });
}
```
</details>

## 3. Integer Reversal
### Question:
Given an integer, return an integer that is the reverse ordering of numbers.
```javascript
reverseInt(15) === 51;
reverseInt(981) === 189;
reverseInt(500) === 5;
reverseInt(-15) === -51;
reverseInt(-90) === -9;
```

<details>
<summary>Solution</summary>

```javascript
function reverseInt(int) {
    const reversedStr = Math.abs(int).toString().split('').reverse().join('');
    const reversedInt = parseInt(reversedStr);
    return int < 0 ? -reversedInt : reversedInt;
}
```
</details>

## 4. Max Character
### Question:
Given a string, return the character that is most commonly used in the string.
```javascript
maxChar("abcccccccd") === "c"
maxChar("apple 1231111") === "1"
```

<details>
<summary>Solution</summary>

```javascript
function maxChar(str) {
    if (!str) return null;

    const cache = new Map();
    let maxChar = str[0];
    let maxFrequency = 0;

    for (let char of str) {
        const cached = (cache.get(char) || 0) + 1;
        cache.set(char, cached);

        if (cached > maxFrequency) {
            maxChar = char;
            maxFrequency = cached;
        }
    }
    return maxChar;
}
```
</details>

## 5. FizzBuzz
### Question:
Write a program that console logs the numbers from 1 to n. For multiples of three print 'fizz', for multiples of five print 'buzz', for numbers which are multiples of both three and five print 'fizzbuzz'.
```javascript
fizzBuzz(5);
Output: 1, 2, fizz, 4, buzz
```

<details>
<summary>Solution</summary>

```javascript
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log('fizzbuzz');
        } else if (i % 3 === 0) {
            console.log('fizz');
        } else if (i % 5 === 0) {
            console.log('buzz');
        } else {
            console.log(i);
        }
    }
}
```
</details>

## 6. Array Chunking
### Question:
Given an array and chunk size, divide the array into many subarrays where each subarray is of the provided size.
```javascript
chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
```

<details>
<summary>Solution</summary>

```javascript
function chunk(array, size) {
    if (!Array.isArray(array) || array.length === 0 || typeof size !== 'number' || size <= 0) {
        throw new Error('Invalid input');
    }
    const chunkedArray = [];
    let index = 0;
    
    while (index < array.length) {
        chunkedArray.push(array.slice(index, index + size));
        index += size;
    }
    return chunkedArray;
}
```
</details>

[Continuing with sections 7-32 following the same pattern...]

## 7. Anagrams
### Question:
Check if two provided strings are anagrams of each other.
```javascript
anagrams('rail safety', 'fairy tales') === true
anagrams('RAIL! SAFETY!', 'fairy tales') === true
anagrams('Hi there', 'Bye there') === false
```

<details>
<summary>Solution</summary>

```javascript
function createCharMap(str) {
    const cleanStr = str.replace(/[^\w]/g, '').toLowerCase();
    const charMap = new Map();

    for (let char of cleanStr) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    return charMap;
}

function anagrams(str1, str2) {
    const charMapStr1 = createCharMap(str1);
    const charMapStr2 = createCharMap(str2);

    if (charMapStr1.size !== charMapStr2.size) {
        return false;
    }

    for (let [char, count] of charMapStr1) {
        if (charMapStr2.get(char) !== count) {
            return false;
        }
    }

    return true;
}
```
</details>

## 8. String Capitalization
### Question:
Write a function that accepts a string and capitalizes the first letter of each word.
```javascript
capitalize('a short sentence') --> 'A Short Sentence'
capitalize('look, it is working!') --> 'Look, It Is Working!'
```

<details>
<summary>Solution</summary>

```javascript
function capitalize(str) {
    return str.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
}
```
</details>

## 9. Pyramid Pattern
### Question:
Write a function that accepts a positive number N and prints a pyramid shape.
```javascript
pyramid(3);
  '  #  '
  ' ### '
  '#####'
```

<details>
<summary>Solution</summary>

```javascript
function pyramid(n) {
    for (let i = 1; i <= n; i++) {
        const sidePadding = n - i;
        const hashes = 2 * i - 1;
        const line = ' '.repeat(sidePadding) + '#'.repeat(hashes) + ' '.repeat(sidePadding);
        console.log(line);
    }
}
```
</details>

## 10. Vowel Counter
### Question:
Write a function that returns the number of vowels used in a string.
```javascript
vowels('Hi There!') --> 3
vowels('Why do you ask?') --> 4
```

<details>
<summary>Solution</summary>

```javascript
function vowels(str) {
    let count = 0;
    const checker = ['a', 'e', 'i', 'o', 'u'];
    for (const char of str.toLowerCase()) {
        if (checker.includes(char)) {
            count++;
        }
    }
    return count;
}
```
</details>

## 11. Matrix Spiral
### Question:
Write a function that accepts an integer N and returns a NxN spiral matrix.
```javascript
matrix(3);
[[1, 2, 3],
[8, 9, 4],
[7, 6, 5]]
```

<details>
<summary>Solution</summary>

```javascript
function matrix(n) {
    const result = Array.from({ length: n }, () => Array(n).fill(undefined));
    let startRow = 0, endRow = n - 1;
    let startColumn = 0, endColumn = n - 1;
    let counter = 1;

    while (startRow <= endRow && startColumn <= endColumn) {
        // Top row
        for (let col = startColumn; col <= endColumn; col++) {
            result[startRow][col] = counter++;
        }
        startRow++;

        // Right column
        for (let row = startRow; row <= endRow; row++) {
            result[row][endColumn] = counter++;
        }
        endColumn--;

        // Bottom row
        for (let col = endColumn; col >= startColumn; col--) {
            result[endRow][col] = counter++;
        }
        endRow--;

        // Left column
        for (let row = endRow; row >= startRow; row--) {
            result[row][startColumn] = counter++;
        }
        startColumn++;
    }

    return result;
}
```
</details>

## 12. Fibonacci
### Question:
Print the n-th entry in the fibonacci series.
```javascript
fib(4) === 3
fib(7) === 13
```

<details>
<summary>Solution</summary>

```javascript
// Iterative Solution
const fib = (n) => {
    if (n < 2) return n;
    const series = [0, 1];
    for (let i = 2; i <= n; i++) {
        series.push(series[i-1] + series[i-2]);
    }
    return series[n];
}

// Memoized Solution
const fib3 = (n, memo = new Map()) => {
    if (n < 2) return n;
    if (memo.has(n)) return memo.get(n);
    memo.set(n, fib3(n - 1, memo) + fib3(n - 2, memo));
    return memo.get(n);
}
```
</details>

## 13. Queue Implementation
### Question:
Implement a Queue data structure.
```javascript
const queue = new Queue();
queue.add(1); queue.add(2);
queue.remove() --> 1
queue.peek() --> 2
```

<details>
<summary>Solution</summary>

```javascript
class Queue {
    constructor() {
        this.data = [];
    }
    
    add(item) {
        this.data.unshift(item);
    }
    
    remove() {
        return this.data.pop();
    }
    
    peek() {
        return this.data[this.data.length - 1];
    }
}
```
</details>

## 14. Queue Weaving
### Question:
Combine two queues by alternatively taking elements from each queue.
```javascript
const q1 = new Queue();
q1.add(1); q1.add(2);
const q2 = new Queue();
q2.add('Hi'); q2.add('There');
weave(q1, q2) --> [1, 'Hi', 2, 'There']
```

<details>
<summary>Solution</summary>

```javascript
const weave = (queueOne, queueTwo) => {
    const q = new Queue();

    while (queueOne.peek() || queueTwo.peek()) {
        if (queueOne.peek()) {
            q.add(queueOne.remove());
        }
        if (queueTwo.peek()) {
            q.add(queueTwo.remove());
        }
    }
    return q;
}
```
</details>

## 15. Stack Queue
### Question:
Implement a Queue using two Stacks.

<details>
<summary>Solution</summary>

```javascript
class Stack {
    constructor() {
        this.data = [];
    }
    add(item) {
        return this.data.push(item);
    }
    remove() {
        return this.data.pop();
    }
    peek() {
        return this.data[this.data.length - 1];
    }
}

class Queue {
    constructor() {
        this.first = new Stack();
        this.second = new Stack();
    }
    add(item) {
        return this.first.add(item);
    }
    remove() {
        while (this.first.peek()) {
            this.second.add(this.first.remove());
        }
        const last = this.second.remove();
        while (this.second.peek()) {
            this.first.add(this.second.remove());
        }
        return last;
    }
    peek() {
        while (this.first.peek()) {
            this.second.add(this.first.remove());
        }
        const last = this.second.peek();
        while (this.second.peek()) {
            this.first.add(this.second.remove());
        }
        return last;
    }
}
```
</details>

## 16. Linked List
### Question:
Implement a Linked List with the following methods: insertFirst, size, getFirst, getLast, clear, removeFirst, removeLast, insertLast, getAt, removeAt, insertAt.

<details>
<summary>Solution</summary>

```javascript
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(data) {
        this.head = new Node(data, this.head);
    }

    size() {
        let counter = 0;
        let node = this.head;
        while (node) {
            counter++;
            node = node.next;
        }
        return counter;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        if (!this.head) return null;
        let node = this.head;
        while (node.next) {
            node = node.next;
        }
        return node;
    }

    clear() {
        this.head = null;
    }

    removeFirst() {
        if (!this.head) return;
        this.head = this.head.next;
    }

    removeLast() {
        if (!this.head) return;
        if (!this.head.next) {
            this.head = null;
            return;
        }
        let previous = this.head;
        let node = this.head.next;
        while (node.next) {
            previous = node;
            node = node.next;
        }
        previous.next = null;
    }

    insertLast(data) {
        const last = this.getLast();
        if (last) {
            last.next = new Node(data);
        } else {
            this.head = new Node(data);
        }
    }

    getAt(index) {
        let counter = 0;
        let node = this.head;
        while (node) {
            if (counter === index) return node;
            counter++;
            node = node.next;
        }
        return null;
    }

    removeAt(index) {
        if (!this.head) return;
        if (index === 0) {
            this.head = this.head.next;
            return;
        }
        const previous = this.getAt(index - 1);
        if (!previous || !previous.next) return;
        previous.next = previous.next.next;
    }

    insertAt(data, index) {
        if (!this.head || index === 0) {
            this.head = new Node(data, this.head);
            return;
        }
        const previous = this.getAt(index - 1) || this.getLast();
        previous.next = new Node(data, previous.next);
    }
}
```
</details>

## 17. Linked List Midpoint
### Question:
Return the middle node of a linked list.
```javascript
const l = new LinkedList();
l.insertLast('a'); l.insertLast('b'); l.insertLast('c');
midpoint(l); // returns { data: 'b' }
```

<details>
<summary>Solution</summary>

```javascript
const midpoint = (list) => {
    if (!list) return;
    let fast = list.head;
    let slow = list.head;
    while (fast.next && fast.next.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
}
```
</details>

## 18. Circular List Detection
### Question:
Return true if the list is circular, false if it is not.
```javascript
circular(list) // returns true if list is circular
```

<details>
<summary>Solution</summary>

```javascript
const circular = (list) => {
    let slow = list.head;
    let fast = list.head;

    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
}
```
</details>

## 19. From Last Node
### Question:
Return the element n spaces from the last node in the list.
```javascript
fromLast(list, 2).data // returns 'b' if list is a -> b -> c -> d
```

<details>
<summary>Solution</summary>

```javascript
const fromLast = (list, n) => {
    let slow = list.head;
    let fast = list.head;
    
    for (let i = 0; i < n; i++) {
        if (fast) {
            fast = fast.next;
        }
    }
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}
```
</details>

## 20. Tree Implementation
### Question:
Implement a tree with traverseBF and traverseDF methods.

<details>
<summary>Solution</summary>

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    add(data) {
        this.children.push(new Node(data));
    }

    remove(data) {
        this.children = this.children.filter(node => node.data !== data);
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    traverseBF(fn) {
        const arr = [this.root];
        while (arr.length) {
            const node = arr.shift();
            arr.push(...node.children);
            fn(node);
        }
    }

    traverseDF(fn) {
        const arr = [this.root];
        while (arr.length) {
            const node = arr.shift();
            arr.unshift(...node.children);
            fn(node);
        }
    }
}
```
</details>

## 21. Tree Level Width
### Question:
Return an array with the width of each tree level.
```javascript
Given:    0
        / | \
       1  2  3
       |     |
       4     5
Answer: [1, 3, 2]
```

<details>
<summary>Solution</summary>

```javascript
function levelWidth(root) {
    const arr = [root, 'S'];
    const counters = [0];

    while (arr.length > 1) {
        const node = arr.shift();

        if (node === 'S') {
            counters.push(0);
            arr.push('S');
        } else {
            arr.push(...node.children);
            counters[counters.length - 1]++;
        }
    }

    return counters;
}
```
</details>

## 22. Binary Search Tree
### Question:
Implement a Binary Search Tree with insert and contains methods.

<details>
<summary>Solution</summary>

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    insert(data) {
        if (data < this.data) {
            if (this.left) {
                this.left.insert(data);
            } else {
                this.left = new Node(data);
            }
        } else if (data > this.data) {
            if (this.right) {
                this.right.insert(data);
            } else {
                this.right = new Node(data);
            }
        }
    }

    contains(data) {
        if (this.data === data) {
            return this;
        }

        if (data < this.data && this.left) {
            return this.left.contains(data);
        } else if (data > this.data && this.right) {
            return this.right.contains(data);
        }
        
        return null;
    }
}
```
</details>

## 23. BST Validation
### Question:
Validate a binary search tree.

<details>
<summary>Solution</summary>

```javascript
function validate(node, min = null, max = null) {
    if (!node) return true;
    
    if ((min !== null && node.data <= min) || (max !== null && node.data >= max)) {
        return false;
    }
    
    return validate(node.left, min, node.data) && validate(node.right, node.data, max);
}
```
</details>

## 24. LRU Cache
### Question:
Implement a Least Recently Used (LRU) cache.

<details>
<summary>Solution</summary>

```javascript
class LRUCache {
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }
}
```
</details>

## 25. Trie Implementation
### Question:
Implement a Trie (Prefix Tree).

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
            if (!node.children.has(char)) return null;
            node = node.children.get(char);
        }
        return node;
    }
}
```
</details>

[Continuing with remaining sections 26-32...]

## 26. Valid Parentheses
### Question:
Determine if string with brackets is valid.
```javascript
isValid("()[]{}") === true
```

<details>
<summary>Solution</summary>

```javascript
function isValid(s) {
    const stack = [];
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    
    for (let char of s) {
        if (pairs[char]) {
            stack.push(char);
        } else {
            if (pairs[stack.pop()] !== char) return false;
        }
    }
    
    return stack.length === 0;
}
```
</details>

## 27. Minimum Brackets To Remove
### Question:
Remove minimum number of parentheses to make string valid.
```javascript
Input: "a)b(c)d"
Output: "ab(c)d"
```

<details>
<summary>Solution</summary>

```javascript
function minRemoveToMakeValid(s) {
    const stack = [];
    const chars = s.split('');
    
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === '(') {
            stack.push(i);
        } else if (chars[i] === ')') {
            if (stack.length > 0) {
                stack.pop();
            } else {
                chars[i] = '';
            }
        }
    }
    
    while (stack.length > 0) {
        chars[stack.pop()] = '';
    }
    
    return chars.join('');
}
```
</details>

## 28. Kth Largest Element
### Question:
Find kth largest element in unsorted array without sorting.
```javascript
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

<details>
<summary>Solution</summary>

```javascript
function findKthLargest(nums, k) {
    function quickSelect(start, end, k) {
        const pivot = partition(start, end);
        
        if (pivot === k - 1) {
            return nums[pivot];
        } else if (pivot < k - 1) {
            return quickSelect(pivot + 1, end, k);
        } else {
            return quickSelect(start, pivot - 1, k);
        }
    }
    
    function partition(start, end) {
        const pivot = nums[end];
        let i = start;
        
        for (let j = start; j < end; j++) {
            if (nums[j] > pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        
        [nums[i], nums[end]] = [nums[end], nums[i]];
        return i;
    }
    
    return quickSelect(0, nums.length - 1, k);
}
```
</details>

## 29. Binary Search
### Question:
Implement binary search for sorted array.
```javascript
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
```

<details>
<summary>Solution</summary>

```javascript
function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}
```
</details>

## 30. Level Order Traversal
### Question:
Return binary tree level order traversal.
```javascript
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

<details>
<summary>Solution</summary>

```javascript
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const level = [];
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}
```
</details>

## 31. Reverse Linked List Range
### Question:
Reverse a linked list from position m to n.
```javascript
Input: 1->2->3->4->5, m=2, n=4
Output: 1->4->3->2->5
```

<details>
<summary>Solution</summary>

```javascript
function reverseBetween(head, m, n) {
    if (!head || m === n) return head;
    
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    for (let i = 0; i < m - 1; i++) {
        prev = prev.next;
    }
    
    let curr = prev.next;
    for (let i = 0; i < n - m; i++) {
        const next = curr.next;
        curr.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }
    
    return dummy.next;
}
```
</details>

## 32. Flatten Multilevel List
### Question:
Flatten a multilevel doubly linked list.
```javascript
Input: [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
Output: [1,2,3,7,8,11,12,9,10,4,5,6]
```

<details>
<summary>Solution</summary>

```javascript
function flatten(head) {
    if (!head) return null;
    
    let curr = head;
    while (curr) {
        if (curr.child) {
            let next = curr.next;
            let child = flatten(curr.child);
            
            curr.next = child;
            child.prev = curr;
            curr.child = null;
            
            while (curr.next) {
                curr = curr.next;
            }
            
            if (next) {
                curr.next = next;
                next.prev = curr;
            }
        }
        curr = curr.next;
    }
    
    return head;
}
```
</details>
