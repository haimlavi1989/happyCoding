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
let a = { key: '123'};
let b = { key: '123'};
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

Here's a high-level architecture overview:

```javascript
// Server 1 - Main Server
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const crypto = require('crypto');

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Audit Log Schema
const auditSchema = new mongoose.Schema({
    action: String,
    userId: String,
    timestamp: Date,
    details: Object
});

// Authentication Middleware
const auth = passport.authenticate('jwt', { session: false });

// Encryption Helper
const encrypt = (data) => {
    // AES encryption implementation
};

// Routes
app.post('/api/data', auth, async (req, res) => {
    // Handle data, encrypt, send to Server2
});
```

```javascript
// Server 2 - Data Handler
const express = require('express');
const mongoose = require('mongoose');

// Settings Schema
const settingsSchema = new mongoose.Schema({
    key: String,
    value: Object
});

// CRUD Routes
app.get('/api/settings/:key', async (req, res) => {
    // Implementation
});

app.post('/api/settings', async (req, res) => {
    // Implementation
});

app.put('/api/settings/:key', async (req, res) => {
    // Implementation
});

app.delete('/api/settings/:key', async (req, res) => {
    // Implementation
});
```

```javascript
// React Client
import React, { useState, useEffect } from 'react';

const App = () => {
    const [settings, setSettings] = useState([]);

    useEffect(() => {
        // Fetch settings
    }, []);

    return (
        <div>
            {/* Implementation */}
        </div>
    );
};
```

Key Features:
1. JWT Authentication
2. AES Encryption for data transfer
3. Audit logging
4. CRUD operations
5. React frontend
6. MongoDB integration

Optional Cron Job for Log Cleanup:
```javascript
const cron = require('node-cron');

cron.schedule('0 * * * *', async () => {
    const fiveHoursAgo = new Date(Date.now() - 5 * 60 * 60 * 1000);
    await AuditLog.deleteMany({ timestamp: { $lt: fiveHoursAgo } });
});
```
</details>

## 6. Character Frequency

### Question:
Given a string, return the character that is most commonly used in the string.

Examples:
```javascript
maxChar("abcccccccd") === "c"
maxChar("apple 1231111") === "1"
```

<details>
<summary>Solution</summary>

Here are two implementations:

1. Basic Solution:
```javascript
function maxChar(str) {
    const countChars = {};
    let maxFrequencyLetter = str[0];

    for (let char of str) {
        if (countChars[char]) {
            countChars[char]++;
        } else {
            countChars[char] = 1;
        }
        
        if (countChars[char] > countChars[maxFrequencyLetter]) {
            maxFrequencyLetter = char;
        }
    }
    
    return maxFrequencyLetter;
}
```

2. Optimized Solution using Map:
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
        
        if (recentAttempts.length < this.maxAttempts) {
            recentAttempts.push(currentTime);
            this.attempts.set(userId, recentAttempts);
            return true;
        }
        
        return false;
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
1. Handles multiple promises
2. Returns results in the same format as native implementation
3. Supports timeout functionality

