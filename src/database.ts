import fs from 'node:fs/promises'
import path from 'node:path'

const databasePath = path.join(__dirname, '..', 'db.json')

export class Database {
  #database: any = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table: string) {
    const data = this.#database[table] ?? []

    return data
  }

  findById(table: string, id: string) {
    const rowIndex = this.#database[table].findIndex(
      (row: any) => row.id === id,
    )

    if (rowIndex === -1) {
      throw new Error('Resource not found')
    }

    return this.#database[table][rowIndex]
  }

  insert(table: string, data: any) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table: string, id: string, data: any) {
    const rowIndex = this.#database[table].findIndex(
      (row: any) => row.id === id,
    )

    if (rowIndex === -1) {
      throw new Error('Resource not found')
    }

    this.#database[table][rowIndex] = { id, ...data }
    this.#persist()
  }

  delete(table: string, id: string) {
    const rowIndex = this.#database[table].findIndex(
      (row: any) => row.id === id,
    )

    if (rowIndex === -1) {
      throw new Error('Resource not found')
    }

    this.#database[table].splice(rowIndex, 1)
    this.#persist()
  }
}
