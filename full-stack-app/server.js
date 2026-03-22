const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "notes.json";

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify([]));
}

// get notes

app.get("/notes", (req,res)=>{
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// add note

app.post("/notes", (req,res)=>{
  const data = JSON.parse(fs.readFileSync(FILE));

  const newNote = {
    id: Date.now(),
    text: req.body.text
  };

  data.push(newNote);

  fs.writeFileSync(FILE, JSON.stringify(data));

  res.json(newNote);
});

// delete note

app.delete("/notes/:id", (req,res)=>{

  let data = JSON.parse(fs.readFileSync(FILE));

  data = data.filter(n => n.id != req.params.id);

  fs.writeFileSync(FILE, JSON.stringify(data));

  res.json({msg:"deleted"});
});

app.listen(8000, ()=>{
  console.log("server running on 8000");
});