Example usage:
```javascript
const promises = [
    Promise.resolve(100),
    Promise.resolve("Success"),
    Promise.reject('error')
];

promiseAllSettled(promises).then(console.log);
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
Design and implement a Least Recently Used (LRU) Cache with O(1) time complexity for all operations.

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

Here are two approaches:

1. Simple One-Pass Solution:
```javascript
const sortZerosOnes = (arr) => {
    const result = [];
    
    for (let digit of arr) {
        digit === 0 ? result.unshift(0) : result.push(1);
    }
    
    return result;
};
```

2. Optimized In-Place Solution:
```javascript
const sortZerosOnesInPlace = (arr) => {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Move left pointer until we find a 1
        while (left < right && arr[left] === 0) left++;
        // Move right pointer until we find a 0
        while (left < right && arr[right] === 1) right--;
        
        // Swap elements if pointers haven't crossed
        if (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
    
    return arr;
};
```

Key features:
1. O(n) time complexity
2. No extra space in the in-place version
3. Stable sorting
4. Single pass through the array
5. Handles edge cases (empty array, single element)
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
const sortByFrequency = (arr) => {
    // Count frequencies
    const frequencyMap = new Map();
    arr.forEach(num => {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    });

    // Create array of unique elements with their frequencies
    const uniqueElements = [...new Set(arr)];

    // Sort by frequency and original order
    uniqueElements.sort((a, b) => {
        const freqDiff = frequencyMap.get(b) - frequencyMap.get(a);
        if (freqDiff !== 0) return freqDiff;
        return arr.indexOf(a) - arr.indexOf(b);
    });

    // Build result array
    const result = [];
    uniqueElements.forEach(num => {
        const frequency = frequencyMap.get(num);
        result.push(...Array(frequency).fill(num));
    });

    return result;
};

// More efficient version for large arrays
const sortByFrequencyOptimized = (arr) => {
    const freqMap = new Map();
    const firstOccurrence = new Map();
    
    // Track frequency and first occurrence
    arr.forEach((num, index) => {
        if (!firstOccurrence.has(num)) {
            firstOccurrence.set(num, index);
        }
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    });
    
    return arr.sort((a, b) => {
        const freqDiff = freqMap.get(b) - freqMap.get(a);
        if (freqDiff !== 0) return freqDiff;
        return firstOccurrence.get(a) - firstOccurrence.get(b);
    });
};
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

<details>
<summary>Solution</summary>

```javascript
const API_BASE_URL = 'https://www.deckofcardsapi.com/api/deck';
const DECK_COUNT = 1;

class DeckManager {
    constructor() {
        this.deckId = null;
        this.drawnCards = [];
    }

    // Fetch wrapper with error handling
    async fetchWithErrorHandling(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Create new deck
    async createDeck() {
        const url = `${API_BASE_URL}/new/shuffle/?deck_count=${DECK_COUNT}`;
        const data = await this.fetchWithErrorHandling(url);
        this.deckId = data.deck_id;
        return this.deckId;
    }

    // Draw cards
    async drawCards(count) {
        if (!this.deckId) throw new Error('No deck created');
        
        const url = `${API_BASE_URL}/${this.deckId}/draw/?count=${count}`;
        const data = await this.fetchWithErrorHandling(url);
        
        this.drawnCards.push(...data.cards);
        return data.cards;
    }

    // Sort cards
    sortCards() {
        const valueOrder = {
            'ACE': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
            '8': 8, '9': 9, '10': 10, 'JACK': 11, 'QUEEN': 12, 'KING': 13
        };
        
        const suitOrder = {
            'CLUBS': 0, 'DIAMONDS': 1, 'HEARTS': 2, 'SPADES': 3
        };

        return [...this.drawnCards].sort((a, b) => {
            // Sort by value first
            const valueDiff = valueOrder[a.value] - valueOrder[b.value];
            if (valueDiff !== 0) return valueDiff;
            
            // Then by suit
            return suitOrder[a.suit] - suitOrder[b.suit];
        });
    }
}

// Usage example
async function main() {
    try {
        const deck = new DeckManager();
        await deck.createDeck();
        
        const drawnCards = await deck.drawCards(5);
        console.log('Drawn cards:', drawnCards);
        
        const sortedCards = deck.sortCards();
        console.log('Sorted cards:', sortedCards);
    } catch (error) {
        console.error('Error:', error);
    }
}
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
const action = () => {
    return 100.50; // Simulating API call
}

const getDailyQuotes = memoize(action, 24 * 60 * 60); // 24 hour TTL
```

<details>
<summary>Solution</summary>

```javascript
const memoize = (fn, TTL) => {
    const cache = new Map();
    
    return (...args) => {
        // Create unique key from function and arguments
        const key = JSON.stringify([fn.toString(), ...args]);
        
        const cached = cache.get(key);
        
        // Return cached value if within TTL
        if (cached && (Date.now() - cached.time < TTL * 1000)) {
            return cached.value;
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

// Enhanced version with automatic cache cleanup
const memoizeWithCleanup = (fn, TTL) => {
    const cache = new Map();
    
    // Cleanup function
    const cleanup = () => {
        const now = Date.now();
        for (const [key, entry] of cache.entries()) {
            if (now - entry.time >= TTL * 1000) {
                cache.delete(key);
            }
        }
    };
    
    // Set periodic cleanup
    setInterval(cleanup, TTL * 1000);
    
    return (...args) => {
        const key = JSON.stringify([fn.toString(), ...args]);
        const cached = cache.get(key);
        
        if (cached && (Date.now() - cached.time < TTL * 1000)) {
            return cached.value;
        }
        
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
const getExchangeRate = (from, to) => {
    console.log('Fetching exchange rate...'); // Shows when actually calling API
    return Math.random() * 2; // Simulate random exchange rate
};

const memoizedGetRate = memoize(getExchangeRate, 3600); // 1 hour cache

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
Implement a Timer class that can:
1. Store active timers
2. Get current time in milliseconds
3. Add timers without interrupting existing ones
4. Handle multiple concurrent timers

<details>
<summary>Solution</summary>

```javascript
class Timer {
    static timerCache = new Map();
    
    static getCurrentTimeMillis() {
        return Date.now();
    }
    
    static setTimer(durationMillis, callback) {
        return setTimeout(callback, durationMillis);
    }
    
    static addTimer(durationMillis, callback) {
        const currentTime = this.getCurrentTimeMillis();
        
        // Check and execute expired timers
        for (const [duration, timer] of this.timerCache.entries()) {
            if (currentTime >= timer.startTime + timer.duration) {
                timer.callback();
                this.timerCache.delete(duration);
            }
        }
        
        // Create new timer
        const timer = {
            startTime: currentTime,
            duration: durationMillis,
            callback: callback,
            timerId: this.setTimer(durationMillis, () => {
                callback();
                this.timerCache.delete(durationMillis);
            })
        };
        
        this.timerCache.set(durationMillis, timer);
        return timer;
    }
    
    static cancelTimer(durationMillis) {
        const timer = this.timerCache.get(durationMillis);
        if (timer) {
            clearTimeout(timer.timerId);
            this.timerCache.delete(durationMillis);
            return true;
        }
        return false;
    }
    
    static getActiveTimers() {
        const currentTime = this.getCurrentTimeMillis();
        return Array.from(this.timerCache.values())
            .filter(timer => currentTime < timer.startTime + timer.duration);
    }
}
```

Usage example:
```javascript
// Add timers
Timer.addTimer(1000, () => console.log('Timer 1: 1 second'));
Timer.addTimer(2000, () => console.log('Timer 2: 2 seconds'));

// Check active timers
console.log(Timer.getActiveTimers());

// Cancel a timer
Timer.cancelTimer(2000);
```

Key features:
1. Concurrent timer support
2. Timer cancellation
3. Active timer tracking
4. Memory management
5. Thread-safe implementation
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