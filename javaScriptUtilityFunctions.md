# JavaScript Utility Functions

A collection of commonly used JavaScript utility functions for everyday development tasks.

## Table of Contents

- [Number Utilities](#number-utilities)
- [Object Utilities](#object-utilities)
- [Date Utilities](#date-utilities)
- [Validation Utilities](#validation-utilities)
- [Browser Utilities](#browser-utilities)
- [Async Utilities](#async-utilities)
- [Design Patterns](#design-patterns)
- [Performance Utilities](#performance-utilities)
- [Array Utilities](#array-utilities)
  - [Basic Operations](#basic-operations)
  - [Search Operations](#search-operations)
  - [Transformation Operations](#transformation-operations)
  - [Sort Operations](#sort-operations)
- [String Utilities](#string-utilities)
  - [Basic Manipulations](#basic-manipulations)
  - [Search Operations](#string-search-operations)
  - [Case Operations](#case-operations)
  - [Split and Join](#split-and-join)
- [Function Utilities](#function-utilities)
  - [Recursive Functions](#recursive-functions)
  - [Rate Limiting](#rate-limiting)
- [Random Generators](#random-generators)
- [Map Operations](#map-operations)
- [Cache Utilities](#cache-utilities)
- [Promise Utilities](#promise-utilities)
- [Time Utilities](#time-utilities)


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

### Number Utilities

#### Format Number with Commas
```javascript
const formatNumber = num => 
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Usage example:
console.log(formatNumber(1234567));  // "1,234,567"
console.log(formatNumber(1000000));  // "1,000,000"
```

#### Round to Decimal Places
```javascript
const round = (num, decimals = 2) => 
  Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);

// Usage example:
console.log(round(3.14159, 3));  // 3.142
console.log(round(10.9876, 1));  // 11.0
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

