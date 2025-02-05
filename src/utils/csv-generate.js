import fs from 'node:fs';
import { parse } from 'csv-parse';

const csvPath = new URL('../importedTasks.csv', import.meta.url);

export const csvImport = async () => {
  const results = [];
  fs.createReadStream(csvPath)
    .pipe(parse({ delimiter: ',', columns: true }))
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', async () => {
      for await (const result of results) {
        const title = result.Titulo;
        const description = result.Descricao;

        await fetch('http://localhost:3100/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description })
        });
      }
    });
};

csvImport();
