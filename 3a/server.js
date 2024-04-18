const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to list all files in the "public" directory
app.get('/', (req, res) => {
    fs.readdir(path.join(__dirname, 'public'), (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Error reading directory');
            return;
        }

        let fileList = '<ul>';
        files.forEach((file) => {
            fileList += `<li><a href="/${file}">${file}</a></li>`;
        });
        fileList += '</ul>';

        res.send(`
      <h1>Files in the "public" directory:</h1>
      ${fileList}
    `);
    });
});

// Route to display the content of a file
app.get('/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'public', req.params.filename);

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(404).send('File not found');
            return;
        }

        res.send(`
      <h1>Content of ${req.params.filename}:</h1>
      <pre>${content}</pre>
    `);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});