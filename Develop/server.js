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

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));

});

app.get('/api/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, 'db/db.json'));
})

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {
    
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        // Parse the notes, add a new note with a unique ID
        const notes = JSON.parse(data);
        const newNote = {
            id: uuid(),
            title: req.body.title,
            text: req.body.text
        };
        notes.push(newNote);

        // Write the updated notes back to db.json
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save note' });
            }

            // Send the new note in the response
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    // Read the existing notes
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        // Parse the notes and filter out the one with the given ID
        const notes = JSON.parse(data);
        const filteredNotes = notes.filter(note => note.id !== req.params.id);

        // Write the updated list of notes back to db.json
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(filteredNotes, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete note' });
            }

            // Send a success response
            res.json({ success: true, message: 'Note deleted' });
        });
    });
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`)
);