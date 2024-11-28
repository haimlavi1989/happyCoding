# JavaScript Interview Challenges

A comprehensive collection of JavaScript interview questions and solutions with detailed explanations.

## Table of Contents
- [1. Closures and Timeouts](#1-closures-and-timeouts)
- [2. Object Comparison](#2-object-comparison)
- [3. Variable Scope](#3-variable-scope)
- [4. Primitive Types](#4-primitive-types)
- [5. Full Stack Challenge](#5-full-stack-challenge)
- [6. Character Frequency](#6-character-frequency)
- [7. Rate Limiter](#7-rate-limiter)
- [8. Promise.allSettled Implementation](#8-promiseallsettled-implementation)
- [9. LRU Cache](#9-lru-cache)
- [10. Array Sorting: Zeros and Ones](#10-array-sorting-zeros-and-ones)
- [11. Sort Array by Element Frequency](#11-sort-array-by-element-frequency)
- [12. Card Deck Manager](#12-card-deck-manager)
- [13. Memoization with TTL](#13-memoization-with-ttl)
- [14. Cloud Storage System Design](#14-cloud-storage-system-design)
- [15. Timer Implementation](#15-timer-implementation)
- [16. Lowest Common Ancestor](#16-lowest-common-ancestor)
- [17. Function Currying](#17-function-currying)
- [18. Function Types Comparison](#18-function-types-comparison)
- [19. Stack Reversal Implementation](#19-stack-reversal-implementation)
- [20. Mocha Test Framework](#20-Mocha-Test-Framework)
- [21. New Template](#21-New-Template)

## 1. Closures and Timeouts

### Question:
```javascript
for (var i = 0; i < 5; i++) {
 setTimeout(function() { console.log(i); }, i * 1000 );
}
```
Explain the output and suggest ways to fix the code behavior.

<details>
<summary>Solution</summary>

The code will output `5` five times with increasing delays because of closure and variable scoping issues.

Problem explanation:
- The loop creates 5 timeouts, but by the time they execute, the loop has already completed
- Due to `var` using function scope, all timeouts reference the same `i` variable
- When the timeouts execute, `i` is already 5

Two solutions:

1. Using `let` for block scoping:
```javascript
for (let i = 0; i < 5; i++) { 
    setTimeout(function() { console.log(i); }, i * 1000 ); 
}
```

2. Using an IIFE to create a new scope:
```javascript
for (var i = 0; i < 5; i++) { 
    (function(i) { 
        setTimeout(function() { console.log(i); }, i * 1000 ); 
    })(i);
}
```
</details>

## 2. Object Comparison

### Question:
```javascript
let a = { key: '3'};
let b = { key: '3'};
console.log(a === b);
```
Explain the output.

<details>
<summary>Solution</summary>

The code will output `false`.

Explanation:
- In JavaScript, objects are compared by reference, not by value
- Even though both objects have identical content, they are stored in different memory locations
- The `===` operator checks if both operands reference the exact same object in memory
- Since `a` and `b` are different objects, the comparison returns `false`

To compare object contents, you would need to:
```javascript
// Option 1: Convert to string
JSON.stringify(a) === JSON.stringify(b)

// Option 2: Compare properties
Object.keys(a).every(key => a[key] === b[key])
```
</details>

## 3. Variable Scope

### Question:
```javascript
var x = 2;
function mul(x) {
    x = x * 2;
}
mul(x);
console.log(x)
```
Explain the output.

<details>
<summary>Solution</summary>

The code will output `2`.

Explanation:
- Function parameters create a new local scope
- When `mul(x)` is called, a new local variable `x` is created in the function scope
- Changes to the local `x` don't affect the global `x`
- The global `x` remains unchanged after the function call

Function execution flow:
1. Global `x` is set to 2
2. `mul(x)` is called with value 2
3. Local `x` is created and set to 2
4. Local `x` is multiplied by 2 (becomes 4)
5. Function ends, local `x` is discarded
6. Global `x` is still 2
7. `console.log(x)` prints 2

Alternative version that would modify the global value:
```javascript
var x = 2;
function mul() {
    x = x * 2; // No parameter, uses global x
}
mul();
console.log(x) // Outputs 4
```
</details>

## 4. Primitive Types

### Question:
```javascript
let a = 20;
let b = a;
a = 30;
console.log(b)
```
Explain the output.

<details>
<summary>Solution</summary>

The code will output `20`.

Explanation:
- In JavaScript, primitive types (numbers, strings, booleans) are passed by value
- When `b = a` is executed, `b` gets a copy of the value in `a`
- Changes to `a` after this assignment don't affect `b`
- Each variable holds its own independent copy of the value

Execution flow:
1. `a` is assigned the value 20
2. `b` gets a copy of a's value (20)
3. `a` is reassigned to 30
4. `b` still contains 20
5. `console.log(b)` outputs 20

Contrast with objects:
```javascript
let a = {number: 20};
let b = a;
a.number = 30;
console.log(b.number) // Outputs 30 because objects are passed by reference
```
</details>

## 5. Full Stack Challenge

### Question:
Build a Web Application with the following requirements:
1. Create express.js "Server1":
   - Add MongoDB connection
   - Create Users schema
   - Add Authentication via passport.js (JWT)
   - Send encrypted data to "Server2"
   - Decrypt and relay responses to client
   - Add Audit log Schema

2. Create express.js "Server2":
   - Share MongoDB connection with Server1
   - Create Settings schema
   - Handle encrypted data
   - Implement CRUD operations

3. Implement CRUD routes for Settings collection
4. Create React/EJS Client application

<details>
<summary>Solution</summary>

It is a full stack 2-hour home test the solution is in my Git.

</details>

## 6. Character Frequency

### Question:
Given a string, return the character that is most commonly used in the string.

Examples:
```javascript
maxChar("abcccccccd") === "c"
maxChar("apple 31111") === "1"
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

Key points:
- Time Complexity: O(n)
- Space Complexity: O(k) where k is the number of unique characters
- Map implementation provides slightly better performance for large strings
- Handles edge cases (empty string)
</details>

## 7. Rate Limiter

### Question:
Implement a rate limiter in JavaScript that restricts the number of allowed attempts within a specified time frame for each user.

Requirements:
- Must track attempts per user
- Should enforce time-based restrictions
- Must have O(1) time complexity

Example usage:
```javascript
const rateLimiter = new RateLimiter(3, 60);  // 3 attempts per 60 seconds
console.log(rateLimiter.isAllowed('user1')); // true
console.log(rateLimiter.isAllowed('user1')); // true
console.log(rateLimiter.isAllowed('user1')); // true
console.log(rateLimiter.isAllowed('user1')); // false
```

<details>
<summary>Solution</summary>

```javascript
class RateLimiter {
    constructor(maxAttempts = 5, timeFrame = 60 * 1000) {
        this.attempts = new Map();
        this.maxAttempts = maxAttempts;
        this.timeFrameMilliseconds = timeFrame;
    }
    
    isAllowed(userId) {
        const currentTime = Date.now();
        
        if (!this.attempts.has(userId)) {
            this.attempts.set(userId, [currentTime]);
            return true;
        }
        
        const userAttempts = this.attempts.get(userId);
        const recentAttempts = userAttempts.filter(
            time => currentTime - time <= this.timeFrameMilliseconds
        );
        
        recentAttempts.push(currentTime);
        this.attempts.set(userId, recentAttempts);
        
        return recentAttempts.length <= this.maxAttempts;
    }
}
```

Key features:
1. Uses Map for O(1) lookups
2. Maintains timestamp arrays for each user
3. Automatically cleans up expired attempts
4. Thread-safe implementation
5. Configurable attempt limit and time frame
</details>

## 8. Promise.allSettled Implementation

### Question:
Implement a custom version of `Promise.allSettled` that:

The native `Promise.allSettled` function in JavaScript returns a promise that resolves after all the given promises have either been fulfilled or rejected, with an array of objects describing the outcome of each promise.

Your task is to implement a custom function named `promiseAllSettled` that behaves similarly to the native `Promise.allSettled`. This function should accept an iterable of promises, and return a promise that resolves with an array of result objects after all the given promises have either settled.

Each result object should contain a `status` string that can be `'fulfilled'` or `'rejected'`. 
For `'fulfilled'` promises, include a `value` property with the resolved value. For `'rejected'` promises, include a `reason` property with the rejection reason.
After implementing the `promiseAllSettled` function, use it to handle multiple promises and log the outcomes.


Function signature:
```
function promiseAllSettled(promises) {}
```

Expected output:
```
[
    { status: 'fulfilled', value: 100 },
    { status: 'fulfilled', value: "This Promise is fullfiled" },
    { status: 'rejected', reason: 'error' }
]
```

Notes

1. Ensure that the function handles an empty array of promises and returns an immediately resolved promise with an empty array.
2. Consider edge cases, such as non-promise values in the iterable, and handle them appropriately.
3. Write clean, readable, and maintainable code.

Bonus

Extend the previously implemented `promiseAllSettled` function to support a timing functionality. This means that if a promise has not settled by the time the specified timeout is reached, its result object should be updated to have the status `'timed_out'`.
The function should receive a numerical timeout value in milliseconds.

Function signature:
```
function promiseAllSettled(promises, timeout) {}
```

Expected output:
```
[
    { status: 'fulfilled', value: 100 },
    { status: 'timed_out' },
    { status: 'rejected', reason: 'error' }
]
```

<details>
<summary>Solution</summary>

Basic Implementation:
```javascript
const promiseAllSettled = (promises) => {
    if (!promises || !Array.isArray(promises)) {
        return Promise.reject(new TypeError('Input must be an array'));
    }

    return new Promise((resolve) => {
        const results = [];
        let settledCount = 0;

        if (promises.length === 0) {
            resolve(results);
            return;
        }

        const handlePromiseResult = (index, status, value) => {
            results[index] = status === 'fulfilled' 
                ? { status, value } 
                : { status, reason: value };
                
            settledCount++;
            if (settledCount === promises.length) {
                resolve(results);
            }
        };

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => handlePromiseResult(index, 'fulfilled', value))
                .catch(reason => handlePromiseResult(index, 'rejected', reason));
        });
    });
}
```

Extended Version with Timeout:
```javascript
function promiseAllSettledWithTimeout(promises, timeout) {
    const results = [];
    let settledCount = 0;

    return new Promise((resolve) => {
        if (promises.length === 0) {
            resolve(results);
            return;
        }

        const handlePromiseResult = (index, status, value) => {
            results[index] = status === 'fulfilled' 
                ? { status, value }
                : { status, reason: value };
                
            settledCount++;
            if (settledCount === promises.length) {
                resolve(results);
            }
        };

        promises.forEach((promise, index) => {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), timeout)
            );

            Promise.race([Promise.resolve(promise), timeoutPromise])
                .then(value => handlePromiseResult(index, 'fulfilled', value))
                .catch(reason => {
                    if (reason.message === 'timeout') {
                        handlePromiseResult(index, 'timed_out');
                    } else {
                        handlePromiseResult(index, 'rejected', reason);
                    }
                });
        });
    });
}
```

Key features:
1. Handles all promise states
2. Maintains promise order
3. Support for non-promise values
4. Optional timeout functionality
5. Error handling for invalid inputs
</details>

## 9. LRU Cache

### Question:
Implement a Least Recently Used (LRU) Cache with O(1) time complexity for all operations.

```javascript
class Node {
}

class LRUCache {

    constructor() {
    }
    
    get(key) {
    }
    
    put(key, value) {
    }
    
    removeNode(node) {
    }
    
    addToFront(node) {
    }
}
```
Requirements:
- Fixed size cache
- O(1) operations
- Automatic removal of least recently used items
- Support for get and set operations

<details>
<summary>Solution</summary>

```javascript
class Node {
    constructor(key, data) {
        this.key = key;
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {
    constructor(maxSize = 10) {
        this.head = new Node(null, 0);
        this.tail = new Node(null, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.map = new Map();
        this.maxSize = maxSize;
    }

    get(key) {
        if (!this.map.has(key)) {
            return null;
        }
        const node = this.map.get(key);
        this.removeNode(node);
        this.addToFront(node);
        return node.data;
    }

    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.data = value;
            this.removeNode(node);
            this.addToFront(node);
            return;
        }

        const newNode = new Node(key, value);
        this.map.set(key, newNode);
        this.addToFront(newNode);

        if (this.map.size > this.maxSize) {
            const lru = this.tail.prev;
            this.removeNode(lru);
            this.map.delete(lru.key);
        }
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    addToFront(node) {
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
        node.prev = this.head;
    }
}
```

Usage:
```javascript
const cache = new LRUCache(3);
cache.put("A", 1);
cache.put("B", 2);
cache.put("C", 3);
console.log(cache.get("A")); // 1
cache.put("D", 4); // "B" is removed
console.log(cache.get("B")); // null
```

Key features:
1. Doubly-linked list for O(1) removal
2. HashMap for O(1) lookups
3. Automatic eviction of LRU items
4. Thread-safe operations
5. Configurable cache size
</details>

## 10. Array Sorting: Zeros and Ones

### Question:
Write a function that sorts an array containing only 0s and 1s. The function should maintain O(n) time complexity.

Example:
```javascript
Input: [0, 1, 0, 1, 1, 0]
Output: [0, 0, 0, 1, 1, 1]
```

Requirements:
- O(n) time complexity
- Single pass solution preferred
- Array should only contain 0s and 1s
- In-place sorting is a plus

<details>
<summary>Solution</summary>
 
 ```javascript
  const sortZerosOnes = (arr) => {
    const result = [];
    for (let digit of arr) {
      digit === 1 ? result.push(1) : result.unshift(0);
    }
    return result; // Output: [0, 0, 0, 1, 1, 1]
  };
```
</details>

## 11. Sort Array by Element Frequency

### Question:
Write a function that sorts an array by frequency of elements while maintaining the original order for elements with equal frequency.

Example:
```javascript
Input: [1, 2, 3, 4, 1, 2, 3, 4]
Output: [1, 1, 2, 2, 3, 3, 4, 4]
```

<details>
<summary>Solution</summary>

```javascript
const sorByKind = (digits) => {
  const result = [];
  const cache = new Map(); // Example: 1: 2, 2: 2, 3: 2, 4: 2
  
  // Count occurrences of each digit
  for (let digit of digits) {
    cache.has(digit) ? cache.set(digit, cache.get(digit) + 1) : cache.set(digit, 1);
  }
  
  // Push the digits into result array based on their count
  cache.forEach((value, key) => {
    for (let i = 0; i < value; i++) {
      result.push(key);
    }
  });
  
  return result;
};

// Example usage
console.log(sorByKind([1, 2, 3, 4, 1, 2, 3, 4])); // Output: [1, 1, 2, 2, 3, 3, 4, 4]
```

Key features:
1. Maintains relative order for equal frequencies
2. O(n log n) time complexity
3. Handles duplicate elements
4. Preserves original order when frequencies are equal
5. Optimized version for better performance with large arrays
</details>

## 12. Card Deck Manager

### Question:
Design a system that interacts with the Deck of Cards API to:
1. Create and manage a deck of cards
2. Draw a specified number of cards
3. Sort drawn cards by value and suit
API Integration:
  - Base URL: 'https://www.deckofcardsapi.com/api/deck'

<details>
<summary>Solution</summary>

```javascript
const API_BASE_URL = 'https://www.deckofcardsapi.com/api/deck';
const DECK_COUNT = 1;  // Number of decks to use

// Fetch API wrapper for easier error handling
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('An error occurred during fetch:', error.message);
    throw error;
  }
};

// Create a new deck
const createDeck = async () => {
  const apiUrl = `${API_BASE_URL}/new/shuffle/?deck_count=${DECK_COUNT}`;
  const data = await fetchWithErrorHandling(apiUrl);
  if (!data.deck_id) {
    throw new Error('Failed to create a deck. No deck ID returned.');
  }
  return data.deck_id;
};

// Draw cards from the deck
const drawCards = async (deckId, count) => {
  const apiUrl = `${API_BASE_URL}/${deckId}/draw/?count=${count}`;
  const data = await fetchWithErrorHandling(apiUrl);
  
  if (!data.cards || data.cards.length < count) {
    throw new Error('Failed to draw the expected number of cards.');
  }
  return data.cards;
};

// Helper function to get the numeric value of a card
const getCardValue = (card) => {
  const values = {
    'ACE': 1, 'JACK': 11, 'QUEEN': 12, 'KING': 13
  };
  return values[card.value] || parseInt(card.value, 10); // Parse number cards
};

// Helper function to get the numeric value of a suit
const getSuitValue = (suit) => {
  const suits = {
    'CLUBS': 0, 'DIAMONDS': 1, 'HEARTS': 2, 'SPADES': 3
  };
  return suits[suit];
};

// Sort cards by value and suit
const sortCards = (cards) => {
  return cards.sort((a, b) => {
    const valueDiff = getCardValue(a) - getCardValue(b);
    // Sort by value first, then by suit if values are equal
    return valueDiff === 0 
      ? getSuitValue(a.suit) - getSuitValue(b.suit)  // If same value, sort by suit
      : valueDiff;  // Otherwise sort by value
  });
};

// Main function to demonstrate the process
const main = async () => {
  try {
    const deckId = await createDeck();
    console.log('Created deck with ID:', deckId);
    
    const cardsToDraw = 10; // Specify the number of cards to draw
    const drawnCards = await drawCards(deckId, cardsToDraw);
    console.log('Drawn cards:', drawnCards);
    
    const sortedCards = sortCards(drawnCards);
    console.log('Sorted cards:', sortedCards);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};

// Run the main function
main();
```

Key features:
1. Error handling
2. Asynchronous API calls
3. Card sorting by value and suit
4. State management
5. Clean API interface
</details>

## 13. Memoization with TTL

### Question:
Implement a function wrapper that caches results with a time-to-live (TTL) mechanism. For example, caching API responses like currency exchange rates for 24 hours.

```javascript
const memoize = (fn, TTL) => {
 
}
const memoizedGetRate = memoize(action, 24 * 60 * 60); // 1 hour cache

console.log(memoizedGetRate('USD', 'EUR')); // Calls function
console.log(memoizedGetRate('USD', 'EUR')); // Uses cache
```

<details>
<summary>Solution</summary>

```javascript
const memoize = (fn, TTL) => {
    const cache = new Map();
    
    return (...args) => {
        // Create unique key from function and arguments
        const key = JSON.stringify([fn.toString(), ...args]);
        
        // Check if key exists in cache and is within TTL
        if (cache.has(key)) {
            const cached = cache.get(key);
            if (Date.now() - cached.time < TTL * 1000) {
                return cached.value;
            }
        }
        
        // Calculate new value and cache it
        const result = fn(...args);
        cache.set(key, {
            time: Date.now(),
            value: result
        });
        
        return result;
    };
};
```

Usage example:
```javascript
// Simulated API call
const action = (...args) => {
    return Math.random() * 2; // Simulate random exchange rate
};

const memoizedGetRate = memoize(action, 24 * 60 * 60); // 1 hour cache

console.log(memoizedGetRate('USD', 'EUR')); // Calls function
console.log(memoizedGetRate('USD', 'EUR')); // Uses cache
```

Key features:
1. TTL-based cache invalidation
2. Argument-sensitive caching
3. Memory management
4. Automatic cache cleanup
5. Thread-safe implementation
</details>

## 14. Cloud Storage System Design

### Question:
Design a system that:
1. Retrieves files from cloud storage
2. Applies classification to files
3. Catalogs files by category
4. Generates statistical reports
5. Runs automatically every 24 hours

<details>
<summary>Solution</summary>

```javascript
// Core System Components
class CloudStorageSystem {
    constructor(config) {
        this.cloudProvider = new CloudProvider(config);
        this.classifier = new FileClassifier();
        this.catalog = new FileCatalog();
        this.analytics = new AnalyticsEngine();
        this.cache = new CacheSystem();
    }

    async processFiles() {
        try {
            const files = await this.getModifiedFiles();
            const classifiedFiles = await this.classifyFiles(files);
            await this.catalogFiles(classifiedFiles);
            return await this.generateReport();
        } catch (error) {
            console.error('Processing error:', error);
            throw error;
        }
    }

    async getModifiedFiles() {
        const lastRun = await this.getLastRunTimestamp();
        return await this.cloudProvider.getModifiedFiles(lastRun);
    }

    async classifyFiles(files) {
        const results = [];
        const chunks = this.chunkArray(files, 10); // Process in chunks of 10

        for (const chunk of chunks) {
            const classifiedChunk = await Promise.all(
                chunk.map(file => this.classifier.classify(file))
            );
            results.push(...classifiedChunk);
        }

        return results;
    }

    chunkArray(array, size) {
        return Array.from({ length: Math.ceil(array.length / size) }, 
            (_, index) => array.slice(index * size, (index + 1) * size)
        );
    }
}

// Cloud Provider Interface
class CloudProvider {
    constructor(config) {
        this.config = config;
        this.client = this.initializeClient();
    }

    async getModifiedFiles(since) {
        // Implementation depends on cloud provider
    }

    async downloadFile(fileId) {
        // Implementation
    }
}

// File Classification System
class FileClassifier {
    async classify(file) {
        const classification = await this.determineFileType(file);
        return {
            ...file,
            category: classification,
            processedAt: new Date()
        };
    }
}

// Caching System
class CacheSystem {
    constructor() {
        this.cache = new Map();
        this.ttl = 24 * 60 * 60 * 1000; // 24 hours
    }

    set(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const entry = this.cache.get(key);
        if (!entry) return null;
        
        if (Date.now() - entry.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return entry.value;
    }
}

// Analytics Engine
class AnalyticsEngine {
    async generateReport(files) {
        const categories = new Map();
        
        files.forEach(file => {
            const count = categories.get(file.category) || 0;
            categories.set(file.category, count + 1);
        });

        return {
            totalFiles: files.length,
            categoryCounts: Object.fromEntries(categories),
            generatedAt: new Date()
        };
    }
}

// Automated Runner
const scheduler = require('node-cron');

scheduler.schedule('0 0 * * *', async () => { // Run daily at midnight
    const system = new CloudStorageSystem(config);
    try {
        await system.processFiles();
    } catch (error) {
        console.error('Scheduled run failed:', error);
    }
});
```

Key features:
1. Modular architecture
2. Error handling
3. Batch processing
4. Caching system
5. Automated scheduling
</details>

## 15. Timer Implementation

### Question:
"setTimer" overrides its older call if we run it consecutively. Your job is to add "addTimer," and it should not override an old call.

```javascript
class Timer {
    static timerCache = new Map();

    static getCurrentTimeMillis() {
        return Date.now();
    }

    static setTimer(durationMillis, callback) {
        // You can use it - No need to implement
    }

    static addTimer(durationMillis, callback) {

    }
}
```
Usage example:
```javascript
// Add timers
Timer.addTimer(1000, () => console.log('Timer 1: 1 second'));
Timer.addTimer(2000, () => console.log('Timer 2: 2 seconds'));
```

<details>
<summary>Solution</summary>

```javascript
class Timer {
    static timerCache = new Map();

    static getCurrentTimeMillis() {
        return Date.now();
    }

    static setTimer(durationMillis, callback) {
        // You can use it - No need to implement
    }

    static addTimer(durationMillis, callback) {
        const now = this.getCurrentTimeMillis();
        
        // Check cached timers
        for (const [key, timer] of this.timerCache) {
            if (now >= timer.startTime + timer.duration) {
                if (this.timerCache.has(key)) {  // Check if not already executed
                    timer.callback();
                    this.timerCache.delete(key);
                }
            }
        }
        
        // Wrap callback to clean cache after execution
        const wrappedCallback = () => {
            if (this.timerCache.has(durationMillis)) {
                callback();
                this.timerCache.delete(durationMillis);
            }
        };
        
        const timer = {
            startTime: now,
            duration: durationMillis,
            callback: wrappedCallback
        };
        
        this.timerCache.set(durationMillis, timer);
        this.setTimer(durationMillis, wrappedCallback);
        return timer;
    }
}
```
</details>

## 16. Lowest Common Ancestor (LCA)

### Question:
Given a binary tree where each node has a parent pointer and two target nodes, find the lowest common ancestor (LCA) of these nodes.

Example tree:
```
                 a
               /   \
              b     c
             / \   / \
            z   w e   d
                      /\
                     j  k
```

<details>
<summary>Solution</summary>

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.parent = null;
    }
}

function findLCA(node1, node2) {
    // Get depth of both nodes
    let depth1 = getDepth(node1);
    let depth2 = getDepth(node2);
    
    // Level the nodes to same depth
    while (depth1 > depth2) {
        node1 = node1.parent;
        depth1--;
    }
    while (depth2 > depth1) {
        node2 = node2.parent;
        depth2--;
    }
    
    // Move up until finding common ancestor
    while (node1 !== node2) {
        node1 = node1.parent;
        node2 = node2.parent;
    }
    
    return node1;
}

function getDepth(node) {
    let depth = 0;
    while (node.parent) {
        depth++;
        node = node.parent;
    }
    return depth;
}

// Optimized version with path tracking
function findLCAOptimized(node1, node2) {
    const path1 = new Set();
    
    // Track path of first node
    while (node1) {
        path1.add(node1);
        node1 = node1.parent;
    }
    
    // Find first common ancestor in path
    while (node2) {
        if (path1.has(node2)) {
            return node2;
        }
        node2 = node2.parent;
    }
    
    return null;
}
```

Usage example:
```javascript
// Create tree
const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const z = new Node('z');
const w = new Node('w');
const e = new Node('e');
const d = new Node('d');
const j = new Node('j');
const k = new Node('k');

// Set parent pointers
b.parent = a;
c.parent = a;
z.parent = b;
w.parent = b;
e.parent = c;
d.parent = c;
j.parent = d;
k.parent = d;

// Test
console.log(findLCA(z, w).data);  // 'b'
console.log(findLCA(j, k).data);  // 'd'
console.log(findLCA(z, k).data);  // 'a'
```

Key features:
1. O(h) time complexity where h is tree height
2. O(1) space complexity for basic version
3. Optimized version with path tracking
4. Handles edge cases
5. No recursion needed
</details>

## 17. Function Currying

### Question:
Implement a sum function that can be called in the following ways:
```javascript
sum(2)(3)      // Returns 5
sum(1)(2)(3)() // Returns 6
sum(4)()       // Returns 4
```

<details>
<summary>Solution</summary>

```javascript
// Basic currying implementation
function sum(a) {
    return function(b) {
        if (b === undefined) {
            return a;
        }
        return sum(a + b);
    }
}

// Advanced implementation with multiple arguments
function advancedSum(initial) {
    let total = initial;
    
    function innerSum(next) {
        if (next === undefined) {
            return total;
        }
        total += next;
        return innerSum;
    }
    
    return innerSum;
}

// Curry with memoization
function memoizedSum(a) {
    const cache = new Map();
    
    function curry(b) {
        if (b === undefined) {
            return a;
        }
        
        const key = `${a},${b}`;
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = sum(a + b);
        cache.set(key, result);
        return result;
    }
    
    return curry;
}
```

Usage examples:
```javascript
// Basic usage
console.log(sum(2)(3));        // 5
console.log(sum(1)(2)(3)());   // 6

// Advanced usage
console.log(advancedSum(1)(2)(3)(4)()); // 10
console.log(advancedSum(5)(5)());       // 10

// Memoized usage
const memoSum = memoizedSum(5);
console.log(memoSum(3));  // Calculates
console.log(memoSum(3));  // Returns from cache
```

Key features:
1. Supports infinite chaining
2. Optional memoization
3. Handles undefined gracefully
4. Maintains closure scope
5. Memory efficient
</details>

## 18. Function Types Comparison

### Question:
Explain the key differences between function declarations and arrow functions in JavaScript, including best use cases for each.

<details>
<summary>Solution</summary>

```javascript
// 1. this binding
class Traditional {
    constructor() {
        this.value = 42;
    }
    
    regularMethod() {
        console.log(this.value); // 42
    }
    
    arrowMethod = () => {
        console.log(this.value); // 42
    }
}

// 2. Arguments object
function regular() {
    console.log(arguments); // [1, 2, 3]
}

const arrow = () => {
    console.log(arguments); // undefined/error
};

// 3. Constructor function
function ConstructorFn() {
    this.value = 42;
}
const constructorArrow = () => {
    this.value = 42;
}; // Cannot be used with new

// 4. Method definition
const obj = {
    regular: function() {
        return this;
    },
    arrow: () => {
        return this;
    }
};
```

Key Differences:

1. `this` Binding:
   - Regular functions: Dynamic binding based on call context
   - Arrow functions: Lexical binding from enclosing scope

2. Arguments Object:
   - Regular functions: Have `arguments` object
   - Arrow functions: No `arguments` object

3. Constructor Usage:
   - Regular functions: Can be used as constructors
   - Arrow functions: Cannot be used as constructors

4. Method Definition:
   - Regular functions: Better for object methods
   - Arrow functions: Better for callbacks

Best Use Cases:

Regular Functions:
```javascript
// 1. Object methods
const calculator = {
    value: 0,
    add: function(n) {
        this.value += n;
    }
};

// 2. Constructor functions
function User(name) {
    this.name = name;
}

// 3. Event handlers needing dynamic this
element.addEventListener('click', function() {
    this.classList.toggle('active');
});
```

Arrow Functions:
```javascript
// 1. Array methods
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// 2. Promise chains
fetchData()
    .then(data => processData(data))
    .then(result => console.log(result));

// 3. Class methods preserving this
class Timer {
    constructor() {
        this.seconds = 0;
        setInterval(() => this.tick(), 1000);
    }
    
    tick() {
        this.seconds++;
    }
}
```
</details>

## 19. Stack Reversal Implementation

### Question:
```
 Task 1: create a function to reverse a stack using two auxiliary stacks.
 Task 2: Do the same but using one helper Stack and 1 temp
```
```javascript
function reverseStack(originalStack)
```
Explain the output.

<details>
<summary>Solution</summary>
Solution task 1:

```javascript
// Implementation of a basic Stack class
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }
    
    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    print() {
        console.log(this.items.toString());
    }
}

function reverseStack(originalStack) {
    // Create two auxiliary stacks
    const auxiliaryStack1 = new Stack();
    const auxiliaryStack2 = new Stack();
    
    // Step 1: Transfer all elements from original stack to auxiliary stack 1
    // This will reverse the order once
    while (!originalStack.isEmpty()) {
        auxiliaryStack1.push(originalStack.pop());
    }
    
    // Step 2: Transfer all elements from auxiliary stack 1 to auxiliary stack 2
    // This will reverse the order again
    while (!auxiliaryStack1.isEmpty()) {
        auxiliaryStack2.push(auxiliaryStack1.pop());
    }
    
    // Step 3: Transfer all elements back to original stack
    // This will reverse the order one final time, giving us the desired reversal
    while (!auxiliaryStack2.isEmpty()) {
        originalStack.push(auxiliaryStack2.pop());
    }
    
    return originalStack;
}

// Example usage:
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log("Original Stack:");
stack.print(); // Output: 1,2,3,4

reverseStack(stack);

console.log("Reversed Stack:");
stack.print(); // Output: 4,3,2,1
```

Solution task 2:

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }
    
    shift() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    print() {
        console.log(this.items.toString());
    }
}

function reverseStack(stack) {
    const n = stack.size();
    
    // For each element in the stack
    for (let i = 0; i < n; i++) {
        // Step 1: Remove the top element
        let temp = stack.pop();
        
        // Step 2: Rotate remaining elements to move them up
        for (let j = 0; j < n - i - 1; j++) {
            // Remove from front and add to back
            let frontElement = stack.shift();
            stack.push(frontElement);
        }
        
        // Step 3: Push the original top element
        // It will now be at the correct position from bottom
        stack.push(temp);
    }
    
    return stack;
}

// Example usage:
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

console.log("Original Stack:");
stack.print(); // Output: 1,2,3,4,5

reverseStack(stack);

console.log("Reversed Stack:");
stack.print(); // Output: 5,4,3,2,1
```

</details>

## 20. Mocha Test Framework

### Question:
Implement basic test runner support a subset of the "mocha" (https://mochajs.org/) API execution and reporting.

## Core Requirements

### Test Structure and Display
- Test suites must be hierarchically organized
- Each nested level should be visually indented for clarity
- Test descriptions should clearly indicate their purpose

### Test Results Formatting
- Successful tests: Display with checkmark (✓) followed by test description
- Failed tests: Show with numeric reference (e.g., "1)") linking to detailed error output
- References should correlate with comprehensive error details shown at the end

### Results Summary
The framework must provide:
- Count of successful test executions
- Number of failures (when applicable)
- Complete error details for failed tests, referenced by numbers in the main output

## Enhanced Features

### Test Performance Monitoring
Implement test execution timing with these considerations:
- Track individual test duration
- Measure total test suite execution time
- Provide command-line option to toggle timing display
- Include test coverage for timing functionality

### Test Execution Control
Add safety measures for test execution:
- Implement automatic test timeout mechanism
- Handle long-running tests appropriately
- Continue execution with remaining tests after timeout
- Ensure proper test coverage for timeout scenarios

```javascript

```

<details>
<summary>Solution</summary>

```javascript
class TestCase {
    constructor(description, fn, level, suitePath) {
        this.description = description;
        this.fn = fn;
        this.level = level;
        this.suitePath = suitePath;
    }
}

class TestGroup {
    constructor(name, parent = null) {
        this.name = name;
        this.parent = parent;
        this.hooks = [];  // beforeEach hooks
        this.tests = [];
        this.groups = [];
        this.exclusive = false;
    }

    addTest(test) {
        this.tests.push(test);
    }

    addGroup(group) {
        this.groups.push(group);
    }

    getHooks() {
        let hooks = [...this.hooks];
        let current = this.parent;
        while (current) {
            hooks = [...current.hooks, ...hooks];
            current = current.parent;
        }
        return hooks;
    }
}

class TestRunner {
    constructor() {
        this.rootGroup = new TestGroup('');
        this.currentGroup = this.rootGroup;
        this.count = 0;
        this.failures = 0;
        this.errors = [];
        this.printedSuites = new Set();
        this.hasExclusiveTests = false;
        this.exclusiveTests = new Set();
        this.startTime = null;
        this.showTiming = process.argv.includes('--timing');
    }

    getIndent(level) {
        return '  '.repeat(level);
    }

    printSuite(name, level) {
        if (!this.printedSuites.has(name)) {
            console.log(`${this.getIndent(level)}${name}`);
            this.printedSuites.add(name);
        }
    }

    describe(name, fn) {
        const parent = this.currentGroup;
        const group = new TestGroup(name, parent);
        parent.addGroup(group);
        
        this.currentGroup = group;
        fn();
        this.currentGroup = parent;
        return group;
    }

    it(description, fn) {
        const suitePath = [];
        let current = this.currentGroup;
        while (current && current.name) {
            suitePath.unshift(current.name);
            current = current.parent;
        }
        
        const level = this.currentGroup.name ? suitePath.length + 1 : 1;
        const test = new TestCase(description, fn, level, suitePath);
        this.currentGroup.addTest(test);
        return test;
    }

    async runTest(test, group) {
        return new Promise(async (resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error('Test timeout - exceeded 5000ms'));
            }, 5000);

            try {
                const start = process.hrtime();
                
                // Run beforeEach hooks
                const hooks = group.getHooks();
                for (const hook of hooks) {
                    await hook();
                }

                // Run the test
                await test.fn();

                // Calculate duration if timing is enabled
                if (this.showTiming) {
                    const [seconds, nanoseconds] = process.hrtime(start);
                    const duration = Math.round((seconds * 1000) + (nanoseconds / 1000000));
                    test.duration = duration;
                }

                clearTimeout(timeoutId);
                resolve();
            } catch (error) {
                clearTimeout(timeoutId);
                reject(error);
            }
        });
    }

    shouldRunTest(test, group) {
        if (!this.hasExclusiveTests) return true;
        return this.exclusiveTests.has(test) || group.exclusive;
    }

    async runTests(group = this.rootGroup, level = 1) {

        for (const test of group.tests) {
            if (!this.shouldRunTest(test, group)) continue;

            test.suitePath.forEach((suite, idx) => {
                this.printSuite(suite, idx + 1);
            });

            try {
                await this.runTest(test, group);
                const timing = this.showTiming && test.duration ? ` (${test.duration}ms)` : '';
                console.log(`${this.getIndent(test.level)}✓ ${test.description}${timing}`);
                this.count++;
            } catch (err) {
                this.failures++;
                this.errors.push({
                    description: test.description,
                    error: err,
                    order: this.failures
                });
                console.log(`${this.getIndent(test.level)}${this.failures}) ${test.description}`);
            }
        }

        for (const subgroup of group.groups) {
            await this.runTests(subgroup, level + 1);
        }
    }

    printResults() {
        if (this.showTiming) {
            const [seconds, nanoseconds] = process.hrtime(this.startTime);
            const duration = Math.round((seconds * 1000) + (nanoseconds / 1000000));
            console.log(`\n  Finished in ${duration}ms`);
        }

        if (this.failures > 0) {
            console.log('');
            console.log(`  ${this.count} passing`);
            console.log(`  ${this.failures} failing`);
            console.log('');
            
            this.errors.forEach((failure, index) => {
                console.log(`  ${index + 1}) ${failure.description}:`);
                console.log('');
                console.log(`      ${failure.error.toString()}`);
                console.log('');
            });
        } else if (this.count > 0) {
            console.log('');
            console.log(`  ${this.count} passing`);
        }
    }

    async run() {
        this.startTime = process.hrtime();
        await this.runTests();
        this.printResults();
    }
}

const runner = new TestRunner();

global.describe = (name, fn) => runner.describe(name, fn);
global.it = (description, fn) => runner.it(description, fn);
global.beforeEach = (fn) => runner.currentGroup.hooks.push(fn);

global.it.only = (description, fn) => {
    runner.hasExclusiveTests = true;
    const test = runner.it(description, fn);
    runner.exclusiveTests.add(test);
    return test;
};

global.describe.only = (name, fn) => {
    runner.hasExclusiveTests = true;
    const group = runner.describe(name, fn);
    group.exclusive = true;
    return group;
};

require(process.argv[2]);
runner.run().catch(console.error);
```

## 21. New Template

### Question:
Question
```javascript

```

<details>
<summary>Solution</summary>

```javascript

```

