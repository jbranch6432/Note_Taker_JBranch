const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3000;

//Middleware: body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(_dirname, '/public/index.html'))
);


app.listen(3000, () => console.log(`Server listening at http://localhost:${PORT}`)
);