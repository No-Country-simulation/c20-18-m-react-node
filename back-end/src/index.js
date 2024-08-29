const express = require("express");

const routes = require("./routes");


const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/api/v1', routes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
