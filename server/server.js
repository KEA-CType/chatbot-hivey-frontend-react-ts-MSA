const express = require("express");
const app = express();
const api = require("./routes/index");

app.use("/apis", api);

const port = 3002;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
