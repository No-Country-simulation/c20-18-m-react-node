import express from "express"

import router from "./routes.js";


const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
