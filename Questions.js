// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Full stack - 2 hours task Mid/Senior levels 
// Build a Web Application with the following requirements:
// 1. Create express.js: “Server1”
// a. Add a connection to MongoDB
// b. Create Users schema: (username: Cymulate, password: Cymulate)
// c. Add Authentication via passport.js (JWT)
// d. Send data & requests to “Server2” with AES encryption
// e. Receive the data from “Server2”, decrypt it and send to the client
// f. Add Audit log Schema for create, update and delete operations

// 2. Create express.js “Server2”
// a. Use the same MongoDB connection from “Server1”
// b. Create Settings schema: (key: String, value: JSON)
// c. JSON: {“a”: {“b”: {“c”: “d”} } } - some nested json
// d. Get the data from Server1, decrypt it and save to MongoDB

// 3. Handle 4 routes: (for one row only in Settings collection)
// a. Get
// b. Create (only if not exist)
// c. Edit
// d. Delete

// 4. Create React \ EJS Client application
// a. View
// b. Buttons for: create, update and delete

// Additional Information:
// 1. ES6 +
// 2. MVC Architecture
// 3. Data Encryption transport
// 4. Audit log
// 5. Clean code
// 6. You can replace passport.js with any package you want
// Extra (not mandatory):
// ● Create a cron job to remove logs older than 5 hours (every 1 hour)

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// Given a string, return the character that is most commonly used in the string.
// Examples:
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// Implement a rate limiter in JavaScript that restricts the number of allowed attempts within 
// a specified time frame for each user.

// Implement an isAllowed method that takes a userId and returns true if the user is allowed to proceed
// (i.e., they haven't exceeded the maximum number of attempts in the given timeframe) and false otherwise.

// const rateLimiter = new RateLimiter(3, 60); 

// console.log(rateLimiter.isAllowed('user1')); // true
// console.log(rateLimiter.isAllowed('user1')); // true
// console.log(rateLimiter.isAllowed('user1')); // true
// console.log(rateLimiter.isAllowed('user1')); // false

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// Promise.allSettled Task
// The native Promise.allSettled function in JavaScript returns a promise that resolves after all the given promises have either 
// been fulfilled or rejected, with an array of objects describing the outcome of each promise.

// Your task is to implement a custom function named promiseAllSettled that behaves similarly to the native Promise.allSettled.
// This function should accept an iterable of promises, and return a promise that resolves with an array of result objects after all the given promises have either settled.

// Each result object should contain a status string that can be 'fulfilled' or 'rejected'. For 'fulfilled' promises,
// include a value property with the resolved value. For 'rejected' promises, include a reason property with the rejection reason.
// After implementing the promiseAllSettled function, use it to handle multiple promises and log the outcomes.

// Function signature:
// function promiseAllSettled(promises) {}

// Expected output:
// [
//     { status: 'fulfilled', value: 100 },
//     { status: 'fulfilled', value: "This Promise is fullfiled" },
//     { status: 'rejected', reason: 'error' }
// ]

// Notes
// Ensure that the function handles an empty array of promises and returns an immediately resolved promise with an empty array.
// Consider edge cases, such as non-promise values in the iterable, and handle them appropriately.
// Write clean, readable, and maintainable code.

// Bonus
// Extend the previously implemented promiseAllSettled function to support a timing functionality. 
//This means that if a promise has not settled by the time the specified timeout is reached, 
// its result object should be updated to have the status 'timed_out'. The function should receive a numerical timeout value in milliseconds.

// Function signature:
// function promiseAllSettled(promises, timeout) {}

// Expected output:

// [
//     { status: 'fulfilled', value: 100 },
//     { status: 'timed_out' },
//     { status: 'rejected', reason: 'error' }
// ]

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// Design and implement a Least Recently Used (LRU) Cache data structure that provides 
// the following operations in O(1) time complexity:

// get(key): Get the value associated with the key if it exists in the cache, otherwise return -1.
// put(key, value): Insert or replace the value if the key exists. When the cache reaches its capacity, 
//                  it should invalidate the least recently used item before inserting a new item.

// Example:
// LRUCache cache = new LRUCache(2);  // capacity = 2
// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// cache.get(2);       // returns -1 (not found)
// cache.put(4, 4);    // evicts key 1
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4

// Constraints:
// - The capacity is always positive
// - get and put operations must run in O(1) time complexity

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// Array Sorting: Zeros and Ones
// Given an array containing only 0s and 1s, write a function that sorts the array such that all 0s come before all 1s. 
// The function should maintain O(n) time complexity.

// Example:
// Input: [0, 1, 0, 1, 1, 0]
// Output: [0, 0, 0, 1, 1, 1]

// Constraints:
// - The array will only contain 0s and 1s
// - The array length can be between 1 and 10^5
// - Must maintain O(n) time complexity
// - Try to solve it in a single pass through the array

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// Sort Array by Element Frequency
// Write a function that sorts an array of integers where elements of the same value should be grouped together. 
// The relative ordering of different numbers should be based on when they first appear in the input array.

// Example:
// Input: [1, 2, 3, 4, 1, 2, 3, 4]
// Output: [1, 1, 2, 2, 3, 3, 4, 4]

// Requirements:
// 1. Maintain the relative order of different numbers based on their first occurrence
// 2. Group identical numbers together
// 3. The solution should work with any positive integers
// 4. Time complexity should be O(n), where n is the length of the input array

