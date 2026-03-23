const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB connection */
mongoose.connect(
"mongodb+srv://tomaintainmyself2022_db_user:UKR56EuHkUk6Xi4R@cluster0.gipthnd.mongodb.net/notesDB?retryWrites=true&w=majority"
)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));


/* Schema */
const noteSchema = new mongoose.Schema({
  text: String
});

/* Model */
const Note = mongoose.model("Note", noteSchema);


/* get notes */
app.get("/notes", async (req,res)=>{
  const data = await Note.find();
  res.json(data);
});


/* add note */
app.post("/notes", async (req,res)=>{

  const newNote = new Note({
    text: req.body.text
  });

  await newNote.save();

  res.json(newNote);
});


/* delete note */
app.delete("/notes/:id", async (req,res)=>{

  await Note.findByIdAndDelete(req.params.id);

  res.json({msg:"deleted"});
});


app.listen(8000,"0.0.0.0", ()=>{
  console.log("server running on 8000");
});
