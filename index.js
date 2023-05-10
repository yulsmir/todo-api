const http = require('node:http');
const fs = require('node:fs');

const PORT = 3000;
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
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.end('Home');

  // READ JSON data
  if (req.method === 'GET') {
    if (req.url === '/todos') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify({ todos }));
    }
  }
});

// const readData = () => {
//   fs.readFile('./todos.json', 'utf-8', (error, data) => {
//     if (error) throw error;
//     const todos = JSON.parse(data);
//     console.log(todos);
//     return todos;
//   });
// };

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}...`);
});
