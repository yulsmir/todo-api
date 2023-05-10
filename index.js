const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');

// const SERVER_URL = new URL('https://127.0.0.1:3000/');

// URL_DATA.search = '?id=';

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

const server = http.createServer((req, res) => {
  // const URL = new URL(`${req.url}`);
  const searchId = 1;
  const todo = todos.filter((todo) => todo.id === searchId);

  // GET
  if (req.method === 'GET') {
    if (req.url === '/todos' || req.url === '/') {
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
});

server.listen(3000, () => {
  console.log(`Server running at ${3000}`);
});
