const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());// this is so the apps can talk with each other
app.use(express.json()); // this is the json parser that parse json from diffrent browsers

//making a post like when all the data is submitted
app.post("/pitches", async (req, res) => {
    try {
        const { date, start, know, help } = req.body// req,body give us the info in the json object
        const newData = await pool.query(
            "INSERT INTO pitches(id,date,start,know,help) VALUES(nextval('pitches_id_seq'),$1,$2,$3,$4) RETURNING *",
            [date, start, know, help]
        )
        res.json(newData.rows)
        console.log("good")

    } catch (error) {
        console.log(error)
    }
});
//get all 
app.get("/pitches", async (req, res) => {
    try {
        const allData = await pool.query(
            "SELECT * FROM pitches")
        res.json(allData.rows)// rows gives you all the data
    } catch (error) {
        console.log(error)
    }
})

//delete all
app.delete("/pitches", async (req, res) => {
    const deletee = await pool.query(
        "DELETE FROM pitches;"
    )
    res.json(deletee)

})

//delete one
app.delete("/pitches/:id", async (req, res) => {
    const { id } = req.params // this goes to the url 
    const move = await pool.query(
        "DELETE FROM pitches WHERE id = $1 RETURNING *",
        [id]
    )
    res.json(move.rows[0])
})




const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("its cool")
})

