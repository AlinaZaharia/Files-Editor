const express = require("express");
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const cors = require('cors');

const dirname = './fisiere/originale/';

async function citesteFis(req, res, next){
    const rezultat = [];

    const listaFisiere = await fs.promises.readdir(dirname);
    
    for(const file of listaFisiere){
        const continutFisier = await fs.promises.readFile(dirname+file, 'utf-8');
        rezultat.push({numeFis:file, text:continutFisier});
    }

    req.rezultat=rezultat;
    next();
}

function descarcaFisier(fisier){
    fs.writeFile(dirname + fisier.name, fisier.data, (err)=>{console.log(err)} );
}

app.use(cors());

app.get("/fisiere", citesteFis, (req, res) => {
    res.json([...req.rezultat]);
});

app.post("/fisiere", 
    fileUpload({ createParentPath: true })
    , (req, res) => {
        descarcaFisier(req.files.fisier);
        return res.json();
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


