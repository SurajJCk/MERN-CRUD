//Load env variables
if (process.env.NODE_ENV !='production'){
    require("dotenv").config();
}


//Import dependencies
const express = require('express');
const connectToDb = require('./config/connectToDb');
const Note = require('./models/note');

//Create an express app
const app =express();

//Configure express app
app.use(express.json());

//Connect to databse
connectToDb();

//Routing
app.get('/', (req, res)=> {
    res.json({hello:'world'});
});

app.get('/notes', async (req, res) =>{
    //Find the notes
    const notes = await Note.find();
    //Respond with them
    res.json({ notes: notes});
});

app.get('/notes/:id', async (req, res) => {
    //Get id off the url
    const noteId = req.params.id;

    //Find the note using the id
    const note = await Note.findById(noteId);

    //Respond with the note
    res.json({note:note});
})

app.post('/notes', async (req, res) => {
    //Get the sent in data off request body
    const title = req.body.title;
    const body = req.body.body;

    //Create a note with it
    const note = await Note.create({
        title:title,
        body: body,
    });

    //Respond with the new note 
    res.json({note: note});

});

app.put('/notes', async (req, res) => {

    //Get the id off the url
    const noteId = req.params.id;

    //Get the data off the req body
    const title = req.body.title;
    const body = req.body.body;
    
    //Find and update the record
    const note = await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body,
    })

    //Respond with it
    res.json({note:note});
})
//Starting our server
app.listen(process.env.PORT);

