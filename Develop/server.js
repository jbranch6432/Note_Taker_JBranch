const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const app = express();

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// //API Routes
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
    res.sendfile(path.join(__dirname, 'public/notes.html'));

});

app.get('/api/notes', (req, res) => {
    return res.sendFile(path.json(__dirname, 'db/db.json'));
})

// app.post('/api/notes', (req, res))

app.listen(3000, () => console.log(`Server listening at http://localhost:${PORT}`)
);