# JavaScript Utility Functions

A collection of commonly used JavaScript utility functions for everyday development tasks.

## Table of Contents

- [Number Utilities](#number-utilities)
- [Object Utilities](#object-utilities)
- [Date Utilities](#date-utilities)
- [Validation Utilities](#validation-utilities)
- [String Utilities](#string-utilities)
- [Array Utilities](#array-utilities)
- [Function Utilities](#function-utilities)
- [Cache Utilities](#cache-utilities)
- [Promise Utilities](#promise-utilities)
- [Error Handling](#error-handling)
- [Algorithms](#algorithms)
- [Design Patterns](#design-patterns)
- [Performance Utilities](#performance-utilities)
- [Map Operations](#map-operations)
- [Browser Utilities](#browser-utilities)
- [Async Utilities](#async-utilities)
- [Best Practices](#best-practices)

## Number Utilities

### Format Number with Commas
```javascript
const formatNumber = num => 
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
```

### Round to Decimal Places
```javascript
const round = (num, decimals = 2) => 
  Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
```

### Basic Number Operations
```javascript
// Convert number to string
const numString = (123).toString();  // "123"

// Round to specific decimal places
const fixed = (3.1415).toFixed(2);  // "3.14"

// Parse strings to numbers
const intNum = parseInt("123");      // 123
const floatNum = parseFloat("3.14"); // 3.14

// Math utility methods
Math.floor(3.7);   // 3
Math.ceil(3.2);    // 4
Math.round(3.5);   // 4
Math.abs(-5);      // 5
Math.max(1, 2, 3); // 3
Math.min(1, 2, 3); // 1
```

## Object Utilities

### Deep Clone
```javascript
const deepClone = obj => JSON.parse(JSON.stringify(obj));
```

### Pick Properties
```javascript
const pick = (obj, keys) =>
  keys.reduce((acc, key) => (key in obj ? { ...acc, [key]: obj[key] } : acc), {});

const pickFromArray = (arr, keys) => arr.map(obj => pick(obj, keys));
```

### Deep Merge Objects
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

### Get Nested Object Value
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

### Remove Empty Values
```javascript
const removeEmpty = obj => 
  Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
```

## Date Utilities

### Format Date
```javascript
const formatDate = (date, locale = 'en-US') => new Date(date).toLocaleDateString(locale);
```

### Add Days
```javascript
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
```

### Date Difference
```javascript
const dateDiff = (date1, date2) => 
  Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
```

### Days Passed
```javascript
const daysPassed = (unixStart, unixEnd) => {
  return (unixEnd - unixStart) / (60 * 60 * 24);
};
```

## Validation Utilities

### Email Validation
```javascript
const isEmail = email => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
```

### URL Validation
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

### Date Validation
```javascript
const isValidDate = date => 
  date instanceof Date && !isNaN(date);
```

## String Utilities

### Case Operations
```javascript
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// Built-in case methods
"Hello".toLowerCase();  // "hello"
"hello".toUpperCase();  // "HELLO"
```

### String Manipulation
```javascript
// Generate slug
const slugify = str => str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-');

// Truncate string
const truncate = (str, length, ending = '...') =>
  str.length > length ? str.substring(0, length - ending.length) + ending : str;

// Words only filter
const wordsOnly = str => str.replace(/[^\w]/g, '').toLowerCase();

// Palindrome check
const isPalindrome = str => {
  return str.split('').every((char, i) => char === str[str.length - i - 1]);
};
```

### String Operations
```javascript
// Split and join
"hello,world".split(",");   // ['hello', 'world']
['hello', 'world'].join(' ');  // "hello world"

// Trim
"  hello  ".trim();       // "hello"
"  hello  ".trimStart();  // "hello  "
"  hello  ".trimEnd();    // "  hello"

// Substring/Slice
"hello world".slice(0, 5);     // "hello"
"hello world".substring(0, 5); // "hello"

// Search operations
"hello world".includes('world');     // true
"hello world".startsWith("hello");   // true
"hello world".endsWith("world");     // true

// Replace
"hello world".replace("world", "there");
"hello hello".replaceAll("hello", "hi");
```

## Array Utilities

### Basic Operations
```javascript
// Remove duplicates
const unique = arr => [...new Set(arr)];

// Flatten nested array
const flatten = arr => arr.reduce((flat, next) => 
  flat.concat(Array.isArray(next) ? flatten(next) : next), []);

// Get random item
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

// Chunk array
const chunk = (arr, size) => 
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => 
    arr.slice(i * size, (i + 1) * size));

// Swap elements
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
  return arr;
};
```

### Array Methods
```javascript
// Search operations
const findUser = users.find(user => user.name === 'Alice');
const findUserIndex = users.findIndex(user => user.name === 'Alice');

// Checking conditions
const hasAdult = users.some(user => user.age >= 18);
const allAdults = users.every(user => user.age >= 18);

// Transformation
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);

// Sorting
const sortedNumbers = numbers.sort((a, b) => a - b);
const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
```

## Function Utilities

### Debounce
```javascript
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
```

### Throttle
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

### Memoization
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

## Cache Utilities

### Complex Key Cache
```javascript
const createCacheKey = (fn, ...args) => {
  return JSON.stringify([fn.toString(), ...args]);
};
```

### Cache Counter
```javascript
const incrementCache = (cacheMap, key) => {
  return (cacheMap.get(key) || 0) + 1;
};
```

### TTL Cache
```javascript
const isExpired = (currentTime, referenceTime, timeToLive) => {
  return (currentTime - referenceTime) >= (timeToLive * 1000);
};
```

## Promise Utilities

### Timeout Wrapper
```javascript
const withTimeout = (promise, timeout) => {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timed_out')), timeout)
  );
  return Promise.race([promise, timeoutPromise]);
};
```

### Sequential Processing
```javascript
async function fetchData(urls) {
  const results = [];
  for (const url of urls) {
    const response = await fetch(url);
    results.push(await response.json());
  }
  return results;
}
```

## Error Handling

### Safe Execute
```javascript
const safeExecute = (fn, fallbackValue) => {
  try {
    return fn();
  } catch (error) {
    console.error("Error:", error);
    return fallbackValue;
  }
};
```

## Algorithms

### Binary Search
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

### Fibonacci
```javascript
function generateFibonacci(n) {
  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}
```

### Anagram Check
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

## Design Patterns

### Singleton Pattern
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

### Observer Pattern
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

### Factory Pattern
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

## Performance Utilities

### Measure Execution Time
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

## Map Operations

### Basic Map Usage
```javascript
const map = new Map();

// Operations
map.set('key', 'value');
map.get('key');
map.has('key');
map.delete('key');
map.clear();
map.size;

// Iteration
map.forEach((value, key) => console.log(key, value));
const keys = map.keys();
const values = map.values();
```

## Browser Utilities

### Clipboard Operations
```javascript
const copyToClipboard = text => 
  navigator.clipboard.writeText(text);
```

### Generate UUID
```javascript
const uuid = () => 
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
```

## Async Utilities

### Sleep/Delay
```javascript
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
```

### Retry Function
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

## Best Practices

### Array Best Practices
- Prefer `map`/`filter`/`reduce` over `for` loops
- Use `find` instead of `filter` for single results
- Remember that `sort` mutates the original array
- Use spread operator for shallow copies
- Consider performance with large arrays

### String Best Practices
- Use template literals for string interpolation
- Prefer `includes` over `indexOf` for existence checks
- Use appropriate string methods based on needs
- Consider internationalization requirements

### Performance Best Practices
- Cache repeated calculations
- Use appropriate data structures
- Consider memory usage with large datasets
- Profile code for bottlenecks
- Use appropriate iteration methods

  ### Optimization Best Practices
- Use appropriate data types for your data
- Avoid premature optimization
- Profile before optimizing
- Consider memory usage patterns

### Code Organization Best Practices
```javascript
// Group related functionality
const userUtils = {
  validateUser: (user) => { /* ... */ },
  formatUserData: (user) => { /* ... */ },
  processUserPermissions: (user) => { /* ... */ }
};

// Use meaningful names
const fetchUserData = async (userId) => { /* ... */ };
const processUserInput = (input) => { /* ... */ };

// Separate concerns
const dataLayer = {
  fetch: async () => { /* ... */ },
  save: async () => { /* ... */ },
  delete: async () => { /* ... */ }
};
```

## Virtual DOM Utilities

### Virtual List Renderer
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

## API Utilities

### Fetch Wrapper
```javascript
const api = {
  async request(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  get: (url) => api.request(url),
  
  post: (url, data) => api.request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  put: (url, data) => api.request(url, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  delete: (url) => api.request(url, {
    method: 'DELETE'
  })
};
```

### Mock API
```javascript
class MockAPI {
  constructor(delay = 1000) {
    this.delay = delay;
    this.data = new Map();
  }

  async get(id) {
    await sleep(this.delay);
    return this.data.get(id);
  }

  async set(id, value) {
    await sleep(this.delay);
    this.data.set(id, value);
    return true;
  }

  async delete(id) {
    await sleep(this.delay);
    return this.data.delete(id);
  }
}
```

## Security Utilities

### Input Sanitization
```javascript
const sanitizeInput = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};
```

### Hash Generation
```javascript
async function generateHash(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

## State Management

### Simple Store
```javascript
class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}
```

## DOM Utilities

### Event Delegation
```javascript
const delegate = (element, eventType, selector, handler) => {
  element.addEventListener(eventType, event => {
    const target = event.target.closest(selector);
    if (target) {
      handler(event, target);
    }
  });
};

// Usage
delegate(document.body, 'click', '.button', (event, element) => {
  console.log('Button clicked:', element);
});
```

### DOM Manipulation
```javascript
const dom = {
  create: (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(key, value);
      }
    });
    
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    
    return element;
  },
  
  query: (selector, context = document) => context.querySelector(selector),
  queryAll: (selector, context = document) => [...context.querySelectorAll(selector)],
  
  addClass: (element, ...classes) => element.classList.add(...classes),
  removeClass: (element, ...classes) => element.classList.remove(...classes),
  toggleClass: (element, class) => element.classList.toggle(class)
};
```

## File Utilities

### File Size Formatter
```javascript
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
```

### File Type Checker
```javascript
const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  return imageExtensions.includes(getFileExtension(filename).toLowerCase());
};
```

## Testing Utilities

### Test Helper Functions
```javascript
const createMockFunction = () => {
  const fn = (...args) => {
    fn.calls.push(args);
    return fn.returnValue;
  };
  
  fn.calls = [];
  fn.returnValue = undefined;
  fn.mockReturnValue = (value) => {
    fn.returnValue = value;
    return fn;
  };
  fn.mockClear = () => {
    fn.calls = [];
    return fn;
  };
  
  return fn;
};

const createMockPromise = (resolveWith) => {
  return Promise.resolve(resolveWith);
};
```

## Logging Utilities

### Advanced Logger
```javascript
class Logger {
  constructor(options = {}) {
    this.prefix = options.prefix || '';
    this.enabled = options.enabled !== false;
  }

  log(...args) {
    if (!this.enabled) return;
    console.log(this.prefix, ...args);
  }

  error(...args) {
    if (!this.enabled) return;
    console.error(this.prefix, ...args);
  }

  warn(...args) {
    if (!this.enabled) return;
    console.warn(this.prefix, ...args);
  }

  group(label) {
    if (!this.enabled) return;
    console.group(this.prefix + label);
  }

  groupEnd() {
    if (!this.enabled) return;
    console.groupEnd();
  }
}
```
