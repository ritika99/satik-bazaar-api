const express = require("express");
const app = express();
const importData = require("./data.json")
let port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Hello Express");
})

app.get("/products", (req, res) => {
    res.send(importData);
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})