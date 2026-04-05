# Node.js Basics Interview Questions

![Node.js Basics Interview Questions](../../../assets/node-event-loop.svg)

This page stays at the Node.js basics level and focuses on runtime concepts, async patterns, and server-side JavaScript fundamentals.

## 1. Runtime and V8

### 1. What is the role of Runtime and V8 in Node.js basics?

**Answer:**

In Node.js basics, the term Runtime and V8 refers to the JavaScript execution environment and engine that
power Node.js outside the browser. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```js
const v8 = require('v8');
const http = require('http');

console.log(`Node ${process.version}`);
console.log(`Heap limit: ${Math.round(v8.getHeapStatistics().heap_size_limit / 1024 / 1024)} MB`);

http.createServer((req, res) => {
  res.end(JSON.stringify({ runtime: 'node', engine: 'v8' }));
}).listen(3000);
```

---

### 2. Why is the concept of Runtime and V8 important in Node.js basics?

**Answer:**

This concept matters because it influences the JavaScript execution environment and engine that
power Node.js outside the browser. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```js
const v8 = require('v8');

function compileTemplate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '');
}

const html = compileTemplate('<h1>{{title}}</h1>', { title: 'Orders Dashboard' });
console.log(html);
console.log(`Used heap: ${Math.round(v8.getHeapStatistics().used_heap_size / 1024)} KB`);
```

---

### 3. When should a team focus on Runtime and V8?

**Answer:**

A team should focus on Runtime and V8 when the requirement depends on the JavaScript execution
environment and engine that power Node.js outside the browser. It becomes especially important when
design decisions, debugging, or architecture conversations depend on that area.

**Sample:**

```js
function shouldUseNode(workload) {
  return workload.ioHeavy && workload.concurrentUsers > 1000 && !workload.cpuHeavy;
}

const apiGatewayWorkload = { ioHeavy: true, concurrentUsers: 5000, cpuHeavy: false };
console.log(shouldUseNode(apiGatewayWorkload)); // true
```

---

### 4. How is Runtime and V8 applied in practice?

**Answer:**

In practice, Runtime and V8 is applied by making the JavaScript execution environment and engine
that power Node.js outside the browser explicit in the code, workflow, or collaboration pattern. The
exact shape depends on the stack, but the responsibility should stay predictable.

**Sample:**

```js
const v8 = require('v8');

setInterval(() => {
  const { used_heap_size, total_heap_size } = v8.getHeapStatistics();
  console.log({
    usedMB: Math.round(used_heap_size / 1024 / 1024),
    totalMB: Math.round(total_heap_size / 1024 / 1024)
  });
}, 5000);
```

---

### 5. What strengths does Runtime and V8 bring?

**Answer:**

The strengths of Runtime and V8 are better structure, better communication, and better control over
the JavaScript execution environment and engine that power Node.js outside the browser. It also
makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```js
const http = require('http');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
  const body = { requestId: crypto.randomUUID(), path: req.url, at: new Date().toISOString() };
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(body));
});

server.listen(3000);
```

---

### 6. What tradeoffs come with Runtime and V8?

**Answer:**

The main tradeoff is extra complexity if Runtime and V8 is introduced without a real need or a clear
understanding of the JavaScript execution environment and engine that power Node.js outside the
browser. That usually leads to weak reasoning, overengineering, or fragile implementations.

**Sample:**

```js
const crypto = require('crypto');

function hashPasswordSync(password) {
  // Blocks the event loop for CPU-heavy work.
  return crypto.pbkdf2Sync(password, 'salt', 200000, 64, 'sha512').toString('hex');
}

console.time('hash');
hashPasswordSync('super-secret');
console.timeEnd('hash');
```

---

### 7. How does Runtime and V8 differ from Event loop?

**Answer:**

Runtime and V8 is centered on the JavaScript execution environment and engine that power Node.js
outside the browser, while Event loop is centered on the mechanism Node.js uses to coordinate
asynchronous work on the main thread. They often work together, but they solve different parts of
the topic.

**Sample:**

```js
console.log(`Runtime: ${process.release.name} on ${process.platform}`);

setTimeout(() => console.log('timer callback from event loop'), 0);
Promise.resolve().then(() => console.log('microtask callback'));

console.log('startup finished');
```

---

### 8. What is a good real-world example of Runtime and V8?

**Answer:**

A strong example is explaining how Runtime and V8 affects a real feature, workflow, bug, migration,
or design choice involving the JavaScript execution environment and engine that power Node.js
outside the browser. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```js
const http = require('http');

http.createServer(async (req, res) => {
  const user = { id: 42, name: 'Sai' };
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ user, handledBy: process.version }));
}).listen(3000, () => {
  console.log('Orders API running on http://localhost:3000');
});
```

---

### 9. What is a best practice for Runtime and V8?

**Answer:**

A good practice is to keep Runtime and V8 aligned with the actual requirement around the JavaScript
execution environment and engine that power Node.js outside the browser. Teams should document
intent, keep the implementation readable, and validate important paths early.

**Sample:**

```js
function validateNodeVersion() {
  const major = Number(process.versions.node.split('.')[0]);
  if (major < 20) {
    throw new Error('Use Node.js 20+ in development and CI');
  }
}

validateNodeVersion();
console.log('Runtime check passed');
```

---

### 10. What is a common mistake around Runtime and V8?

**Answer:**

A common mistake is naming Runtime and V8 without understanding how it affects the JavaScript
execution environment and engine that power Node.js outside the browser. In real work, that usually
appears as poor decisions, weak debugging, or incomplete explanations.

**Sample:**

```js
try {
  console.log(window.location.href);
} catch (error) {
  console.error('Browser globals are not available in Node.js:', error.message);
}

console.log(typeof globalThis.fetch); // available in modern Node.js
```

---

### 11. How do you troubleshoot Runtime and V8-related issues?

**Answer:**

When troubleshooting Runtime and V8, first verify whether the JavaScript execution environment and
engine that power Node.js outside the browser is behaving as expected. Then check surrounding
dependencies, inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```js
process.on('uncaughtException', (error) => {
  console.error('Fatal runtime issue', {
    message: error.message,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

throw new Error('Outdated environment variable name');
```

---

### 12. How does Runtime and V8 connect to the rest of Node.js basics?

**Answer:**

Runtime and V8 connects to the rest of Node.js basics by giving structure to the JavaScript
execution environment and engine that power Node.js outside the browser. It is one of the pieces
that turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```js
const fs = require('fs/promises');
const http = require('http');

http.createServer(async (_req, res) => {
  const config = JSON.parse(await fs.readFile('./config.json', 'utf8'));
  res.end(`env=${config.env} node=${process.version}`);
}).listen(3000);
```

---

## 2. Event loop

### 13. What is the role of Event loop in Node.js basics?

**Answer:**

In Node.js basics, the term Event loop refers to the mechanism Node.js uses to coordinate asynchronous work
on the main thread. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```js
console.log('start request');

setTimeout(() => console.log('timer phase'), 0);
setImmediate(() => console.log('check phase'));
Promise.resolve().then(() => console.log('microtask queue'));
process.nextTick(() => console.log('nextTick queue'));

console.log('end request');
```

---

### 14. Why is the concept of Event loop important in Node.js basics?

**Answer:**

This concept matters because it influences the mechanism Node.js uses to coordinate asynchronous work
on the main thread. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```js
const http = require('http');

http.createServer((req, res) => {
  setTimeout(() => res.end('payment confirmed'), 50);
  console.log('accepted request without blocking the main thread');
}).listen(3000);
```

---

### 15. When should a team focus on Event loop?

**Answer:**

A team should focus on Event loop when the requirement depends on the mechanism Node.js uses to
coordinate asynchronous work on the main thread. It becomes especially important when design
decisions, debugging, or architecture conversations depend on that area.

**Sample:**

```js
setTimeout(() => console.log('This should run quickly'), 10);

const started = Date.now();
while (Date.now() - started < 3000) {
  // Simulates CPU-bound work that blocks the event loop.
}

console.log('Event loop was blocked for 3 seconds');
```

---

### 16. How is Event loop applied in practice?

**Answer:**

In practice, Event loop is applied by making the mechanism Node.js uses to coordinate asynchronous
work on the main thread explicit in the code, workflow, or collaboration pattern. The exact shape
depends on the stack, but the responsibility should stay predictable.

**Sample:**

```js
const jobs = Array.from({ length: 5000 }, (_, i) => i + 1);

function processJobsInChunks(chunkSize = 250) {
  const chunk = jobs.splice(0, chunkSize);
  chunk.forEach((jobId) => console.log(`processed ${jobId}`));

  if (jobs.length > 0) setImmediate(() => processJobsInChunks(chunkSize));
}

processJobsInChunks();
```

---

### 17. What strengths does Event loop bring?

**Answer:**

The strengths of Event loop are better structure, better communication, and better control over the
mechanism Node.js uses to coordinate asynchronous work on the main thread. It also makes tradeoffs
easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```js
const activeConnections = new Set();

require('http').createServer((req, res) => {
  activeConnections.add(req.socket.remotePort);
  setTimeout(() => {
    res.end(`connections seen: ${activeConnections.size}`);
  }, 20);
}).listen(3000);
```

---

### 18. What tradeoffs come with Event loop?

**Answer:**

The main tradeoff is extra complexity if Event loop is introduced without a real need or a clear
understanding of the mechanism Node.js uses to coordinate asynchronous work on the main thread. That
usually leads to weak reasoning, overengineering, or fragile implementations.

**Sample:**

```js
const http = require('http');

http.createServer((req, res) => {
  JSON.parse('[' + '0,'.repeat(5_000_000) + '0]'); // huge synchronous work
  res.end('done');
}).listen(3000);

// One request can block every other request.
```

---

### 19. How does Event loop differ from Non-blocking I O?

**Answer:**

Event loop is centered on the mechanism Node.js uses to coordinate asynchronous work on the main
thread, while Non-blocking I O is centered on the approach where slow operations are handled
asynchronously instead of blocking program flow. They often work together, but they solve different
parts of the topic.

**Sample:**

```js
const fs = require('fs/promises');

setImmediate(() => console.log('event loop schedules callback'));
fs.readFile('./orders.json', 'utf8')
  .then(() => console.log('non-blocking I/O finished'));

console.log('main thread still free');
```

---

### 20. What is a good real-world example of Event loop?

**Answer:**

A strong example is explaining how Event loop affects a real feature, workflow, bug, migration, or
design choice involving the mechanism Node.js uses to coordinate asynchronous work on the main
thread. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```js
const http = require('http');

http.createServer(async (req, res) => {
  const started = Date.now();
  await new Promise((resolve) => setTimeout(resolve, 100));
  res.end(`Handled in ${Date.now() - started} ms`);
}).listen(3000);

console.log('The server can keep accepting other sockets while waiting.');
```

---

### 21. What is a best practice for Event loop?

**Answer:**

A good practice is to keep Event loop aligned with the actual requirement around the mechanism
Node.js uses to coordinate asynchronous work on the main thread. Teams should document intent, keep
the implementation readable, and validate important paths early.

**Sample:**

```js
const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  // Avoid sync calls like readFileSync inside request handlers.
  fs.readFile('./page.html', (error, data) => {
    if (error) return res.writeHead(500).end('failed');
    res.end(data);
  });
}).listen(3000);
```

---

### 22. What is a common mistake around Event loop?

**Answer:**

A common mistake is naming Event loop without understanding how it affects the mechanism Node.js
uses to coordinate asynchronous work on the main thread. In real work, that usually appears as poor
decisions, weak debugging, or incomplete explanations.

**Sample:**

```js
const http = require('http');

http.createServer((req, res) => {
  for (let i = 0; i < 1e9; i += 1) {}
  res.end('This route blocks everything else');
}).listen(3000);
```

---

### 23. How do you troubleshoot Event loop-related issues?

**Answer:**

When troubleshooting Event loop, first verify whether the mechanism Node.js uses to coordinate
asynchronous work on the main thread is behaving as expected. Then check surrounding dependencies,
inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```js
const { monitorEventLoopDelay } = require('perf_hooks');

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setInterval(() => {
  console.log(`p95 lag: ${Math.round(histogram.percentile(95) / 1e6)} ms`);
  histogram.reset();
}, 5000);
```

---

### 24. How does Event loop connect to the rest of Node.js basics?

**Answer:**

Event loop connects to the rest of Node.js basics by giving structure to the mechanism Node.js uses
to coordinate asynchronous work on the main thread. It is one of the pieces that turns isolated
facts into a coherent end-to-end explanation.

**Sample:**

```js
const fs = require('fs/promises');
const http = require('http');

http.createServer(async (_req, res) => {
  const template = await fs.readFile('./template.html', 'utf8');
  res.end(template.replace('{{time}}', new Date().toISOString()));
}).listen(3000);
```

---

## 3. Non-blocking I O

### 25. What is the role of Non-blocking I O in Node.js basics?

**Answer:**

In Node.js basics, the term Non-blocking I O refers to the approach where slow operations are handled
asynchronously instead of blocking program flow. It is part of the foundation a candidate should be
able to explain clearly.

**Sample:**

```js
const fs = require('fs/promises');

async function loadDashboardData() {
  const [ordersRaw, usersRaw] = await Promise.all([
    fs.readFile('./orders.json', 'utf8'),
    fs.readFile('./users.json', 'utf8')
  ]);

  return { orders: JSON.parse(ordersRaw), users: JSON.parse(usersRaw) };
}
```

---

### 26. Why is the concept of Non-blocking I O important in Node.js basics?

**Answer:**

This concept matters because it influences the approach where slow operations are handled
asynchronously instead of blocking program flow. Good interview answers connect it to clarity,
maintainability, performance, security, or delivery depending on the situation.

**Sample:**

```js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.readFile('./report.csv', (error, data) => {
    if (error) return res.writeHead(500).end('report missing');
    res.end(data);
  });
}).listen(3000);
```

---

### 27. When should a team focus on Non-blocking I O?

**Answer:**

A team should focus on Non-blocking I O when the requirement depends on the approach where slow
operations are handled asynchronously instead of blocking program flow. It becomes especially
important when design decisions, debugging, or architecture conversations depend on that area.

**Sample:**

```js
async function shouldUseStreaming(fileSizeMB) {
  return fileSizeMB > 20;
}

shouldUseStreaming(150).then((result) => {
  console.log(`Use non-blocking stream pipeline: ${result}`);
});
```

---

### 28. How is Non-blocking I O applied in practice?

**Answer:**

In practice, Non-blocking I O is applied by making the approach where slow operations are handled
asynchronously instead of blocking program flow explicit in the code, workflow, or collaboration
pattern. The exact shape depends on the stack, but the responsibility should stay predictable.

**Sample:**

```js
const fs = require('fs/promises');

async function loadTenantConfigs(tenantIds) {
  return Promise.all(
    tenantIds.map((tenantId) => fs.readFile(`./tenants/${tenantId}.json`, 'utf8'))
  );
}

loadTenantConfigs(['us', 'eu', 'apac']).then(console.log);
```

---

### 29. What strengths does Non-blocking I O bring?

