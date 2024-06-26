import { randomUUID } from 'node:crypto'

import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
	{
		method: 'GET',
		path: buildRoutePath('/tasks'),
		handler: (_req, res) => {
			const tasks = database.select('tasks')

			return res.end(JSON.stringify(tasks.map(task => {
				return {
					...task,
					completed: task.completed_at !== null
				}
			})))
		}
	},
	{
		method: 'POST',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { title, description } = req.body

			if (!title || !description) {
				return res.writeHead(400).end()
			}

			const task = {
				id: randomUUID(),
				title,
				description,
				completed_at: null,
				created_at: new Date(),
				updated_at: new Date(),
			}

			database.insert('tasks', task)

			return res.writeHead(201).end()
		}
	},
	{
		method: 'PUT',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params
			const { title, description } = req.body

			if (!title || !description) {
				return res.writeHead(400).end()
			}

			const task = database.findById('tasks', id)

			database.update('tasks', id, {
				...task,
				title,
				description,
				updated_at: new Date(),
			})

			return res.writeHead(204).end()
		}
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params

			database.delete('tasks', id)

			return res.writeHead(204).end()
		}
	},
	{
		method: 'PATCH',
		path: buildRoutePath('/tasks/:id/complete'),
		handler: (req, res) => {
			const { id } = req.params

			const task = database.findById('tasks', id)
			const isTaskCompleted = task.completed_at !== null

			database.update('tasks', id, {
				...task,
				completed_at: isTaskCompleted ? null : new Date()
			})

			return res.writeHead(204).end()
		}
	}
]
