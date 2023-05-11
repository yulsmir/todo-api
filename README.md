# todo-api
### Short description
- NB: skip the database and use an array to save the todos
- Todo is an object with id: number, title: string, completed: boolean
- Data type validation

### Endpoints implemented
- [X] GET  /todos ---> List all todos
![GET home](https://github.com/yulsmir/todo-api/blob/master/assets/screenshots/get-home.png)
![GET todos](https://github.com/yulsmir/todo-api/blob/master/assets/screenshots/get-todos.png)
- [X] GET  /todos?id=1. ----> List only single todo 1 in this case is just example of id but it should work with any id stored
![GET todo by id](https://github.com/yulsmir/todo-api/blob/master/assets/screenshots/get-todos.png)
- [X] POST /todos ---> create new todo
![POST todos](https://github.com/yulsmir/todo-api/blob/master/assets/screenshots/post-todos.png)
- [X] PATCH /todos?id=1  ---> update existing todo using the id
![PATCH todo by id](https://github.com/yulsmir/todo-api/blob/master/assets/screenshots/get-id.png)
- [X] DELETE /todos?id=1  ---> removes existing todo using the id
![DELETE todos](https://github.com/yulsmir/todo-api/blob/master/assets/screenshots/delet-todo.png)

## Project setup
1. Clone repo
2. Run ```npm install``` to install dependencies
3. Run ```nodemon run``` to start server
4. Open in browser ```localhost:3000``` or ```127.0.0.1:3000```
5. Check urls and response results in dev tools:
  - ```localhost:3000/todos``` - shows all todos
  - ```localhost:3000/todos/?id=``` + add number 1-4 to show one existing item in a todo list 
  - use Thunder Client or Postman to check POST/PATCH/DELETE requests
