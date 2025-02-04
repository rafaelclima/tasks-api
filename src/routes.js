import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';
import { randomUUID } from 'node:crypto';

// Query Parameters: URL stateful => Filtros, paginação, ordenação, group by
// Ex.: /users?name=rafael
// Route Parameters: URL stateless => Identificar um recurso na aplicação
// 	Ex.: /users/:id
// Request Body: Envio de informações para o backend
// 	Ex.: {"name": "Rafael", "email": "rafael@example.com"}

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;
      const tasks = database.select(
        'tasks',
        search
          ? {
              title: search,
              description: search
            }
          : null
      );
      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .writeHead(401)
          .end('Título e descrição são necessários para o correto cadastramento!');
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null
      };

      database.insert('tasks', task);

      return res.writeHead(201).end();
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      try {
        const task = database.select('tasks', { id })[0];
        const { title, description } = req.body;

        if (!task) return res.writeHead(404).end('ID da tarefa não encontrado');

        if (!title || !description) {
          return res.writeHead(401).end('Título e descrição são necessários para atualizar a task');
        }

        database.update('tasks', id, { ...task, title, description, updated_at: new Date() });

        return res.writeHead(204).end();
      } catch (error) {
        return res.writeHead(404).end('ID da tarefa nao encontrado');
      }
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      try {
        const task = database.select('tasks', { id })[0];
        const updatedTask = { ...task, completed_at: new Date() };
        database.path('tasks', id, updatedTask);
        return res.writeHead(204).end();
      } catch (error) {
        return res
          .writeHead(404, { 'Content-Type': 'application/json' })
          .end('ID da tarefa nao encontrado');
      }
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      try {
        database.delete('tasks', id);
        return res.writeHead(204).end();
      } catch (error) {
        return res
          .writeHead(404, { 'Content-Type': 'application/json' })
          .end('ID da tarefa nao encontrado');
      }
    }
  }
];