**Answer:**

The strengths of Non-blocking I O are better structure, better communication, and better control
over the approach where slow operations are handled asynchronously instead of blocking program flow.
It also makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```js
const { performance } = require('perf_hooks');
const fs = require('fs/promises');

async function fetchAssets() {
  const start = performance.now();
  await Promise.all([
    fs.readFile('./banner.html', 'utf8'),
    fs.readFile('./styles.css', 'utf8')
  ]);
  console.log(`loaded assets in ${Math.round(performance.now() - start)} ms`);
}
```

---

### 30. What tradeoffs come with Non-blocking I O?

**Answer:**

The main tradeoff is extra complexity if Non-blocking I O is introduced without a real need or a
clear understanding of the approach where slow operations are handled asynchronously instead of
blocking program flow. That usually leads to weak reasoning, overengineering, or fragile
implementations.

**Sample:**

```js
const fs = require('fs/promises');

async function loadManyFiles(files) {
  // Too much parallelism can exhaust file descriptors.
  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    console.log(content.length);
  }
}
```

---

### 31. How does Non-blocking I O differ from Module systems?

**Answer:**

Non-blocking I O is centered on the approach where slow operations are handled asynchronously
instead of blocking program flow, while Module systems is centered on the CommonJS and ES Module
patterns used to organize Node.js code. They often work together, but they solve different parts of
the topic.

**Sample:**

```js
const fs = require('fs/promises');
const tax = require('./tax-service');

fs.readFile('./invoice.json', 'utf8')
  .then((text) => tax.calculate(JSON.parse(text)))
  .then(console.log);

// File reads are I/O. require() is module loading.
```

---

### 32. What is a good real-world example of Non-blocking I O?

**Answer:**

A strong example is explaining how Non-blocking I O affects a real feature, workflow, bug,
migration, or design choice involving the approach where slow operations are handled asynchronously
instead of blocking program flow. Interviewers usually care more about the reasoning than the
definition alone.

**Sample:**

```js
const fs = require('fs');
const readline = require('readline');

const stream = fs.createReadStream('./transactions.csv');
const rl = readline.createInterface({ input: stream });

rl.on('line', (line) => {
  const [id, amount] = line.split(',');
  console.log(`Imported transaction ${id} for ${amount}`);
});
```

---

### 33. What is a best practice for Non-blocking I O?

**Answer:**

A good practice is to keep Non-blocking I O aligned with the actual requirement around the approach
where slow operations are handled asynchronously instead of blocking program flow. Teams should
document intent, keep the implementation readable, and validate important paths early.

**Sample:**

```js
const fs = require('fs');
const { pipeline } = require('stream/promises');
const zlib = require('zlib');

async function compressAccessLog() {
  await pipeline(
    fs.createReadStream('./logs/access.log'),
    zlib.createGzip(),
    fs.createWriteStream('./logs/access.log.gz')
  );
}

compressAccessLog().catch(console.error);
```

---

### 34. What is a common mistake around Non-blocking I O?

**Answer:**

A common mistake is naming Non-blocking I O without understanding how it affects the approach where
slow operations are handled asynchronously instead of blocking program flow. In real work, that
usually appears as poor decisions, weak debugging, or incomplete explanations.

**Sample:**

```js
const http = require('http');
const fs = require('fs');

http.createServer((_req, res) => {
  const report = fs.readFileSync('./report.pdf');
  res.end(report);
}).listen(3000);

// readFileSync blocks every incoming request.
```

---

### 35. How do you troubleshoot Non-blocking I O-related issues?

**Answer:**

When troubleshooting Non-blocking I O, first verify whether the approach where slow operations are
handled asynchronously instead of blocking program flow is behaving as expected. Then check
surrounding dependencies, inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```js
const fs = require('fs/promises');

async function timedRead(file) {
  console.time(file);
  try {
    return await fs.readFile(file, 'utf8');
  } finally {
    console.timeEnd(file);
  }
}

timedRead('./orders.json').catch(console.error);
```

---

### 36. How does Non-blocking I O connect to the rest of Node.js basics?

**Answer:**

Non-blocking I O connects to the rest of Node.js basics by giving structure to the approach where
slow operations are handled asynchronously instead of blocking program flow. It is one of the pieces
that turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```js
const orderStore = require('./order-store');

async function getOpenOrders() {
  const orders = await orderStore.fetchAll();
  return orders.filter((order) => order.status === 'OPEN');
}

getOpenOrders().then(console.log);
```

---

## 4. Module systems

### 37. What is the role of Module systems in Node.js basics?

**Answer:**

In Node.js basics, the term Module systems refers to the CommonJS and ES Module patterns used to organize
Node.js code. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```js
const currency = require('./lib/currency');
const totals = require('./services/totals');

console.log(currency.format(totals.sum([19.99, 5.0, 4.5])));
```

---

### 38. Why is the concept of Module systems important in Node.js basics?

**Answer:**

This concept matters because it influences the CommonJS and ES Module patterns used to organize
Node.js code. Good interview answers connect it to clarity, maintainability, performance, security,
or delivery depending on the situation.

**Sample:**

```js
// routes/orders.js
module.exports = function registerOrderRoutes(app, orderService) {
  app.get('/orders/:id', async (req, res) => {
    const order = await orderService.getById(req.params.id);
    res.json(order);
  });
};
```

---

### 39. When should a team focus on Module systems?

**Answer:**

A team should focus on Module systems when the requirement depends on the CommonJS and ES Module
patterns used to organize Node.js code. It becomes especially important when design decisions,
debugging, or architecture conversations depend on that area.

**Sample:**

```js
// package.json -> { "type": "module" }
import { readFile } from 'node:fs/promises';

const config = JSON.parse(await readFile('./config.json', 'utf8'));
console.log(config.env);

// Pick one module system per package to avoid confusion.
```

---

### 40. How is Module systems applied in practice?

**Answer:**

In practice, Module systems is applied by making the CommonJS and ES Module patterns used to
organize Node.js code explicit in the code, workflow, or collaboration pattern. The exact shape
depends on the stack, but the responsibility should stay predictable.

**Sample:**

```js
// config/index.js
module.exports = {
  port: Number(process.env.PORT ?? 3000),
  cacheTtlSeconds: 300
};

// server.js
const config = require('./config');
console.log(`Server starts on port ${config.port}`);
```

---

### 41. What strengths does Module systems bring?

**Answer:**

The strengths of Module systems are better structure, better communication, and better control over
the CommonJS and ES Module patterns used to organize Node.js code. It also makes tradeoffs easier to
explain to reviewers, interviewers, and teammates.

**Sample:**

```js
// services/invoice-service.js
module.exports.createInvoice = (order) => ({
  id: `inv_${order.id}`,
  total: order.items.reduce((sum, item) => sum + item.price, 0)
});

// Clear module boundaries make testing easier.
```

---

### 42. What tradeoffs come with Module systems?

**Answer:**

The main tradeoff is extra complexity if Module systems is introduced without a real need or a clear
understanding of the CommonJS and ES Module patterns used to organize Node.js code. That usually
leads to weak reasoning, overengineering, or fragile implementations.

**Sample:**

```js
// CommonJS file
module.exports = { greet: () => 'hello' };

// ESM file trying to import it incorrectly can cause interop confusion:
// import greet from './legacy.cjs'; // may not match named exports as expected
```

---

### 43. How does Module systems differ from npm and package metadata?

**Answer:**

Module systems is centered on the CommonJS and ES Module patterns used to organize Node.js code,
while npm and package metadata is centered on the dependency and script management model centered
around package.json and npm. They often work together, but they solve different parts of the topic.

**Sample:**

