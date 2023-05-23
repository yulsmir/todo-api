const http = require('node:http');
const url = require('node:url');

const PORT = 3000;

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
  const searchedItem = todos?.[searchId - 1];
  const searchIndex = todos?.findIndex((item) => item.id === searchId);
  const firstItemId = todos[0]?.id;
  const lastItemId = todos?.length;
  const currentId = lastItemId + 1;
  const responseHead = { 'Content-Type': 'application/json' };

  const todo = {
    id: currentId,
    title: `Title ${currentId}`,
    completed: false,
  };

  // ------- GET -------
  // /todos ---> List all todos
  if (req.method === 'GET') {
    // Get all todos
    if (req.url === '/todos' || req.url === '/') {
      res.writeHead(200, responseHead);
      res.end(JSON.stringify({ todos }));
    } else if (req.url === `/todos?id=${searchId}`) {
      // Check if item with search id exists
      if (searchId <= lastItemId) {
        // /todos?id=1 ----> List only single todo
        res.writeHead(200, responseHead);
        res.end(JSON.stringify({ todo: searchedItem }));
      } else {
        res.writeHead(204, responseHead);
        res.end(JSON.stringify({ error: 'No such item' }));
      }
    } else {
      res.writeHead(404, responseHead);
      res.end(JSON.stringify({ error: 'Wrong get url' }));
    }
  }

  // ------- POST -------
  else if (req.method === 'POST' && req.url === '/todos') {
    todos.push(todo);
    res.writeHead(201, responseHead);
    res.end(JSON.stringify({ todos }));
  }

  // ------- PATCH -------
  // /todos?id=1  ---> update existing todo using the id
  else if (req.method === 'PATCH' && req.url === `/todos?id=${searchId}`) {
    console.log(searchedItem);

    // Change values of title and completed status. ID stays the same
    searchedItem.title !== 'Edited'
      ? (searchedItem.title = 'Edited')
      : (searchedItem.title = 'Edited again');

    searchedItem.completed === true
      ? (searchedItem.completed = false)
      : (searchedItem.completed = true);

    res.writeHead(200, responseHead);
    res.end(JSON.stringify({ todo: searchedItem }));
  }

  // ------- DELETE -------
  // /todos?id=1  -- -> removes existing todo using the id
  else if (req.method === 'DELETE' && req.url === `/todos?id=${searchId}`) {
    if (searchId <= lastItemId && searchId >= firstItemId) {
      // Delete with filter - v1
      // result = todos.filter((item) => item.id !== searchIndex);
      // Delete with slice - v2
      todos = todos.slice(0, searchIndex).concat(todos.slice(searchIndex + 1));
      console.log(todos);
      res.writeHead(202, responseHead);
      res.end(JSON.stringify({ todos: todos }));
    } else {
      res.writeHead(204, responseHead);
      res.end(JSON.stringify({ error: 'Cannot delete item. Item id is out of range.' }));
    }
  } else {
    res.writeHead(404, responseHead);
    res.end(JSON.stringify({ error: 'Server error. URL not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
