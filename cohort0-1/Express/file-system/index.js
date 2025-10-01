const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
const port = 3115;

const FILES_DIR = path.join(__dirname, 'files');

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the File System API! Try navigating to /files.');
});


// GET /files -> List all files
app.get('/files', (req, res) => {
  fs.readdir(FILES_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ msg: 'Error reading files' });
    }
    res.json({ files });
  });
});



// GET /files/:filename -> Read content of a file
app.get('/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(FILES_DIR, filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ msg: 'File not found' });
  }

  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ msg: 'Error reading file' });
    }
    res.json({ filename, content: data });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