```js
// Module systems decide how code is imported/exported.
const slugify = require('./utils/slugify');

// npm metadata decides versions, scripts, and package entry points.
const packageJson = require('./package.json');
console.log(slugify(packageJson.name));
```

---

### 44. What is a good real-world example of Module systems?

**Answer:**

A strong example is explaining how Module systems affects a real feature, workflow, bug, migration,
or design choice involving the CommonJS and ES Module patterns used to organize Node.js code.
Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```js
// controller -> service -> repository
const orderRepository = require('./repositories/order-repository');

async function getOrderSummary(orderId) {
  const order = await orderRepository.findById(orderId);
  return { id: order.id, total: order.items.length, status: order.status };
}

module.exports = { getOrderSummary };
```

---

### 45. What is a best practice for Module systems?

**Answer:**

A good practice is to keep Module systems aligned with the actual requirement around the CommonJS
and ES Module patterns used to organize Node.js code. Teams should document intent, keep the
implementation readable, and validate important paths early.

**Sample:**

```js
// index.js
module.exports = {
  createOrder: require('./create-order'),
  cancelOrder: require('./cancel-order'),
  listOrders: require('./list-orders')
};

// Consumers import one stable entry point.
```

---

### 46. What is a common mistake around Module systems?

**Answer:**

A common mistake is naming Module systems without understanding how it affects the CommonJS and ES
Module patterns used to organize Node.js code. In real work, that usually appears as poor decisions,
weak debugging, or incomplete explanations.

**Sample:**

```js
// a.js
const b = require('./b');
module.exports.valueFromB = b.value;

// b.js
const a = require('./a');
module.exports.value = `A says ${a.valueFromB}`;

// Circular imports can produce undefined values during initialization.
```

---

### 47. How do you troubleshoot Module systems-related issues?

**Answer:**

When troubleshooting Module systems, first verify whether the CommonJS and ES Module patterns used
to organize Node.js code is behaving as expected. Then check surrounding dependencies, inputs,
configuration, logs, and edge cases before changing the design.

**Sample:**

```js
try {
  require('./services/payment-service');
} catch (error) {
  console.error('Module resolution failed', {
    message: error.message,
    cwd: process.cwd()
  });
}
```

---

### 48. How does Module systems connect to the rest of Node.js basics?

**Answer:**

Module systems connects to the rest of Node.js basics by giving structure to the CommonJS and ES
Module patterns used to organize Node.js code. It is one of the pieces that turns isolated facts
into a coherent end-to-end explanation.

**Sample:**

```js
const http = require('http');
const routes = require('./routes');
const packageJson = require('./package.json');

http.createServer(routes).listen(3000, () => {
  console.log(`${packageJson.name} ${packageJson.version} started`);
});
```

---

## 5. npm and package metadata

### 49. What is the role of npm and package metadata in Node.js basics?

**Answer:**

In Node.js basics, the term npm and package metadata refers to the dependency and script management model
centered around package.json and npm. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```js
const packageJson = require('./package.json');

console.log({
  name: packageJson.name,
  version: packageJson.version,
  startScript: packageJson.scripts.start,
  engines: packageJson.engines
});
```

---

### 50. Why is the concept of npm and package metadata important in Node.js basics?

**Answer:**

This concept matters because it influences the dependency and script management model
centered around package.json and npm. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```js
const packageJson = require('./package.json');

if (!packageJson.scripts.test) {
  throw new Error('Add a test script so CI can run predictably');
}

console.log(`Package ${packageJson.name} is ready for CI`);
```

---

### 51. When should a team focus on npm and package metadata?

**Answer:**

A team should focus on npm and package metadata when the requirement depends on the dependency and
script management model centered around package.json and npm. It becomes especially important when
design decisions, debugging, or architecture conversations depend on that area.

**Sample:**

```js
const packageJson = require('./package.json');

const needsAttention = ['engines', 'main', 'scripts', 'dependencies']
  .filter((field) => !packageJson[field]);

console.log({ publishChecklistMissing: needsAttention });
```

---

### 52. How is npm and package metadata applied in practice?

**Answer:**

In practice, npm and package metadata is applied by making the dependency and script management
model centered around package.json and npm explicit in the code, workflow, or collaboration pattern.
The exact shape depends on the stack, but the responsibility should stay predictable.

**Sample:**

```js
const packageJson = require('./package.json');

function hasRequiredScripts(pkg) {
  return ['start', 'test', 'lint'].every((script) => pkg.scripts?.[script]);
}

console.log(hasRequiredScripts(packageJson));
```

---

### 53. What strengths does npm and package metadata bring?

**Answer:**

The strengths of npm and package metadata are better structure, better communication, and better
control over the dependency and script management model centered around package.json and npm. It
also makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```js
const packageJson = require('./package.json');

const commands = Object.entries(packageJson.scripts)
  .map(([name, command]) => `${name}: ${command}`);

console.log(commands.join('\n'));
```

---

### 54. What tradeoffs come with npm and package metadata?

**Answer:**

The main tradeoff is extra complexity if npm and package metadata is introduced without a real need
or a clear understanding of the dependency and script management model centered around package.json
and npm. That usually leads to weak reasoning, overengineering, or fragile implementations.

**Sample:**

```js
const packageJson = require('./package.json');

const dependencyCount = Object.keys(packageJson.dependencies ?? {}).length;
if (dependencyCount > 50) {
  console.warn('Dependency sprawl detected. Revisit package choices.');
}
```

---

### 55. How does npm and package metadata differ from Built-in modules?

**Answer:**

npm and package metadata is centered on the dependency and script management model centered around
package.json and npm, while Built-in modules is centered on the standard library modules such as fs,
path, http, events, and process. They often work together, but they solve different parts of the
topic.

**Sample:**

```js
const fs = require('node:fs');
const expressVersion = require('./package.json').dependencies.express;

console.log(typeof fs.readFile); // built-in module API
console.log(expressVersion); // external package version from npm metadata
```

---

### 56. What is a good real-world example of npm and package metadata?

**Answer:**

A strong example is explaining how npm and package metadata affects a real feature, workflow, bug,
migration, or design choice involving the dependency and script management model centered around
package.json and npm. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```js
const http = require('http');
const packageJson = require('./package.json');

http.createServer((_req, res) => {
  res.end(`${packageJson.name}@${packageJson.version}`);
}).listen(3000);
```

---

### 57. What is a best practice for npm and package metadata?

**Answer:**

A good practice is to keep npm and package metadata aligned with the actual requirement around the
dependency and script management model centered around package.json and npm. Teams should document
intent, keep the implementation readable, and validate important paths early.

**Sample:**

```js
const packageJson = require('./package.json');

if (!packageJson.engines?.node) {
  console.warn('Declare a supported Node.js version range in package.json');
}

console.log(packageJson.scripts);
```

---

### 58. What is a common mistake around npm and package metadata?

**Answer:**

A common mistake is naming npm and package metadata without understanding how it affects the
dependency and script management model centered around package.json and npm. In real work, that
usually appears as poor decisions, weak debugging, or incomplete explanations.

**Sample:**

```js
const packageJson = require('./package.json');

const runtimeDeps = packageJson.dependencies ?? {};
const devDeps = packageJson.devDependencies ?? {};
console.log({
  hasJestInProd: Boolean(runtimeDeps.jest),
  hasPgInDevOnly: Boolean(devDeps.pg)
});
```

---

### 59. How do you troubleshoot npm and package metadata-related issues?

**Answer:**

When troubleshooting npm and package metadata, first verify whether the dependency and script
management model centered around package.json and npm is behaving as expected. Then check
surrounding dependencies, inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```js
const packageJson = require('./package.json');

console.log({
  packageManager: packageJson.packageManager,
  lockfilePresent: require('fs').existsSync('./package-lock.json')
});
```

