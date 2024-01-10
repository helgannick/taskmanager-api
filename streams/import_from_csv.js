import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import fetch from 'node-fetch';

const csvPath = './task.csv'; // Substitua pelo caminho real do seu arquivo CSV

const csvParse = parse({
  delimiter: ',',
  columns: true, // Define a primeira linha do CSV como cabeçalho
  skipEmptyLines: true,
});

async function importFromCSV() {
  const stream = createReadStream(csvPath);

  for await (const record of stream.pipe(csvParse)) {
    const { title, description } = record;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    // Uncomment this line to see the import working in slow motion (open the db.json)
    // await wait(1000);
  }

  console.log('Importação concluída.');
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

importFromCSV();