// Follow-up questions:
// 1. How would you modify your solution if you needed to sort by frequency (most frequent elements first)?
// 2. What if the array contained negative numbers?
// 3. What if you needed to minimize space complexity?

// Can you implement a function sortByKind(digits) that meets these requirements?

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// Card Deck Manager Challenge
// Design a system that interacts with the Deck of Cards API (https://deckofcardsapi.com)
// to manage and manipulate playing cards. 

// 1. Create and manage a deck of cards
// 2. Draw a specified number of cards
// 3. Sort drawn cards by both value and suit

// API Integration:
//   - Base URL: 'https://www.deckofcardsapi.com/api/deck'

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// Memoization
// Design a memoization system that caches function results with an expiration time 
// The system should cache the results of expensive function calls and return 
// the cached result if it hasn't expired.

// Create a memoize function

// Example Usage:
// // Define test functions
// const add = (a, b) => a + b;
// const format = (a, b) => `${a} to ${b}`;

// // Create memoized
// const memoizedAdd = memoize(add, 5);
// const memoizedFormat = memoize(format, 5);

// // Test cases
// console.log(memoizedAdd(2, 3));     // Computes: 5
// console.log(memoizedAdd(2, 3));     // Returns cached: 5
// console.log(memoizedFormat(2, 3));  // Computes: "2 to 3"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// You need to design a system that performs the following actions:
// Retrieve files from cloud storage.
// Apply a classification function (to be provided) to each file.
// Catalog the files according to the received categories.

// Generate a statistical report on the number of files in each category.
// Quick initial solution (without consideration of performance).
// Additional Requirements:
// The process should run automatically every 24 hours.
// Performance and efficiency of the system should be considered.

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question:
// class Timer {
//     // Store active timers in an array
//     static activeTimers = [];

//     // Returns the current time in milliseconds
//     static getCurrentTimeMillis() {
//         return Date.now();
//     }

//     // Existing setTimer function; uses duration and callback (no changes needed)
//     static setTimer(durationMillis, callback) {
//         // You can use it - No need to implement
//     }

//     // Adds a timer without interrupting other active timers
//     static addTimer(durationMillis, callback) {
//        // Implement
//     }
// }

// Example usage:
// Timer.addTimer(100, () => { console.log("Hi!"); });

// Assume that there is a whait some time logic

// Timer.addTimer(100, () => { console.log("Hi again"); });

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Lowest Common Ancestor (LCA) Problem with Parent Pointers
// Problem Description
// Given a binary tree where each node has a parent pointer and two target nodes, find the lowest common ancestor (LCA) of these nodes.
// The LCA is the deepest node that is an ancestor to both target nodes. Note that a node can be an ancestor of itself.
// Example Tree Structure
//                              a
//                            /  \
//                          b     c
//                         / \   / \
//                       z   w e   d
//                                 /\
//                                j  k
// class Node {
//     constructor(data) {
//         this.data = data;
//         this.parent = null;
//     }
// }
// Complexity
// Time Complexity: O(h) where h is the height of the tree
// Space Complexity: O(1) as we only use a constant amount of extra space

// You should explain JavaScript principles and techniques of LCA 
// Recursion: Implementing recursive calls to traverse the binary tree.
// Tree Traversal: Understanding the structure of binary trees and using traversal techniques (in this case, Depth-First Search) to solve the problem.
// Conditionals and Logical Operators: Using conditionals to determine the base cases and logical operators to return the correct node.
// Optimal Complexity: Designing an algorithm to meet the requirements of 𝑂(ℎ)
// O(h) time complexity and 𝑂(1)
// O(1) space complexity, considering both efficiency and constraints.

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question 
// Task: Implement a function sum such that:
// It can be called as sum(2)(3) and return the sum.
// It can take multiple arguments in a curried form, like sum(1)(2)(3)(4)(), where the empty parentheses () signify the end of input and return the total sum.

// Task: Implement a cache for a sum function. The function should calculate the sum only on the first call with a unique set of arguments.
// If it’s called again with the same parameters, it should return the cached answer.

//function cachedSum() { }
// Usage:
//const sum = cachedSum();

// console.log(sum(2, 3)); // Calculating result -> 5
// console.log(sum(2, 3)); // Fetching from cache -> 5
// console.log(sum(1, 2, 3)); // Calculating result -> 6

// You should explain JavaScript principles and techniques of sum(2)(3) 
// Currying: Breaking down a function that takes multiple arguments into a series of functions that each take one argument.
// Closures: Using closures to maintain the accumulated value across multiple function calls.
// Recursion: Leveraging recursive calls to continue accumulating values until a terminating condition (no arguments) is met.
// Higher-Order Functions: Returning a function from another function, allowing function chaining.

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Question: 
// Function Declaration (function) VS Arrow Function (() => {}) :
// Answer:
// Function Declaration (function):
// When you need dynamic this binding.
// For methods within objects that need to access this of the calling context.
// When using the arguments object.
// For functions that need to be used as constructors (using new).

// Arrow Function (() => {}):
// For simple callbacks, especially in array methods like map, filter, and reduce.
// For short, single-purpose functions that don’t need their own this context or arguments.
// For maintaining lexical this, such as when working with closures or nested functions.
// In summary: Use regular functions when you need more control over this or arguments or when using constructors.
//  Use arrow functions for shorter, lexical-scope-preserving functions, 
//  especially in callbacks and closures where this should be inherited.

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



