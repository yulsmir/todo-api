const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');

// const todos = fs.readFile('./todos.json', 'utf8', (error, result) => {
//   if (error) throw error;
//   console.log(JSON.parse(result));
//   return JSON.parse(result);
// });

let todos = [];

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

  // GET  /todos ---> List all todos
  if (req.method === 'GET') {
    // all todos
    if (req.url === '/todos' || req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ todos }));
    } else if (req.url === `/todos/?id=${searchId}`) {
      // Check if item with search id exists
      if (searchId <= lastItemId) {
        // GET  /todos?id=1. ----> List only single todo
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ todoItem }));
      } else {
        res.writeHead(204, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ error: 'No such item' }));
      }
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

  // PATCH /todos?id=1  ---> update existing todo using the id
  // 200 ok
  // 204 no content
  // 304 not modified
  // 404 bad request

  // TODO: fix
  // DELETE / todos ? id = 1  -- -> removes existing todo using the id
  if (req.method === 'DELETE' && req.url === `/todos/?id=${searchId}`) {
    const result = todos.filter((todo) => todo.id === !searchId);
    res.writeHead(202, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({ result }));
    return 'redirect:/';
  }
  // 202 accepted
  // 204 not content
});
server.listen(3000, () => {
  console.log(`Server running at ${3000}`);
});