---

### 60. How does npm and package metadata connect to the rest of Node.js basics?

**Answer:**

npm and package metadata connects to the rest of Node.js basics by giving structure to the
dependency and script management model centered around package.json and npm. It is one of the pieces
that turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```js
const packageJson = require('./package.json');
const cluster = require('cluster');

console.log(`${packageJson.name} boots in ${cluster.isPrimary ? 'primary' : 'worker'} mode`);
```

---

## 6. Built-in modules

### 61. What is the role of Built-in modules in Node.js basics?

**Answer:**

In Node.js basics, the term Built-in modules refers to the standard library modules such as fs, path, http,
events, and process. It is part of the foundation a candidate should be able to explain clearly.

**Sample:**

```js
const { readFile } = require('node:fs/promises');
const { createHash } = require('node:crypto');

async function fingerprintFile(file) {
  const content = await readFile(file);
  return createHash('sha256').update(content).digest('hex');
}

fingerprintFile('./invoice.pdf').then(console.log);
```

---

### 62. Why is the concept of Built-in modules important in Node.js basics?

**Answer:**

This concept matters because it influences the standard library modules such as fs, path, http,
events, and process. Good interview answers connect it to clarity, maintainability, performance,
security, or delivery depending on the situation.

**Sample:**

```js
const path = require('node:path');
const os = require('node:os');

const uploadDir = path.join(os.tmpdir(), 'uploads');
console.log(uploadDir);

// Built-in modules often remove the need for extra dependencies.
```

---

### 63. When should a team focus on Built-in modules?

**Answer:**

A team should focus on Built-in modules when the requirement depends on the standard library modules
such as fs, path, http, events, and process. It becomes especially important when design decisions,
debugging, or architecture conversations depend on that area.

**Sample:**

```js
const { randomUUID } = require('node:crypto');
const { URL } = require('node:url');

const uploadId = randomUUID();
const signedUrl = new URL(`/files/${uploadId}`, 'https://api.example.com');
console.log(signedUrl.toString());
```

---

### 64. How is Built-in modules applied in practice?

**Answer:**

In practice, Built-in modules is applied by making the standard library modules such as fs, path,
http, events, and process explicit in the code, workflow, or collaboration pattern. The exact shape
depends on the stack, but the responsibility should stay predictable.

**Sample:**

```js
const path = require('node:path');
const fs = require('node:fs/promises');

async function saveInvoice(id, data) {
  const filePath = path.join(__dirname, 'data', `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return filePath;
}
```

---

### 65. What strengths does Built-in modules bring?

**Answer:**

The strengths of Built-in modules are better structure, better communication, and better control
over the standard library modules such as fs, path, http, events, and process. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```js
const crypto = require('node:crypto');

const token = crypto.randomBytes(32).toString('hex');
const requestId = crypto.randomUUID();

console.log({ token, requestId });
```

---

### 66. What tradeoffs come with Built-in modules?

**Answer:**

The main tradeoff is extra complexity if Built-in modules is introduced without a real need or a
clear understanding of the standard library modules such as fs, path, http, events, and process.
That usually leads to weak reasoning, overengineering, or fragile implementations.

**Sample:**

```js
const path = require('node:path');

const manual = __dirname + '/reports/2026/april.csv';
const safe = path.join(__dirname, 'reports', '2026', 'april.csv');

console.log({ manual, safe });
```

---

### 67. How does Built-in modules differ from Async patterns?

**Answer:**

Built-in modules is centered on the standard library modules such as fs, path, http, events, and
process, while Async patterns is centered on the callback, promise, and async-await styles used to
handle asynchronous logic. They often work together, but they solve different parts of the topic.

**Sample:**

```js
const fs = require('node:fs/promises');

async function loadConfig() {
  return JSON.parse(await fs.readFile('./config.json', 'utf8'));
}

// fs is a built-in module. async/await is the async pattern used with it.
loadConfig().then(console.log);
```

---

### 68. What is a good real-world example of Built-in modules?

**Answer:**

A strong example is explaining how Built-in modules affects a real feature, workflow, bug,
migration, or design choice involving the standard library modules such as fs, path, http, events,
and process. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```js
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

async function createUploadRecord(originalName) {
  const id = crypto.randomUUID();
  const target = path.join(__dirname, 'uploads', `${id}-${originalName}`);
  await fs.writeFile(target, '');
  return { id, target };
}
```

---

### 69. What is a best practice for Built-in modules?

**Answer:**

A good practice is to keep Built-in modules aligned with the actual requirement around the standard
library modules such as fs, path, http, events, and process. Teams should document intent, keep the
implementation readable, and validate important paths early.

**Sample:**

```js
const { readFile } = require('node:fs/promises');

async function readJson(file) {
  const text = await readFile(file, 'utf8');
  return JSON.parse(text);
}

readJson('./settings.json').then(console.log);
```

---

### 70. What is a common mistake around Built-in modules?

**Answer:**

A common mistake is naming Built-in modules without understanding how it affects the standard
library modules such as fs, path, http, events, and process. In real work, that usually appears as
poor decisions, weak debugging, or incomplete explanations.

**Sample:**

```js
const path = require('node:path');

const bad = __dirname + '\\uploads\\' + 'invoice.pdf';
const good = path.join(__dirname, 'uploads', 'invoice.pdf');

console.log({ bad, good });
```

---

### 71. How do you troubleshoot Built-in modules-related issues?

**Answer:**

When troubleshooting Built-in modules, first verify whether the standard library modules such as fs,
path, http, events, and process is behaving as expected. Then check surrounding dependencies,
inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```js
const fs = require('node:fs/promises');

fs.readFile('./missing.json', 'utf8').catch((error) => {
  console.error({
    code: error.code,
    message: error.message,
    cwd: process.cwd()
  });
});
```

---

### 72. How does Built-in modules connect to the rest of Node.js basics?

**Answer:**

Built-in modules connects to the rest of Node.js basics by giving structure to the standard library
modules such as fs, path, http, events, and process. It is one of the pieces that turns isolated
facts into a coherent end-to-end explanation.

**Sample:**

```js
const http = require('node:http');
const fs = require('node:fs/promises');

http.createServer(async (_req, res) => {
  const health = await fs.readFile('./health.txt', 'utf8');
  res.end(health);
}).listen(3000);
```

---

## 7. Async patterns

### 73. What is the role of Async patterns in Node.js basics?

**Answer:**

In Node.js basics, the term Async patterns refers to the callback, promise, and async-await styles used to
handle asynchronous logic. It is part of the foundation a candidate should be able to explain
clearly.

**Sample:**

```js
async function sendWelcomeEmail(user) {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return `welcome email queued for ${user.email}`;
}

sendWelcomeEmail({ email: 'sai@example.com' }).then(console.log);
```

---

### 74. Why is the concept of Async patterns important in Node.js basics?

**Answer:**

This concept matters because it influences the callback, promise, and async-await styles used to
handle asynchronous logic. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```js
async function loadDashboard() {
  const [orders, invoices] = await Promise.all([
    fetch('https://api.example.com/orders').then((res) => res.json()),
    fetch('https://api.example.com/invoices').then((res) => res.json())
  ]);

  return { orders: orders.length, invoices: invoices.length };
}
```

---

### 75. When should a team focus on Async patterns?

**Answer:**

A team should focus on Async patterns when the requirement depends on the callback, promise, and
async-await styles used to handle asynchronous logic. It becomes especially important when design
decisions, debugging, or architecture conversations depend on that area.

**Sample:**

```js
async function processOrders(orderIds) {
  for (const orderId of orderIds) {
    const response = await fetch(`https://api.example.com/orders/${orderId}`);
    console.log(await response.json());
  }
}

// Focus on async patterns when you coordinate multiple remote calls.
```

---

### 76. How is Async patterns applied in practice?

**Answer:**

In practice, Async patterns is applied by making the callback, promise, and async-await styles used
to handle asynchronous logic explicit in the code, workflow, or collaboration pattern. The exact
shape depends on the stack, but the responsibility should stay predictable.

**Sample:**

```js
async function withRetry(task, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try { return await task(); } catch (error) {
      if (attempt === retries) throw error;
    }
  }
}

withRetry(() => fetch('https://api.example.com/health')).then(() => console.log('ok'));
```

---

### 77. What strengths does Async patterns bring?

**Answer:**

The strengths of Async patterns are better structure, better communication, and better control over
the callback, promise, and async-await styles used to handle asynchronous logic. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```js
async function loadPageData() {
  const [profile, notifications, stats] = await Promise.all([
    fetch('https://api.example.com/profile').then((res) => res.json()),
    fetch('https://api.example.com/notifications').then((res) => res.json()),
    fetch('https://api.example.com/stats').then((res) => res.json())
  ]);

  return { profile, notifications, stats };
}
```

---

### 78. What tradeoffs come with Async patterns?

**Answer:**

The main tradeoff is extra complexity if Async patterns is introduced without a real need or a clear
understanding of the callback, promise, and async-await styles used to handle asynchronous logic.
That usually leads to weak reasoning, overengineering, or fragile implementations.

**Sample:**

```js
async function badSequentialCalls() {
  const a = await fetch('https://api.example.com/a');
  const b = await fetch('https://api.example.com/b');
  return [a.status, b.status];
}

// Sequential awaits are slower when the calls are independent.
```

---

### 79. How does Async patterns differ from Streams and buffers?

**Answer:**

Async patterns is centered on the callback, promise, and async-await styles used to handle
asynchronous logic, while Streams and buffers is centered on the low-level data handling tools used
for files, network communication, and binary data. They often work together, but they solve
different parts of the topic.

**Sample:**

```js
const fs = require('node:fs');

async function getOrderIds() {
  return ['o-1', 'o-2'];
}

const stream = fs.createReadStream('./orders.ndjson');
console.log(typeof stream.pipe); // streams/buffers move data chunks
getOrderIds().then(console.log); // async patterns coordinate completion
```

---

### 80. What is a good real-world example of Async patterns?

**Answer:**

A strong example is explaining how Async patterns affects a real feature, workflow, bug, migration,
or design choice involving the callback, promise, and async-await styles used to handle asynchronous
logic. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```js
async function getOrderSummary(orderId) {
  const [order, payments] = await Promise.all([
    fetch(`https://api.example.com/orders/${orderId}`).then((res) => res.json()),
    fetch(`https://api.example.com/orders/${orderId}/payments`).then((res) => res.json())
  ]);

  return { orderId: order.id, paymentCount: payments.length };
}
```

---

### 81. What is a best practice for Async patterns?

**Answer:**

A good practice is to keep Async patterns aligned with the actual requirement around the callback,
promise, and async-await styles used to handle asynchronous logic. Teams should document intent,
keep the implementation readable, and validate important paths early.

**Sample:**

```js
async function loadWidgets() {
  const results = await Promise.allSettled([
    fetch('https://api.example.com/weather'),
    fetch('https://api.example.com/news'),
    fetch('https://api.example.com/stocks')
  ]);

  return results.map((result) => result.status);
}
```

---

### 82. What is a common mistake around Async patterns?

**Answer:**

A common mistake is naming Async patterns without understanding how it affects the callback,
promise, and async-await styles used to handle asynchronous logic. In real work, that usually
appears as poor decisions, weak debugging, or incomplete explanations.

**Sample:**

```js
async function createInvoice() {
  async function saveInvoiceToDb() {
    return { id: 'inv_1024' };
  }

  const invoice = saveInvoiceToDb(); // forgot await
  console.log(invoice.id); // undefined if saveInvoiceToDb returns a Promise
}
```

---

### 83. How do you troubleshoot Async patterns-related issues?

**Answer:**

When troubleshooting Async patterns, first verify whether the callback, promise, and async-await
styles used to handle asynchronous logic is behaving as expected. Then check surrounding
dependencies, inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```js
async function timedTask(name, task) {
  console.time(name);
  try { return await task(); }
  finally { console.timeEnd(name); }
}

timedTask('load-users', () => fetch('https://api.example.com/users'));
```

---

### 84. How does Async patterns connect to the rest of Node.js basics?

**Answer:**

Async patterns connects to the rest of Node.js basics by giving structure to the callback, promise,
and async-await styles used to handle asynchronous logic. It is one of the pieces that turns
isolated facts into a coherent end-to-end explanation.

**Sample:**

```js
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');

async function exportData() {
  await pipeline(fs.createReadStream('./report.csv'), fs.createWriteStream('./backup/report.csv'));
}

process.on('SIGTERM', () => console.log('finish async work before shutdown'));
```

---

## 8. Streams and buffers

### 85. What is the role of Streams and buffers in Node.js basics?

**Answer:**

In Node.js basics, the term Streams and buffers refers to the low-level data handling tools used for files,
network communication, and binary data. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```js
const fs = require('node:fs');
const { pipeline } = require('node:stream/promises');
const zlib = require('node:zlib');

async function archiveLogs() {
  await pipeline(
    fs.createReadStream('./logs/app.log'),
    zlib.createGzip(),
    fs.createWriteStream('./logs/app.log.gz')
  );
}

archiveLogs().catch(console.error);
```

---

### 86. Why is the concept of Streams and buffers important in Node.js basics?

**Answer:**

This concept matters because it influences the low-level data handling tools used for files,
network communication, and binary data. Good interview answers connect it to clarity,
maintainability, performance, security, or delivery depending on the situation.

**Sample:**

```js
const fs = require('node:fs');

const stream = fs.createReadStream('./video.mp4', { highWaterMark: 64 * 1024 });
let bytes = 0;
stream.on('data', (chunk) => { bytes += chunk.length; });
stream.on('end', () => console.log(`streamed ${bytes} bytes without loading all into memory`));
```

---

### 87. When should a team focus on Streams and buffers?

**Answer:**

A team should focus on Streams and buffers when the requirement depends on the low-level data
handling tools used for files, network communication, and binary data. It becomes especially
important when design decisions, debugging, or architecture conversations depend on that area.

**Sample:**

```js
function shouldUseStream(fileSizeMB) {
  return fileSizeMB > 10;
}

console.log(shouldUseStream(250)); // true for large exports, media, backups
```

---

### 88. How is Streams and buffers applied in practice?

**Answer:**

In practice, Streams and buffers is applied by making the low-level data handling tools used for
files, network communication, and binary data explicit in the code, workflow, or collaboration
pattern. The exact shape depends on the stack, but the responsibility should stay predictable.

**Sample:**

```js
const fs = require('node:fs');
const { Transform } = require('node:stream');
const { pipeline } = require('node:stream/promises');

