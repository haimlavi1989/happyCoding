# LeetCode Solutions

## Table of Contents

1. [String Reversal](#string-reversal)
2. [Palindrome Check](#palindrome-check)
3. [Integer Reversal](#integer-reversal)
4. [Max Character](#max-character)
5. [FizzBuzz](#fizzbuzz)
6. [Array Chunking](#array-chunking)
7. [Anagrams](#anagrams)
8. [String Capitalization](#string-capitalization)
9. [Pyramid Pattern](#pyramid-pattern)
10. [Vowel Counter](#vowel-counter)
11. [Matrix Spiral](#matrix-spiral)
12. [Fibonacci](#fibonacci)
13. [Queue Implementation](#queue-implementation)
14. [Queue Weaving](#queue-weaving)
15. [Stack Queue](#stack-queue)
16. [Linked List](#linked-list)
17. [Linked List Midpoint](#linked-list-midpoint)
18. [Circular List Detection](#circular-list-detection)
19. [From Last Node](#from-last-node)
20. [Tree Implementation](#tree-implementation)
21. [Tree Level Width](#tree-level-width)
22. [Binary Search Tree](#binary-search-tree)
23. [BST Validation](#bst-validation)
24. [Reverse Linked List Range](#reverse-linked-list-range)
25. [Flatten Multilevel List](#flatten-multilevel-list)
26. [Valid Parentheses](#valid-parentheses)
27. [Minimum Brackets to Remove](#minimum-brackets-to-remove)
28. [Kth Largest Element](#kth-largest-element)
29. [Binary Search](#binary-search)
30. [Element Position Range](#element-position-range)
31. [Level Order Traversal](#level-order-traversal)

## String Reversal
### Question:
Given a string, return a new string with the reversed order of characters.
```javascript
//reverse('apple') === 'leppa'
//reverse('hello') === 'olleh'
//reverse('Greetings!') === '!sgniteerG'
```

<details>
<summary>Solution</summary>

```javascript
function reverse(str) {
  return str.split('').reverse().join('');
}
```
</details>

## Palindrome Check
### Question:
Given a string, return true if the string is a palindrome or false if it is not.
```javascript
//palindrome("abba") === true
//palindrome("abcdefg") === false
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

## Integer Reversal
### Question:
Given an integer, return an integer that is the reverse ordering of numbers.
```javascript
//reverseInt(15) === 51
//reverseInt(981) === 189
//reverseInt(500) === 5
//reverseInt(-15) === -51
//reverseInt(-90) === -9
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

## Max Character
### Question:
Given a string, return the character that is most commonly used.
```javascript
//maxChar("abcccccccd") === "c"
//maxChar("apple 1231111") === "1"
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

## FizzBuzz
### Question:
Write a program that prints numbers from 1 to n. For multiples of three print 'fizz', for multiples of five print 'buzz', for numbers which are multiples of both three and five print 'fizzbuzz'.
```javascript
//fizzBuzz(5)
//Output: 1, 2, fizz, 4, buzz
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

## Array Chunking
### Question:
Given an array and chunk size, divide the array into many subarrays where each subarray has the length of the size.
```javascript
//chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
//chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
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

## Anagrams
### Question:
Check if two strings are anagrams of each other. One string is an anagram of another if it uses the same characters in the same quantity.
```javascript
//anagrams('rail safety', 'fairy tales') === true
//anagrams('RAIL! SAFETY!', 'fairy tales') === true
//anagrams('Hi there', 'Bye there') === false
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

## String Capitalization
### Question:
Write a function that accepts a string and capitalizes the first letter of each word.
```javascript
//capitalize('a short sentence') --> 'A Short Sentence'
//capitalize('look, it is working!') --> 'Look, It Is Working!'
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

## Pyramid Pattern
### Question:
Write a function that accepts a positive number N and prints a pyramid shape with N levels using the # character.
```javascript
//pyramid(1)  -->  '#'
//pyramid(2)  -->  ' # '
//             --> '###'
//pyramid(3)  -->  '  #  '
//             --> ' ### '
//             --> '#####'
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

## Vowel Counter
### Question:
Write a function that returns the number of vowels in a string.
```javascript
//vowels('Hi There!') --> 3
//vowels('Why do you ask?') --> 4
//vowels('Why?') --> 0
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

## Matrix Spiral
### Question:
Write a function that accepts an integer N and returns a NxN spiral matrix.
```javascript
//matrix(3) --> [[1, 2, 3],
//               [8, 9, 4],
//               [7, 6, 5]]
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
        // Fill top row
        for (let col = startColumn; col <= endColumn; col++) {
            result[startRow][col] = counter++;
        }
        startRow++;

        // Fill right column
        for (let row = startRow; row <= endRow; row++) {
            result[row][endColumn] = counter++;
        }
        endColumn--;

        // Fill bottom row
        for (let col = endColumn; col >= startColumn; col--) {
            result[endRow][col] = counter++;
        }
        endRow--;

        // Fill left column
        for (let row = endRow; row >= startRow; row--) {
            result[row][startColumn] = counter++;
        }
        startColumn++;
    }

    return result;
}
```
</details>

## Fibonacci
### Question:
Print the n-th entry in the fibonacci series.
```javascript
//fib(4) === 3
//fib(7) === 13
```

<details>
<summary>Solution</summary>

```javascript
// Iterative Solution
function fib(n) {
    if (n < 2) return n;
    const series = [0, 1];
    for (let i = 2; i <= n; i++) {
        series.push(series[i-1] + series[i-2]);
    }
    return series[n];
}

// Memoized Recursive Solution
const fib3 = (n, memo = new Map()) => {
    if (n < 2) return n;

    if (memo.has(n)) {
        return memo.get(n);
    }

    memo.set(n, fib3(n - 1, memo) + fib3(n - 2, memo));
    return memo.get(n);
}
```
</details>

## Queue Implementation
### Question:
Implement a Queue data structure.
```javascript
//const queue = new Queue();
//queue.add(1); queue.add(2);
//queue.remove() --> 1
//queue.peek() --> 2
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

## Queue Weaving
### Question:
Combine two queues by alternatively taking elements from each queue.
```javascript
//const queueOne = new Queue();
//queueOne.add(1); queueOne.add(2);
//const queueTwo = new Queue();
//queueTwo.add('Hi'); queueTwo.add('There');
//weave(queueOne, queueTwo) --> [1, 'Hi', 2, 'There']
```

<details>
<summary>Solution</summary>

```javascript
function weave(queueOne, queueTwo) {
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

## Stack Queue
### Question:
Implement a Queue using two Stacks.

<details>
<summary>Solution</summary>

```javascript
class Stack {
    constructor() {
        this.data = [];
    }
    
    push(item) {
        this.data.push(item);
    }
    
    pop() {
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
        this.first.push(item);
    }

    remove() {
        while (this.first.peek()) {
            this.second.push(this.first.pop());
        }
        const last = this.second.pop();
        while (this.second.peek()) {
            this.first.push(this.second.pop());
        }
        return last;
    }

    peek() {
        while (this.first.peek()) {
            this.second.push(this.first.pop());
        }
        const last = this.second.peek();
        while (this.second.peek()) {
            this.first.push(this.second.pop());
        }
        return last;
    }
}
```
</details>

## Binary Search Tree
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

## Tree Level Width
### Question:
Return an array where each element is the width of tree at each level.
```javascript
//    0
//  / | \
// 1  2  3
// |     |
// 4     5
// Result: [1, 3, 2]
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

## Valid Parentheses
### Question:
Determine if string with brackets '()', '[]', '{}' is valid.
```javascript
//Input: s = "()[]{}"
//Output: true
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

## Minimum Brackets To Remove
### Question:
Remove minimum number of parentheses to make string valid.
```javascript
//Input: "a)b(c)d"
//Output: "ab(c)d"
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

## Kth Largest Element
### Question:
Find kth largest element in unsorted array without sorting.
```javascript
//Input: nums = [3,2,1,5,6,4], k = 2
//Output: 5
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

## Binary Search
### Question:
Implement binary search for sorted array.
```javascript
//Input: nums = [-1,0,3,5,9,12], target = 9
//Output: 4
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

## Level Order Traversal
### Question:
Return binary tree level order traversal.
```javascript
//Input: root = [3,9,20,null,null,15,7]
//Output: [[3],[9,20],[15,7]]
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

## Reverse Linked List Range
### Question:
Reverse a linked list from position m to n.
```javascript
//Input: 1->2->3->4->5, m=2, n=4
//Output: 1->4->3->2->5
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

## Flatten Multilevel List
### Question:
Flatten a multilevel doubly linked list.
```javascript
//Input: [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
//Output: [1,2,3,7,8,11,12,9,10,4,5,6]
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

## LRU Cache
### Question:
Design and implement a Least Recently Used (LRU) cache.

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

## Trie Implementation
### Question:
Implement a Trie (Prefix Tree) with insert, search, and startsWith methods.

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
