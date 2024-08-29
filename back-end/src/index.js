const express = require("express");
const morgan = require('morgan')
const routes = require("./routes");


const app = express();
const port = process.env.PORT;
app.use(morgan('dev'))
app.use(express.json());

app.use('/api/v1', routes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
