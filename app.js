const express = require("express");
const mockData = require("./db.json")

let app = express();

app.use(express.json())

// GET end-point 
app.get("/", (req, res) => {
    console.log("GET Request Started");
    res.header("Content-Type", "application/json")
    res.send("Welcome to Home page");
})

app.get("/users", (req, res) => {
    console.log("GET Request Started");
    res.header("Content-Type", "application/json")
    res.send(mockData);
})

// POST end-point
// for posting data
app.post("/users", (req, res) => {
    const temp = req.body;
    const newData = [...mockData, temp]
    res.status(201).json({ data: newData});
})

// Patch end-point
// for updating data
app.patch("/users/:id", (req, res) => {
    const id = +req.params.id;
    const newData = mockData.map((el) => {
        if(el.id === id){
            return { ...el, ...req.body }
        }

        return el
    })
    res.status(200).json({ data: newData })
} )

// DELETE end-point
// for deleting address
app.delete("/users/:id", (req, res) => {
    const id = +req.params.id;
    const newData = mockData.filter((el) => el.id !== id)
    res.status(200).json({data: newData})
})


app.listen(8000, () => {
    console.log("Server Started on PORT 8000");
})