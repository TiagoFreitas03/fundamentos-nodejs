import fs from 'node:fs'
import { parse } from 'csv-parse'

async function uploadCsv() {
	const filePath = new URL('./example.csv', import.meta.url)

	const readStream = fs.createReadStream(filePath)

	const csvParser = parse({
		delimiter: ',',
		skip_empty_lines: true,
		fromLine: 2
	})

	const csvLines = readStream.pipe(csvParser)

	for await (const line of csvLines) {
		const [title, description] = line

		await fetch('http://localhost:3333/tasks', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ title, description }),
		})

		console.log(`task "${title}" created`)

		await new Promise((resolve) => setTimeout(resolve, 1000))
	}
}

uploadCsv()
