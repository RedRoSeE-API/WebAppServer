import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());

// Enabling communication between different origins
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', "UPDATE", "DELETE"],
    credentials: true,

}));

// Parses incoming request bodies in URL-encoded format and makes it available in req.body.
app.use(bodyParser.urlencoded({ extended: true }));


let notes = [
    {id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non velit sed metus aliquam elementum sed ultrices dui. Sed mollis elit sem, pharetra placerat dolor sodales id. Sed lorem nibh, varius posuere nulla quis, sodales sodales lorem."},
    {id: 2, text: "Vestibulum a nulla hendrerit nibh interdum egestas quis at nibh. Cras volutpat fermentum pellentesque. Phasellus lobortis pulvinar purus nec suscipit. Sed mauris sapien, imperdiet volutpat porta et, tristique vel libero."},
    {id: 3, text: "Maecenas in urna sed felis efficitur dictum. Ut hendrerit sapien sit amet auctor fermentum. Integer tempus maximus lorem. Etiam tellus enim, eleifend et scelerisque at, sollicitudin a purus. Mauris congue ornare libero, hendrerit pretium velit aliquam in."}
];

app.get('/getAllNotes' , (req, res) => {

    return res.json(notes);

});

app.post('/getOneNote' , (req, res) => {

    const id = req.body.id;
    const index = notes.findIndex(obj => obj.id == id);

    //Check if id is valid
    if (index !== -1) {
        return res.json(notes[index]);
    }

    return res.sendStatus(400);

});


app.post('/createNote' , (req, res) => {


    const id = notes.length + 1;
    const text = req.body.text;

    //Check if text isn't blank
    if(text == ""){
        return res.sendStatus(400);
    }

    notes.push({id: id, text: text})

    res.sendStatus(200)

});

app.post('/updateNote' , (req, res) => {

    const id = req.body.id;
    const text = req.body.text;

    //Check if id is valid
    if(id < 0 || id > notes.length || isNaN(Number(id))){
        return res.sendStatus(400)
    }

    const index = notes.findIndex(obj => obj.id == id);
   
    if (index !== -1) {
        notes[index].text = text;
    }

    res.sendStatus(200)

});

app.post('/deleteNote' , (req, res) => {

    const id = req.body.id;

    //Check if id is valid
    if(id < 0 || isNaN(Number(id))){ 
        return res.sendStatus(400)
    }

    const index = notes.findIndex(obj => obj.id == id);

    //Check if id is valid
    if(index == -1) {
        return res.sendStatus(400)
    }

    if (index !== -1) {
        notes.splice(index, 1);
        res.sendStatus(200)
    }

});


app.listen(3001, () => {
    console.log("Connected to port 3001");
});







