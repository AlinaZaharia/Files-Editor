const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const cors = require('cors');
//const citesteFis = require('./citesteFis');

async function citesteFis(req, res, next) {
  const dirname = './fisiere/originale/';
  const rezultat = [];

  const listaFisiere = await fs.promises.readdir(dirname);

  for (const file of listaFisiere) {
    const continutFisier = await fs.promises.readFile(dirname + file, 'utf-8');
    rezultat.push({ numeFis: file, text: continutFisier });
  }

  req.rezultat = rezultat;
  next();
}
app.use(cors());
app.get('/fisiere', citesteFis, (req, res) => {
  res.json([...req.rezultat]);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
