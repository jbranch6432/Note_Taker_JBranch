const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3000;

//Middleware: body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// //API Routes
app.get('/', (req, res) =>
    res.sendFile(path.join(_dirname, '/public/index.html'))
);

app.get('/notes', (req, res) {
    res.sendfile(path.join(__dirname, 'public/index.html'));

});

app.get('/api/notes', (req, res) {
    return res.sendFile(path.json(__dirname, 'db/db.json'));
})

app.listen(3000, () => console.log(`Server listening at http://localhost:${PORT}`)
);