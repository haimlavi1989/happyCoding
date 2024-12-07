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
33. [Reverse Linked List](#33-Reverse-Linked-List)

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
Time Complexity: O(n) - but performs multiple passes through the data
Space Complexity: O(n) - creates new arrays/strings in memory

// Alternative solution using every()
function isPalindrome2(str) {
    return str.split('').every((char, i) => {
        return char === str[str.length - i - 1];
    });
}
Time Complexity: O(n) - performs a single pass through half the string
Space Complexity: O(n) - due to split creating an array

function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
Time Complexity: O(n)
Space Complexity: O(1) 
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
Time Complexity: O(n)
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
Time Complexity: O(n)
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
The time complexity is O(n) where n is the length of the input array. Here's why:
The while loop runs n/size times
In each iteration, array.slice() takes O(size) time
Total operations = (n/size) × size = n

While the overall complexity is O(n), there is a potential memory overhead since slice() creates new array copies.
If memory is a concern use an alternative O(n) solution that uses less memory.
```
</details>

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
time complexity: O(n + m) where n and m are lengths of str1 and str2

function anagrams(str1, str2) {
    // Clean and sort both strings
    const cleanAndSort = str => 
        str.replace(/[^\w]/g, '')
           .toLowerCase()
           .split('')
           .sort()
           .join('');
           
    return cleanAndSort(str1) === cleanAndSort(str2);
}
time complexity: O(n log n) due to sorting, technically worse than O(n)
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
    let sidePadding = n - 1;
    let levelPadding = 1;
    for (let i=1; i<=n; i++) {
        console.log(' '.repeat(sidePadding) + '#'.repeat(levelPadding) + ' '.repeat(sidePadding));
        levelPadding += 2;
        sidePadding--;
    }
}
Time Complexity: O(n²)
The outer loop runs n times
For each iteration, repeat() method creates new strings with length proportional to n
Each concatenation operation is also proportional to n

// option 2
function pyramid(n) {
    // Create a single row template with 2*n-1 spaces
    const row = new Array(2 * n - 1).fill(' ');
    
    for (let i = 0; i < n; i++) {
        // Calculate the start and end positions for #
        const start = n - 1 - i;
        const end = n - 1 + i;
        
        // Fill in the # characters
        for (let j = start; j <= end; j++) {
            row[j] = '#';
        }
        
        // Print the row
        console.log(row.join(''));
    }
}
This solution is O(n) because:
We create the array once at the beginning
For each row, we're just modifying specific positions
join() only needs to be done once per row
We avoid expensive string repetition operations
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
Time Complexity: O(n²) - Because includes() is O(n) and we're doing it n times in the loop

// option 2
const vowels = (str) => {
    return str.toLowerCase().match(/[aeiou]/g)?.length || 0;
};
Time Complexity: O(n) - Regex matching scans the string once

// option 3
const vowels = (str) => {
    const vowelsLetters = new Set(['a', 'e', 'i', 'o', 'u']);
    return str.toLowerCase().split('')
              .filter(char => vowelsLetters.has(char))
              .length;
};
Time Complexity: O(n) - Set.has() is O(1), and we only scan the string once

// option 4
function vowels(str) {
    const vowelMap = new Set(['a', 'e', 'i', 'o', 'u']);
    let count = 0;
    
    for (const char of str.toLowerCase()) {
        if (vowelMap.has(char)) {
            count++;
        }
    }
    return count;
}
Time Complexity: O(n) - Using Set.has() which is O(1)
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
    // Handle edge cases
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    const result = [0, 1];
    
    for (let i = 2; i <= n; i++) {  // Changed to <= n
        result[i] = result[i-2] + result[i-1];
    }
    return result[n];  // Return nth number instead of whole array
};
Time Complexity: O(n)

// Recursive
const fib = (n) => {
    if (n <= 0) return 0;
    if (n <= 2) return 1;
    return fib(n-1) + fib(n-2);
};
Time Complexity: not efficient, O(2^n)

The function performs a single loop from 2 to n
Each operation inside the loop is O(1)
Space complexity is also O(n) as we're storing an array of n+1 numbers

// Recursive with Memoized Solution
const fib3 = (n, memo = new Map()) => {
    if (n <= 0) return 0;
    if (n <= 2) return 1;

    if (memo.has(n)) return memo.get(n);
    memo.set(n, fib3(n - 1, memo) + fib3(n - 2, memo));
    return memo.get(n);
}
Time Complexity: O(n)

// Most space-efficient
const fib = (n) => {
    if (n <= 0) return 0;
    if (n <= 2) return 1;
    
    let prev2 = 0;
    let prev1 = 1;
    let current;
    
    for (let i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return current;
};
Time Complexity: O(n)
Space Complexity: O(1)
```
</details>

## 13. Queue Implementation
### Question:
Implement a Queue data structure.
```javascript
// Create a new queue
const queue = new Queue();

// Add elements
queue.add(1);      // [1]
queue.add(2);      // [2, 1]
queue.add(3);      // [3, 2, 1]

console.log(queue.peek());    // Returns: 1
console.log(queue.remove());  // Returns: 1
console.log(queue.isEmpty()); // Returns: false
```

<details>
<summary>Solution</summary>

```javascript
class Queue {
    constructor() {
        this.data = [];
    }

    add(record) {
        this.data.unshift(record);
    }

    remove() {
        return this.data.pop();
    }

    peek() {
        return this.data[this.data.length - 1];
    }

    isEmpty() {
        return this.data.length === 0;
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
    if (!queueOne || !queueTwo) {
        throw new Error('Both queues must be provided');
    }
    
    if (!(queueOne instanceof Queue) || !(queueTwo instanceof Queue)) {
        throw new Error('Both arguments must be Queue instances');
    }

    const resultQueue = new Queue();

    while (!queueOne.isEmpty() || !queueTwo.isEmpty()) {
        if (!queueOne.isEmpty()) {
            resultQueue.add(queueOne.remove());
        }
        if (!queueTwo.isEmpty()) {
            resultQueue.add(queueTwo.remove());
        }
    }
    return resultQueue;
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
Implement a Linked List.

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
        // Insert a node at the beginning of the list
    }

    size() {
        // Return the number of nodes in the list
    }

    getFirst() {
        // Return the first node in the list
    }

    getLast() {
        // Return the last node in the list
    }

    clear() {
        // Clear the list
    }

    removeFirst() {
        // Remove the first node and return it
    }

    removeLast() {
        // Remove the last node and return it
    }

    insertLast(data) {
        // Insert a node at the end of the list
    }

    getAt(index) {
        // Get node at specific index
    }

    removeAt(index) {
        // Remove node at specific index
    }

    insertAt(data, index) {
        // Insert node at specific index
    }
}
```
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
        return this.head;
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
        if (!this.head) return null;
        const removed = this.head;
        this.head = this.head.next;
        return removed;
    }

    removeLast() {
        if (!this.head) return null;
        if (!this.head.next) {
            const removed = this.head;
            this.head = null;
            return removed;
        }
        let previous = this.head;
        let node = this.head.next;
        while (node.next) {
            previous = node;
            node = node.next;
        }
        previous.next = null;
        return node;
    }

    insertLast(data) {
        const newNode = new Node(data);
        const last = this.getLast();
        if (last) {
            last.next = newNode;
        } else {
            this.head = newNode;
        }
        return newNode;
    }

    getAt(index) {
        if (typeof index !== 'number' || index < 0) {
            throw new Error('Index must be a non-negative number');
        }
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
        if (typeof index !== 'number' || index < 0) {
            throw new Error('Index must be a non-negative number');
        }
        if (!this.head) return null;
        if (index === 0) {
            const removed = this.head;
            this.head = this.head.next;
            return removed;
        }
        const previous = this.getAt(index - 1);
        if (!previous || !previous.next) return null;
        const removed = previous.next;
        previous.next = previous.next.next;
        return removed;
    }

    insertAt(data, index) {
        if (typeof index !== 'number' || index < 0) {
            throw new Error('Index must be a non-negative number');
        }
        if (!this.head || index === 0) {
            const newNode = new Node(data, this.head);
            this.head = newNode;
            return newNode;
        }
        const previous = this.getAt(index - 1) || this.getLast();
        const newNode = new Node(data, previous.next);
        previous.next = newNode;
        return newNode;
    }
}
```
</details>

## 17. Linked List Midpoint
### Question:
Return the middle node of a linked list.
```javascript
const l = new LinkedList();
l.insertLast('a');
l.insertLast('b');
l.insertLast('c');
midpoint(l); // returns { data: 'b' }
```

<details>
<summary>Solution</summary>

```javascript
const midpoint = (list) => {
    if (!list || !list.head) {
        return null;
    }
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
    if (!list || !list.head) {
        return false;
    }

    // Handle single node case
    if (!list.head.next) {
        return false;
    }

    let slow = list.head;
    let fast = list.head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }

    return false;
};
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
    if (!list || !list.head || typeof n !== 'number' || n < 0) {
        return null;
    }

    let slow = list.head;
    let fast = list.head;

    for (let i = 0; i < n; i++) {
        if (!fast) {
            return null;  // List is shorter than n
        }
        fast = fast.next;
    }

    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
};
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
// Level 0: [0] -> width = 1
// Level 1: [1, 2, 3] -> width = 3
// Level 2: [4, 5] -> width = 2
// Answer: [1, 3, 2]
```

<details>
<summary>Solution</summary>

```javascript
const levelWidth = (root) => {
    // Handle empty tree
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root, 'end'];
    let currentLevelWidth = 0;

    while (queue.length > 1) {
        const node = queue.shift();

        if (node === 'end') {
            result.push(currentLevelWidth);
            currentLevelWidth = 0;
            queue.push('end');
        } else {
            currentLevelWidth++;
            if (node.children) {
                queue.push(...node.children);
            }
        }
    }

    // Handle last level if it has any nodes
    if (currentLevelWidth > 0) {
        result.push(currentLevelWidth);
    }

    return result;
};
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

## 33. Reverse Linked List
### Question:
1. Reverse the linked list.
2. Make the above code atomicity - use a simple solution.
```javascript
const reverseList = (list) => {
  // Add your code
}
```

<details>
<summary>Solution</summary>
Solution 1
  
```javascript
const reverseList = (list) => {
    let currentNode = list.head;
    let reversedList = null;
    while (currentNode) {
        let next = currentNode.next;
        currentNode.next = reversedList;
        reversedList = currentNode;
        currentNode = next;
    }
    return reversedList;
}
```

Solution 2

```javascript
const reverseList = (list) => {
    if (!list || !list.head) {
        return null;
    }
    // Create a deep copy first
    const newList = deepCopyList(list);
    let currentNode = newList.head;
    let reversedList = null;
    while (currentNode) {
        let next = currentNode.next;
        currentNode.next = reversedList;
        reversedList = currentNode;
        currentNode = next;
    }
    return reversedList;
}
```
</details>

## 34. Template
### Question:

```javascript

```

<details>
<summary>Solution</summary>

```javascript

```
</details>
