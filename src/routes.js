import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'
import { randomUUID } from 'node:crypto'

// Query Parameters: URL stateful => Filtros, paginação, ordenação, group by
// Ex.: /users?name=rafael
// Route Parameters: URL stateless => Identificar um recurso na aplicação
// 	Ex.: /users/:id
// Request Body: Envio de informações para o backend
// 	Ex.: {"name": "Rafael", "email": "rafael@example.com"}

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = database.select(
        'tasks',
        search
          ? {
              title: search,
              description: search,
            }
          : null,
      )
      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description, completed_at, created_at, updated_at } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at,
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description, completed_at, created_at, updated_at } = req.body

      database.update('tasks', id, { title, description, completed_at, created_at, updated_at: new Date() })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.select('tasks', { id })[0]

      if (!task) {
        return res.writeHead(404).end()
      }

      const updatedTask = { ...task, completed_at: new Date() }

      database.path('tasks', id, updatedTask)

      return res.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      database.delete('tasks', id)

      return res.writeHead(204).end()
    },
  },
]