const uppercase = new Transform({
  transform(chunk, _enc, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

async function uppercaseCustomerFile() {
  await pipeline(
    fs.createReadStream('./customers.csv'),
    uppercase,
    fs.createWriteStream('./customers-upper.csv')
  );
}

uppercaseCustomerFile().catch(console.error);
```

---

### 89. What strengths does Streams and buffers bring?

**Answer:**

The strengths of Streams and buffers are better structure, better communication, and better control
over the low-level data handling tools used for files, network communication, and binary data. It
also makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```js
const buffer = Buffer.from('payment-approved');
console.log(buffer.length);
console.log(buffer.toString('utf8'));

// Buffers give precise byte-level control for protocols and binary payloads.
```

---

### 90. What tradeoffs come with Streams and buffers?

**Answer:**

The main tradeoff is extra complexity if Streams and buffers is introduced without a real need or a
clear understanding of the low-level data handling tools used for files, network communication, and
binary data. That usually leads to weak reasoning, overengineering, or fragile implementations.

**Sample:**

```js
const chunks = [];

function onData(chunk) {
  chunks.push(chunk);
  // If the producer is faster than the consumer, memory can keep growing.
}

console.log(onData.name);
```

---

### 91. How does Streams and buffers differ from Process and environment?

**Answer:**

Streams and buffers is centered on the low-level data handling tools used for files, network
communication, and binary data, while Process and environment is centered on the runtime information
and configuration exposed through the process object. They often work together, but they solve
different parts of the topic.

**Sample:**

```js
const fs = require('node:fs');

const fileStream = fs.createReadStream('./audit.log');
console.log(typeof fileStream.pipe); // stream for data flow
console.log(process.env.NODE_ENV); // process/environment for runtime config
```

---

### 92. What is a good real-world example of Streams and buffers?

**Answer:**

A strong example is explaining how Streams and buffers affects a real feature, workflow, bug,
migration, or design choice involving the low-level data handling tools used for files, network
communication, and binary data. Interviewers usually care more about the reasoning than the
definition alone.

**Sample:**

```js
const fs = require('node:fs');
const readline = require('node:readline');

const rl = readline.createInterface({ input: fs.createReadStream('./orders.ndjson') });
rl.on('line', (line) => {
  const order = JSON.parse(line);
  console.log(`Order ${order.id} => ${order.status}`);
});
```

---

### 93. What is a best practice for Streams and buffers?

**Answer:**

A good practice is to keep Streams and buffers aligned with the actual requirement around the low-
level data handling tools used for files, network communication, and binary data. Teams should
document intent, keep the implementation readable, and validate important paths early.

**Sample:**

```js
const fs = require('node:fs');
const { pipeline } = require('node:stream/promises');

async function archiveRawData() {
  await pipeline(
    fs.createReadStream('./raw-data.csv'),
    fs.createWriteStream('./archive/raw-data.csv')
  );
}

archiveRawData().catch(console.error);

// pipeline forwards backpressure and errors for you.
```

---

### 94. What is a common mistake around Streams and buffers?

**Answer:**

A common mistake is naming Streams and buffers without understanding how it affects the low-level
data handling tools used for files, network communication, and binary data. In real work, that
usually appears as poor decisions, weak debugging, or incomplete explanations.

**Sample:**

```js
const fs = require('node:fs/promises');

async function badUploadHandler() {
  const file = await fs.readFile('./huge-video.mov');
  console.log(file.length);
}

// Reading the whole file into memory is often the wrong choice.
```

---

### 95. How do you troubleshoot Streams and buffers-related issues?

**Answer:**

When troubleshooting Streams and buffers, first verify whether the low-level data handling tools
used for files, network communication, and binary data is behaving as expected. Then check
surrounding dependencies, inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```js
const fs = require('node:fs');

const stream = fs.createReadStream('./broken.csv');
stream.on('open', () => console.log('opened'));
stream.on('error', (error) => console.error(error.code, error.message));
stream.on('close', () => console.log('closed'));
```

---

### 96. How does Streams and buffers connect to the rest of Node.js basics?

**Answer:**

Streams and buffers connects to the rest of Node.js basics by giving structure to the low-level data
handling tools used for files, network communication, and binary data. It is one of the pieces that
turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```js
const fs = require('node:fs');

async function readLines(file) {
  for await (const chunk of fs.createReadStream(file, { encoding: 'utf8' })) {
    process.stdout.write(chunk);
  }
}

readLines('./notes.txt');
```

---

## 9. Process and environment

### 97. What is the role of Process and environment in Node.js basics?

**Answer:**

In Node.js basics, the term Process and environment refers to the runtime information and configuration
exposed through the process object. It is part of the foundation a candidate should be able to
explain clearly.

**Sample:**

```js
console.log({
  pid: process.pid,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  argv: process.argv.slice(2)
});
```

---

### 98. Why is the concept of Process and environment important in Node.js basics?

**Answer:**

This concept matters because it influences the runtime information and configuration
exposed through the process object. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```js
function getDbUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }
  return process.env.DATABASE_URL;
}

console.log(getDbUrl());
```

---

### 99. When should a team focus on Process and environment?

**Answer:**

A team should focus on Process and environment when the requirement depends on the runtime
information and configuration exposed through the process object. It becomes especially important
when design decisions, debugging, or architecture conversations depend on that area.

**Sample:**

```js
const required = ['NODE_ENV', 'PORT', 'DATABASE_URL'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error('Missing environment variables:', missing.join(', '));
}
```

---

### 100. How is Process and environment applied in practice?

**Answer:**

In practice, Process and environment is applied by making the runtime information and configuration
exposed through the process object explicit in the code, workflow, or collaboration pattern. The
exact shape depends on the stack, but the responsibility should stay predictable.

**Sample:**

```js
function loadConfig() {
  return {
    env: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3000),
    logLevel: process.env.LOG_LEVEL ?? 'info'
  };
}

console.log(loadConfig());
```

---

### 101. What strengths does Process and environment bring?

**Answer:**

The strengths of Process and environment are better structure, better communication, and better
control over the runtime information and configuration exposed through the process object. It also
makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```js
console.log({
  pid: process.pid,
  uptime: process.uptime(),
  platform: process.platform,
  memory: process.memoryUsage().rss
});
```

---

### 102. What tradeoffs come with Process and environment?

**Answer:**

The main tradeoff is extra complexity if Process and environment is introduced without a real need
or a clear understanding of the runtime information and configuration exposed through the process
object. That usually leads to weak reasoning, overengineering, or fragile implementations.

**Sample:**

```js
const port = Number(process.env.PORT);
if (Number.isNaN(port)) {
  throw new Error('PORT must be numeric');
}

// Process/env flexibility is powerful, but weak validation creates fragile deploys.
```

---

### 103. How does Process and environment differ from Scaling strategies?

**Answer:**

Process and environment is centered on the runtime information and configuration exposed through the
process object, while Scaling strategies is centered on the approaches such as clustering, child
processes, and worker threads used when workloads grow. They often work together, but they solve
different parts of the topic.

**Sample:**

```js
console.log(`Single process config: pid=${process.pid}, env=${process.env.NODE_ENV}`);
console.log('Scaling strategies answer whether we need more workers or more pods.');
```

---

### 104. What is a good real-world example of Process and environment?

**Answer:**

A strong example is explaining how Process and environment affects a real feature, workflow, bug,
migration, or design choice involving the runtime information and configuration exposed through the
process object. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```js
const server = require('node:http').createServer((_req, res) => res.end('ok'));
server.listen(process.env.PORT ?? 3000);

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server gracefully...');
  server.close(() => process.exit(0));
});
```

---

### 105. What is a best practice for Process and environment?

**Answer:**

A good practice is to keep Process and environment aligned with the actual requirement around the
runtime information and configuration exposed through the process object. Teams should document
intent, keep the implementation readable, and validate important paths early.

**Sample:**

```js
const schema = {
  NODE_ENV: ['development', 'test', 'production'],
  PORT: (value) => Number.isInteger(Number(value))
};

