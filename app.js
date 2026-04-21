const express = require('express');
const app = express();

app.use(express.json());

let notes = [];

const VERSION = "v4";
const LAST_UPDATED = new Date().toLocaleString();

app.get('/', (req, res) => {
  res.send(`
    <h1>Notes App ${VERSION}</h1>
    <p>Last updated via CI/CD at: ${LAST_UPDATED}</p>
    <form method="POST" action="/add">
      <input name="note" placeholder="Enter note"/>
      <button type="submit">Add</button>
    </form>
    <ul>
      ${notes.map(n => `<li>${n}</li>`).join('')}
    </ul>
  `);
});

app.use(express.urlencoded({ extended: true }));

app.post('/add', (req, res) => {
  notes.push(req.body.note);
  res.redirect('/');
});

app.listen(3000, () => console.log("App running on port 3000"));