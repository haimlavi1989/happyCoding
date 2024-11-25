# JavaScript Utility Functions

A collection of commonly used JavaScript utility functions for everyday development tasks.

## Table of Contents

- [Number Utilities](#number-utilities)
  - [Format Number with Commas](#format-number-with-commas)
  - [Round to Decimal Places](#round-to-decimal-places)
  - [Basic Conversions](#basic-conversions)
    - [toString](#tostring)
    - [toFixed](#tofixed)
    - [parseInt / parseFloat](#parseint--parsefloat)
  - [Math Methods](#math-methods)
 
- [Object Utilities](#object-utilities)
  - [Deep Clone](#deep-clone)
  - [Pick](#pick)
  - [Deep Merge](#deep-merge)
  - [Get Nested Object Value](#get-nested-object-value)
  - [Remove Empty Values](#remove-empty-values)

- [Date Utilities](#date-utilities)
  - [Format Date](#format-date)
  - [Add Days to Date](#add-days-to-date)
  - [Get Date Difference](#get-date-difference)
  - [Date Methods](#date-methods)
  - [Days Passed](#days-passed)

- [Validation Utilities](#validation-utilities)
  - [Check if Email is Valid](#check-if-email-is-valid)
  - [Check if URL is Valid](#check-if-url-is-valid)
  - [Check if Date is Valid](#check-if-date-is-valid)

- [String Utilities](#string-utilities)
  - [Capitalize First Letter](#capitalize-first-letter)
  - [Generate Slug](#generate-slug)
  - [Truncate String](#truncate-string)
  - [Word Only](#word-only)
  - [Split and Join](#split-and-join)
  - [Trim](#trim)
  - [Slice](#slice)
  - [Substring](#substring)
  - [toLowerCase / toUpperCase](#tolowercase--touppercase)
  - [Replace / ReplaceAll](#replace--replaceall)
  - [StartsWith / EndsWith](#startswith--endswith)
  - [String Search and Transform](#string-search-and-transform)

- [Array Utilities](#array-utilities)
  - [Remove Duplicates](#remove-duplicates)
  - [Flatten Nested Array](#flatten-nested-array)
  - [Get Random Item](#get-random-item)
  - [Chunk Array](#chunk-array)
  - [Find](#find)
  - [Some and Every](#some-and-every)
  - [ForEach](#foreach)
  - [FindIndex](#findindex)
  - [Splice](#splice)
  - [Sort](#sort)
  - [Reverse](#reverse)
  - [Array Filtering and Transformation](#array-filtering-and-transformation)
  - [Sort Objects by Property](#sort-objects-by-property)
  - [Array to Map Conversion](#array-to-map-conversion)

- [Function Utilities](#function-utilities)
  - [Debounce](#debounce)
  - [Throttle](#throttle)
  - [Memoization](#memoization)
  - [Recursive Functions](#recursive-functions)

- [Cache Utilities](#cache-utilities)
  - [Complex Key Cache](#complex-key-cache)
  - [Cache Counter](#cache-counter)
  - [ExpiredTTL](#expiredttl)
  - [ExecutionTrigger](#executiontriger)

- [Promise Utilities](#promise-utilities)
  - [Promise.all Implementation](#promiseall-implementation)
  - [API Calls with Fetch](#api-calls)
  - [Mock API](#mock-api)

- [Error Handling](#error-handling)
  - [Safe Execute](#safe-execute)
  - [Try-Catch Pattern](#try-catch-pattern)

- [Algorithms](#algorithms)
  - [Binary Search](#binary-search)
  - [isAnagram](#isanagram)
  - [Fibonacci](#fibonacci)
  - [Swap](#swap)

- [Design Patterns](#design-patterns)
  - [Singleton Pattern](#singleton-pattern)
  - [Observer Pattern](#observer-pattern)
  - [Factory Pattern](#factory-pattern)
  - [Virtual List Renderer](#virtual-list-renderer)

- [Performance Utilities](#performance-utilities)
  - [Measure Function Execution Time](#measure-function-execution-time)

- [Map Operations](#map-operations)
  - [Basic Map Methods](#basic-map-methods)
  - [Map Iteration](#map-iteration)

- [Browser Utilities](#browser-utilities)
  - [Copy to Clipboard](#copy-to-clipboard)
  - [Generate UUID](#generate-uuid)

- [Async Utilities](#async-utilities)
  - [Sleep/Delay](#sleepdelay)
  - [Retry Function](#retry-function)

- [Best Practices](#best-practices)
  - [Array Tips](#array-tips)
  - [String Tips](#string-tips)
  - [Optimization Tips](#optimization-tips)

## Functions

### Debounce
Useful for rate-limiting function calls, especially in real-time search scenarios.

```javascript
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Usage example:
const handleSearch = debounce((searchTerm) => {
  console.log('Searching:', searchTerm);
}, 300);

input.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```

### Memoization
Caches function results for improved performance with expensive operations.

```javascript
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
```

### Deep Clone
Creates a deep copy of objects and arrays.

```javascript
const deepClone = obj => JSON.parse(JSON.stringify(obj));
```

### Pick
Selects specific properties from objects.

```javascript
const pick = (obj, keys) =>
  keys.reduce((acc, key) => (key in obj ? { ...acc, [key]: obj[key] } : acc), {});

// Array version
const pickFromArray = (arr, keys) => arr.map(obj => pick(obj, keys));

// Usage example:
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  password: "123456"
};
const publicInfo = pick(user, ['name', 'email']);
```

### Event Delegation
Efficiently handles events on multiple child elements.

```javascript
const delegateEvent = (element, eventType, selector, handler) => {
  element.addEventListener(eventType, event => {
    const target = event.target.closest(selector);
    if (target) {
      handler(event, target);
    }
  });
};
```

### Array Utilities

#### Remove Duplicates
```javascript
const unique = arr => [...new Set(arr)];
```

#### Flatten Nested Array
```javascript
const flatten = arr => arr.reduce((flat, next) => 
  flat.concat(Array.isArray(next) ? flatten(next) : next), []);
```

#### Get Random Item
```javascript
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
```

#### Chunk Array
```javascript
const chunk = (arr, size) => 
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => 
    arr.slice(i * size, (i + 1) * size));
```

### String Utilities

#### Capitalize First Letter
```javascript
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
```

#### Generate Slug
```javascript
const slugify = str => str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-');

// Usage example:
console.log(slugify("Product Name 123 @#$")); // "product-name-123"
```

#### Truncate String
```javascript
const truncate = (str, length, ending = '...') =>
  str.length > length ? str.substring(0, length - ending.length) + ending : str;

// Usage example:
console.log(truncate("Hello World!", 8)); // "Hello..."
```

### Random Generators

#### Generate Random String
```javascript
const randomString = (length = 8) => 
  Math.random().toString(36).substring(2, length + 2);
```

#### Generate Random Number in Range
```javascript
const random = (min, max) => 
  Math.floor(Math.random() * (max - min + 1) + min);
```

### Object Utilities

#### Deep Merge Objects
```javascript
const deepMerge = (target, source) => {
  for (let key in source) {
    if (source[key] instanceof Object && key in target) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};
```

#### Get Nested Object Value Safely
```javascript
const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};
```

#### Remove Empty Values from Object
```javascript
const removeEmpty = obj => 
  Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
```

### Date Utilities

#### Format Date
```javascript
const formatDate = (date, locale = 'en-US') => new Date(date).toLocaleDateString(locale);
```

#### Add Days to Date
```javascript
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
```

#### Get Date Difference in Days
```javascript
const dateDiff = (date1, date2) => 
  Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
```

### Validation Utilities

#### Check if Email is Valid
```javascript
const isEmail = email => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
```

#### Check if URL is Valid
```javascript
const isURL = str => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
```

#### Check if Date is Valid
```javascript
const isValidDate = date => 
  date instanceof Date && !isNaN(date);
```

### Browser Utilities

#### Copy to Clipboard
```javascript
const copyToClipboard = text => 
  navigator.clipboard.writeText(text);
```

#### Generate UUID
```javascript
const uuid = () => 
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
```

### Async Utilities

#### Sleep/Delay
```javascript
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
```

#### Retry Function with Delay
```javascript
const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await sleep(delay);
    return retry(fn, retries - 1, delay);
  }
};
```

### Performance Utilities

#### Measure Function Execution Time
```javascript
const measureTime = async (fn) => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  return {
    result,
    time: end - start
  };
};
```

### Design Patterns

#### Singleton Pattern
```javascript
class Singleton {
  static instance;
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}
```

#### Observer Pattern
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => this.off(event, callback);
  }
  
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
  
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(data));
  }
}
```

#### Factory Pattern
```javascript
class UserFactory {
  createUser(type) {
    switch(type) {
      case 'admin':
        return new AdminUser();
      case 'regular':
        return new RegularUser();
      default:
        throw new Error('Invalid user type');
    }
  }
}
```

#### Virtual List Renderer
```javascript
class VirtualList {
  constructor(items, rowHeight, visibleRows) {
    this.items = items;
    this.rowHeight = rowHeight;
    this.visibleRows = visibleRows;
  }

  getVisibleRange(scrollTop) {
    const start = Math.floor(scrollTop / this.rowHeight);
    const end = Math.min(start + this.visibleRows, this.items.length);
    return { start, end };
  }

  renderItems(scrollTop) {
    const { start, end } = this.getVisibleRange(scrollTop);
    return this.items
      .slice(start, end)
      .map((item, index) => ({
        ...item,
        style: {
          position: 'absolute',
          top: (start + index) * this.rowHeight,
          height: this.rowHeight
        }
      }));
  }
}
```

### Array Utilities

#### Remove Duplicates
```javascript
const unique = arr => [...new Set(arr)];
```

#### Flatten Nested Array
```javascript
const flatten = arr => arr.reduce((flat, next) => 
  flat.concat(Array.isArray(next) ? flatten(next) : next), []);
```

#### Get Random Item
```javascript
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
```

#### Chunk Array
```javascript
const chunk = (arr, size) => 
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => 
    arr.slice(i * size, (i + 1) * size));
```

### String Utilities

#### Capitalize First Letter
```javascript
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
```

#### Generate Slug
```javascript
const slugify = str => str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-');
```

#### Truncate String
```javascript
const truncate = (str, length, ending = '...') =>
  str.length > length ? str.substring(0, length - ending.length) + ending : str;
```

### Random Generators

#### Generate Random String
```javascript
const randomString = (length = 8) => 
  Math.random().toString(36).substring(2, length + 2);
```

#### Generate Random Number in Range
```javascript
const random = (min, max) => 
  Math.floor(Math.random() * (max - min + 1) + min);
```

### Map Operations
```javascript
// Map operations examples
const map = new Map();

// Setting values
map.set('name', 'Haim');
map.set(123, 'ID');
map.set(true, 'isActive');

// Getting values
map.get('name');    // Returns 'Haim'
map.has('name');    // Returns true
map.delete(123);    // Deletes key-value pair
map.clear();        // Removes all entries
map.size;           // Returns number of entries

// Iteration methods
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// Getting iterators
const keys = map.keys();     // Returns keys iterator
const values = map.values(); // Returns values iterator
```

### Cache Utilities

#### Complex Key Caching
```javascript
const createCacheKey = (fn, ...args) => {
  return JSON.stringify([fn.toString(), ...args]);
};

// Usage example
const cache = new Map();
const key = createCacheKey(someFunction, arg1, arg2);
const cached = cache.get(key);
```

#### Cache Counter
```javascript
const incrementCache = (cacheMap, key) => {
  return (cacheMap.get(key) || 0) + 1;
};
```

#### TTL Cache Utilities
```javascript
const isExpired = (currentTime, referenceTime, timeToLive) => {
  return (currentTime - referenceTime) >= (timeToLive * 1000);
};

const shouldExecute = (currentTime, referenceTime, timerRunTime) => {
  return currentTime > referenceTime + timerRunTime;
};
```

### Promise Utilities

#### Promise.all Implementation Essentials
```javascript
// Check if all promises are settled
if (settledCount === promises.length) {
  resolve(results);
}

// Timeout wrapper for promises
const withTimeout = (promise, timeout) => {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timed_out')), timeout)
  );
  return Promise.race([promise, timeoutPromise]);
};
```

### Array/String Manipulation

#### Swap Array Elements
```javascript
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
  return arr;
};
```

#### Words Only Filter
```javascript
const wordsOnly = str => str.replace(/[^\w]/g, '').toLowerCase();
```

#### Reverse Integer
```javascript
const reverseInt = int => {
  const reversedStr = Math.abs(int).toString().split('').reverse().join('');
  const reversedInt = parseInt(reversedStr);
  return int < 0 ? -reversedInt : reversedInt;
};
```

#### Palindrome Check
```javascript
const isPalindrome = str => {
  return str.split('').every((char, i) => char === str[str.length - i - 1]);
};
```

### Time Utilities

#### Calculate Days Passed
```javascript
const daysPassed = (unixStart, unixEnd) => {
  return (unixEnd - unixStart) / (60 * 60 * 24);
};
```

### Array Operations

#### Advanced Array Methods Example
```javascript
const numbers = [1, 2, 3, 4, 5];

// Map: Transform each element
const doubled = numbers.map(num => num * 2);

// Filter: Select elements matching condition
const evens = numbers.filter(num => num % 2 === 0);

// Reduce: Accumulate values
const sum = numbers.reduce((acc, num) => acc + num, 0);
```

### Async Operations

#### Sequential Async Processing
```javascript
async function fetchData(urls) {
  const results = [];
  for (const url of urls) {
    const response = await fetch(url);
    results.push(await response.json());
  }
  return results;
}

// Usage example
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2'
];

fetchData(urls).then(data => console.log(data));
```

### String Templates

#### URL Template Example
```javascript
const API_BASE_URL = 'https://api.example.com';
const endpoint = `${API_BASE_URL}/users`;
```

### Common Entity Names
Common names for data structures and modules:
- Entities
- Items
- Resources
- Records
- Modules

#### Recursive Functions
```javascript
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

// Usage example
console.log(factorial(5)); // 120
```

#### Rate Limiting

##### Throttle
```javascript
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
}
```

### Array Utilities

#### Basic Operations
```javascript
// forEach iteration
[1, 2, 3].forEach((value, index) => {
  console.log(`Key: ${index}, Value: ${value}`);
});

// Splice - modify array content
let arr = [1, 2, 3, 4];
arr.splice(1, 2);  // arr becomes [1, 4]

// Reverse array
[1, 2, 3].reverse();  // [3, 2, 1]
```

#### Search Operations
```javascript
// Find - get first matching element
const users = [{ name: 'Alice' }, { name: 'Bob' }];
const user = users.find(user => user.name === 'Alice');

// FindIndex - get index of first matching element
[1, 2, 3].findIndex(x => x === 2);  // returns 1

// Some and Every - check conditions
const numbers = [10, 20, 30];
numbers.some(num => num > 15);   // true
numbers.every(num => num > 15);  // false
```

#### Sort Operations
```javascript
// Basic sort
[3, 1, 2].sort();  // [1, 2, 3]

// Custom sort (descending)
[3, 1, 2].sort((a, b) => b - a);  // [3, 2, 1]

// Detailed sort with equality check
[3, 1, 2].sort((a, b) => {
  if (a === b) return 0;
  return b - a;
});
```

### String Utilities

#### Basic Manipulations
```javascript
// Trim whitespace
"  hello  ".trim();       // "hello"
"  hello  ".trimStart();  // "hello  "
"  hello  ".trimEnd();    // "  hello"

// Slice
"hello world".slice(0, 5);  // "hello"
"hello world".slice(6);     // "world"
"hello world".slice(-5);    // "world"

// Substring (similar to slice but no negative indices)
"hello world".substring(0, 5);  // "hello"
```

#### String Search Operations
```javascript
// Includes
const str = 'hello world';
str.includes('world');  // true

// StartsWith and EndsWith
"hello world".startsWith("hello");  // true
"hello world".endsWith("world");    // true
```

#### Case Operations
```javascript
"Hello".toLowerCase();  // "hello"
"hello".toUpperCase();  // "HELLO"
```

#### Split and Join
```javascript
// Split string to array
"hello,world".split(",");   // ['hello', 'world']
"hello world".split(" ");   // ['hello', 'world']
"hello".split("");         // ['h','e','l','l','o']

// Join array to string
['hello', 'world'].join(' ');  // "hello world"
```

#### Replace Operations
```javascript
// Single replacement
"hello world".replace("world", "there");

// Replace all occurrences
"hello hello".replaceAll("hello", "hi");
```

### Number Utilities

#### Format Number with Commas
```javascript
const formatNumber = num => 
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Usage examples
console.log(formatNumber(1234));     // "1,234"
console.log(formatNumber(1000000));  // "1,000,000"
console.log(formatNumber(123));      // "123"
console.log(formatNumber(1234567));  // "1,234,567"
```

#### Round to Decimal Places
```javascript
const round = (num, decimals = 2) => 
  Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);

// Usage examples
console.log(round(3.14159));     // 3.14
console.log(round(3.14159, 3));  // 3.142
console.log(round(10.9876, 1));  // 11.0
console.log(round(123.456, 0));  // 123
```

#### Basic Conversions

##### toString
```javascript
// Convert number to string
const numString = (123).toString();  // "123"
```

##### toFixed
```javascript
// Round to specific decimal places and return as string
const fixed = (3.1415).toFixed(2);  // "3.14"
```

##### parseInt / parseFloat
```javascript
// Convert string to integer/float
const intNum = parseInt("123");      // 123
const floatNum = parseFloat("3.14"); // 3.14
```

#### Math Methods
```javascript
// Common Math utility methods
Math.floor(3.7);   // 3    - Round down
Math.ceil(3.2);    // 4    - Round up
Math.round(3.5);   // 4    - Round to nearest integer
Math.abs(-5);      // 5    - Absolute value
Math.max(1, 2, 3); // 3    - Maximum value
Math.min(1, 2, 3); // 1    - Minimum value

// Usage examples
const price = 123.456;
console.log(Math.floor(price));  // 123
console.log(Math.ceil(price));   // 124
console.log(Math.abs(-price));   // 123.456

const numbers = [1, 2, 3, 4, 5];
console.log(Math.max(...numbers));  // 5
console.log(Math.min(...numbers));  // 1
```

### Date Utilities

#### Date Creation
```javascript
// Creating dates
new Date();                // Current date
new Date("2024-01-01");   // From string
new Date(2024, 0, 1);     // January 1, 2024
```

#### Date Getters
```javascript
const date = new Date();
date.getFullYear();    // 2024
date.getMonth();       // 0-11
date.getDate();        // 1-31
date.getDay();         // 0-6 (day of week)
date.getHours();       // 0-23
date.getMinutes();     // 0-59
date.getTime();        // milliseconds since 1970
```

#### Date Formatting
```javascript
date.toLocaleDateString();  // "1/1/2024"
date.toISOString();         // "2024-01-01T00:00:00.000Z"
```

### String Utilities

#### String Analysis
```javascript
// Search with normalization
const searchTerm = "Hello World";
const normalized = searchTerm.toLowerCase().includes("hello");

// String splitting with destructuring
const fullName = "John Doe";
const [firstName, lastName] = fullName.split(" ");

// Method chaining
const result = "  Hello World  "
  .toLowerCase()
  .trim()
  .split(" ")
  .join("-");  // "hello-world"
```

### Array Utilities

#### Array Transformation
```javascript
// Filter and transform
const numbers = [1, 2, 3, 4, 5];
const evenDoubled = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

// Object array to map
const people = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
const peopleMap = Object.fromEntries(
  people.map(p => [p.id, p.name])
);
```

#### Array Sorting
```javascript
// Sort objects by property
const users = [{name: 'B'}, {name: 'A'}];
users.sort((a, b) => a.name.localeCompare(b.name));
```

#### Binary Search
```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

### Common Algorithms

#### Fibonacci
```javascript
function generateFibonacci(n) {
  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}
```

#### Anagram Check
```javascript
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const count = {};
  
  for (let char of str1) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of str2) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
}
```

### Async Operations

#### API Calls
```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
```

#### Mock APIs
```javascript
function mockApi(data, delay = 1000) {
  return new Promise((resolve) => 
    setTimeout(() => resolve(data), delay)
  );
}

// Usage
mockApi({ success: true })
  .then(data => console.log(data)); // { success: true }
```

### Error Handling

#### Safe Execution
```javascript
function safeExecute(fn, fallbackValue) {
  try {
    return fn();
  } catch (error) {
    console.error("Error:", error);
    return fallbackValue;
  }
}
```

### Best Practices

#### Array Tips
- Prefer `map`/`filter`/`reduce` over `for` loops
- Use `find` instead of `filter` when only one result is needed
- Remember that `sort` mutates the original array

#### String Tips
- Use `split` and `join` for format changes
- Remember that `slice` works on both strings and arrays

#### Optimization Tips
- Use `includes` instead of `indexOf > -1`
- Prefer `Object.entries` over `for...in` loops
- Use destructuring when possible

