import express from "express"

import routes from "./routes"


const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/api/v1', routes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
