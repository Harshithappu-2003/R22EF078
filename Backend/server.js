const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Change from 3000 to 5000

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