console.log(schema);
```

---

### 106. What is a common mistake around Process and environment?

**Answer:**

A common mistake is naming Process and environment without understanding how it affects the runtime
information and configuration exposed through the process object. In real work, that usually appears
as poor decisions, weak debugging, or incomplete explanations.

**Sample:**

```js
const jwtSecret = process.env.JWT_SECRET ?? 'secret';
console.log(jwtSecret);

// Silent insecure defaults are a common production mistake.
```

---

### 107. How do you troubleshoot Process and environment-related issues?

**Answer:**

When troubleshooting Process and environment, first verify whether the runtime information and
configuration exposed through the process object is behaving as expected. Then check surrounding
dependencies, inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```js
console.log({
  pid: process.pid,
  cwd: process.cwd(),
  nodeEnv: process.env.NODE_ENV,
  rssMB: Math.round(process.memoryUsage().rss / 1024 / 1024)
});
```

---

### 108. How does Process and environment connect to the rest of Node.js basics?

**Answer:**

Process and environment connects to the rest of Node.js basics by giving structure to the runtime
information and configuration exposed through the process object. It is one of the pieces that turns
isolated facts into a coherent end-to-end explanation.

**Sample:**

```js
const cluster = require('node:cluster');

console.log({
  processId: process.pid,
  role: cluster.isPrimary ? 'primary' : 'worker',
  env: process.env.NODE_ENV
});
```

---

## 10. Scaling strategies

### 109. What is the role of Scaling strategies in Node.js basics?

**Answer:**

In Node.js basics, the term Scaling strategies refers to the approaches such as clustering, child processes,
and worker threads used when workloads grow. It is part of the foundation a candidate should be able
to explain clearly.

**Sample:**

```js
const cluster = require('node:cluster');
const os = require('node:os');

if (cluster.isPrimary) {
  for (let i = 0; i < os.availableParallelism(); i += 1) {
    cluster.fork();
  }
} else {
  require('node:http').createServer((_req, res) => res.end(`worker ${process.pid}`)).listen(3000);
}
```

---

### 110. Why is the concept of Scaling strategies important in Node.js basics?

**Answer:**

This concept matters because it influences the approaches such as clustering, child processes,
and worker threads used when workloads grow. Good interview answers connect it to clarity,
maintainability, performance, security, or delivery depending on the situation.

**Sample:**

```js
const os = require('node:os');
console.log(`Available CPUs: ${os.availableParallelism()}`);
console.log('A single Node.js process uses one main thread for JavaScript execution.');
```

---

### 111. When should a team focus on Scaling strategies?

**Answer:**

A team should focus on Scaling strategies when the requirement depends on the approaches such as
clustering, child processes, and worker threads used when workloads grow. It becomes especially
important when design decisions, debugging, or architecture conversations depend on that area.

**Sample:**

```js
function chooseScaling({ concurrentUsers, cpuBound }) {
  if (cpuBound) return 'worker_threads or external workers';
  if (concurrentUsers > 5000) return 'cluster or containers behind a load balancer';
  return 'single instance is enough';
}

console.log(chooseScaling({ concurrentUsers: 12000, cpuBound: false }));
```

---

### 112. How is Scaling strategies applied in practice?

**Answer:**

In practice, Scaling strategies is applied by making the approaches such as clustering, child
processes, and worker threads used when workloads grow explicit in the code, workflow, or
collaboration pattern. The exact shape depends on the stack, but the responsibility should stay
predictable.

**Sample:**

```js
const cluster = require('node:cluster');
const os = require('node:os');

if (cluster.isPrimary) {
  for (let i = 0; i < os.availableParallelism(); i += 1) cluster.fork();
  cluster.on('exit', () => cluster.fork());
}
```

---

### 113. What strengths does Scaling strategies bring?

**Answer:**

The strengths of Scaling strategies are better structure, better communication, and better control
over the approaches such as clustering, child processes, and worker threads used when workloads
grow. It also makes tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```js
const summary = {
  throughput: 'more requests handled across CPU cores',
  resilience: 'one worker can restart without killing every connection',
  deployment: 'horizontal scale with multiple app instances'
};

console.log(summary);
```

---

### 114. What tradeoffs come with Scaling strategies?

**Answer:**

The main tradeoff is extra complexity if Scaling strategies is introduced without a real need or a
clear understanding of the approaches such as clustering, child processes, and worker threads used
when workloads grow. That usually leads to weak reasoning, overengineering, or fragile
implementations.

**Sample:**

```js
const sessions = new Map();

function storeSessionInMemory(sessionId, userId) {
  sessions.set(sessionId, userId);
}

console.log('In-memory state becomes hard to manage when traffic is spread across workers.');
```

---

### 115. How does Scaling strategies differ from Runtime and V8?

**Answer:**

Scaling strategies is centered on the approaches such as clustering, child processes, and worker
threads used when workloads grow, while Runtime and V8 is centered on the JavaScript execution
environment and engine that power Node.js outside the browser. They often work together, but they
solve different parts of the topic.

**Sample:**

```js
console.log(`Runtime detail: ${process.version}`);
console.log('Scaling strategy: how many processes, workers, or containers we run.');
```

---

### 116. What is a good real-world example of Scaling strategies?

**Answer:**

A strong example is explaining how Scaling strategies affects a real feature, workflow, bug,
migration, or design choice involving the approaches such as clustering, child processes, and worker
threads used when workloads grow. Interviewers usually care more about the reasoning than the
definition alone.

**Sample:**

```js
const { Worker } = require('node:worker_threads');

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./image-worker.js', { workerData: file });
    worker.once('message', resolve);
    worker.once('error', reject);
  });
}
```

---

### 117. What is a best practice for Scaling strategies?

**Answer:**

A good practice is to keep Scaling strategies aligned with the actual requirement around the
approaches such as clustering, child processes, and worker threads used when workloads grow. Teams
should document intent, keep the implementation readable, and validate important paths early.

**Sample:**

```js
const http = require('node:http');

http.createServer((_req, res) => {
  res.setHeader('x-worker-id', process.pid);
  res.end('stateless response');
}).listen(3000);

// Stateless workers are easier to scale behind a load balancer.
```

---

### 118. What is a common mistake around Scaling strategies?

**Answer:**

A common mistake is naming Scaling strategies without understanding how it affects the approaches
such as clustering, child processes, and worker threads used when workloads grow. In real work, that
usually appears as poor decisions, weak debugging, or incomplete explanations.

**Sample:**

```js
const sessions = {};

function login(req, res) {
  sessions[req.headers['x-session-id']] = { userId: 42 };
  res.end('stored only in this process');
}

// Another worker will not see this in-memory session.
```

---

### 119. How do you troubleshoot Scaling strategies-related issues?

**Answer:**

When troubleshooting Scaling strategies, first verify whether the approaches such as clustering,
child processes, and worker threads used when workloads grow is behaving as expected. Then check
surrounding dependencies, inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```js
const cluster = require('node:cluster');

if (cluster.isPrimary) {
  cluster.on('exit', (worker, code, signal) => {
    console.error(`worker ${worker.process.pid} died`, { code, signal });
    cluster.fork();
  });
}
```

---

### 120. How does Scaling strategies connect to the rest of Node.js basics?

**Answer:**

Scaling strategies connects to the rest of Node.js basics by giving structure to the approaches such
as clustering, child processes, and worker threads used when workloads grow. It is one of the pieces
that turns isolated facts into a coherent end-to-end explanation.

**Sample:**

```js
const cluster = require('node:cluster');
const v8 = require('node:v8');

console.log({
  role: cluster.isPrimary ? 'primary' : 'worker',
  node: process.version,
  heapMB: Math.round(v8.getHeapStatistics().heap_size_limit / 1024 / 1024)
});
```
