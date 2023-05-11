# todo-api
### Short description
- NB: skip the database and use an array to save the todos
- Todo is an object with id: number, title: string, completed: boolean
- Data type validation

### Endpoints implemented
- [X] GET  /todos ---> List all todos
- [X] GET  /todos?id=1. ----> List only single todo 1 in this case is just example of id but it should work with any id stored
- [X] POST /todos ---> create new todo
- [X] PATCH /todos?id=1  ---> update existing todo using the id
- [X] DELETE /todos?id=1  ---> removes existing todo using the id

## Project setup
1. Clone repo
2. Run ```npm install``` to install dependencies
3. Run ```nodemon run``` to start server
4. Open in browser ```localhost:3000``` or ```127.0.0.1:3000```
5. Check urls and response results in dev tools:
  - ```localhost:3000/todos``` - shows all todos
  - ```localhost:3000/todos/?id=``` + add number 1-4 to show one existing item in a todo list 
  - use Thunder Client or Postman to check POST/PATCH/DELETE requests

## Server demo
[![Watch the demo](link to preview)]([https://youtu.be/vt5fpE0bzSY](https://raw.githubusercontent.com/yulsmir/todo-api/master/videos/Server%20Work%20Demo.mov))