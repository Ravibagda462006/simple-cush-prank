const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/save", (req, res) => {

    const data = req.body;

    let oldData = [];

    if (fs.existsSync("data.json")) {
        oldData = JSON.parse(fs.readFileSync("data.json"));
    }

    oldData.push(data);

    fs.writeFileSync("data.json", JSON.stringify(oldData, null, 2));

    res.json({ message: "Saved successfully" });
});

app.get("/data", (req, res) => {

    if (!fs.existsSync("data.json")) {
        return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync("data.json"));

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});