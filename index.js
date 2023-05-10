const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');

// const todos = fs.readFile('./todos.json', 'utf8', (error, result) => {
//   if (error) throw error;
//   console.log(JSON.parse(result));
//   return JSON.parse(result);
// });

let todos = [
  {
    id: 1,
    title: 'Title 1',
    completed: true,
  },
  {
    id: 2,
    title: 'Title 2',
    completed: true,
  },
  {
    id: 3,
    title: 'Title 3',
    completed: true,
  },
  {
    id: 4,
    title: 'Title 4',
    completed: true,
  },
];

/*const server = http.createServer((req, res) => {
  const serverUrl = url.parse(req.url, true);
  // const searchId = 1;
  // const todo = todos.filter((todo) => todo.id === searchId);

  // GET
  if (req.method === 'GET') {
    if (req.url === '/todos' || req.url === '/') {
      console.log(serverUrl);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ todos }));
    } else if (req.url === `/todos/?id=${searchId}`) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ todo }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Incorrect url');
    }
  }

  // POST
  if (req.method === 'POST') {
    if (req.url === '/todos') {
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ todos }));
    }
  }
});*/

const server = http.createServer((req, res) => {
  const serverURL = url.parse(req.url, true);
  const searchId = serverURL.query.id;
  const todoItem = todos[searchId - 1];
  const lastItemId = todos.length;
  const currentId = lastItemId + 1;

  // GET
  if (req.method === 'GET') {
    // all todos
    if (req.url === '/todos') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ todos }));
    } else if (req.url === `/todos/?id=${searchId}`) {
      // Get todo by query id value
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ todoItem }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Wrong get request');
    }
  }

  // POST
  if (req.method === 'POST' && req.url === '/todos') {
    const todo = {
      id: currentId,
      title: `Title ${currentId}`,
      completed: false,
    };
    todos.push(todo);
    res.writeHead(201, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({ todos }));
  }

  // PATCH
  // 200 ok
  // 204 no content
  // 304 not modified
  // 404 bad request

  // DELETE
});
server.listen(3000, () => {
  console.log(`Server running at ${3000}`);
});
