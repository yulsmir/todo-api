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
    completed: false,
  },
  {
    id: 2,
    title: 'Title 2',
    completed: false,
  },
  {
    id: 3,
    title: 'Title 3',
    completed: false,
  },
  {
    id: 4,
    title: 'Title 4',
    completed: false,
  },
];

const server = http.createServer((req, res) => {
  const serverURL = url.parse(req.url, true);
  const searchId = parseInt(serverURL.query.id);
  const searchedItem = todos[searchId - 1];
  const lastItemId = todos.length;
  const currentId = lastItemId + 1;

  const todo = {
    id: currentId,
    title: `Title ${currentId}`,
    completed: false,
  };

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
        res.end(JSON.stringify({ todo: searchedItem }));
      } else {
        res.writeHead(204, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ error: 'No such item' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ error: 'Wrong get request' }));
    }
  }

  // POST
  if (req.method === 'POST' && req.url === '/todos') {
    todos.push(todo);
    res.writeHead(201, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({ todos }));
  }

  // PATCH /todos?id=1  ---> update existing todo using the id
  if (req.method === 'PATCH' && req.url === `/todos/?id=${searchId}`) {
    console.log(searchedItem);
    // Change values of title and completed status. ID stays the same
    searchedItem.title !== 'Edited'
      ? (searchedItem.title = 'Edited')
      : (searchedItem.title = 'Edited again');

    searchedItem.completed === true
      ? (searchedItem.completed = false)
      : (searchedItem.completed = true);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({ todo: searchedItem }));
  } else {
    res.writeHead(204, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({ error: 'No content' }));
  }
  // 200 ok
  // 204 no content
  // 304 not modified
  // 404 bad request

  // TODO: fix
  // DELETE / todos ? id = 1  -- -> removes existing todo using the id
  if (req.method === 'DELETE' && req.url === `/todos/?id=${searchId}`) {
    const result = todos.filter((item) => item.id !== searchId);
    // result.slice(0, searchId).concat(todos.slice(searchId + 1));
    res.writeHead(202, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({ todos: result }));
    return 'redirect:/';
  }
  // 204 not content
});
server.listen(3000, () => {
  console.log(`Server running at ${3000}`);
});
