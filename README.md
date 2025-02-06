# tasks-api

This is a simple Node.js API for managing tasks using a CSV file as input. 

## Installation

```bash
npm install
```

# Usage
1. Create a CSV file named importedTasks.csv with the following format:

Ex.:
Titulo,Descricao
Tarefa 1,Descrição da tarefa 1
Tarefa 2,Descrição da tarefa 2

2. Run the following command to start the server:
```bash
npm run dev
```

3. Access the API at http://localhost:3100/tasks

# Code Breakdown

server.js: This file contains the main logic for the server, including:

* Parsing request parameters: Extracts query parameters and route parameters from the request URL.
* Routing requests: Matches incoming requests to specific routes defined in routes.js.
* Handling requests: Calls the appropriate handler function based on the matched route.

routes.js: This file defines the API endpoints for managing tasks:

* GET /tasks: Retrieves all tasks from the database.
* POST /tasks: Creates a new task in the database.
* PUT /tasks/:id: Updates an existing task in the database.
* PATCH /tasks/:id/complete: Marks a task as completed.
* DELETE /tasks/:id: Deletes a task from the database.

database.js: This file defines the database logic for storing and retrieving tasks: