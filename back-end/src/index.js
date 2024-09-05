import express from "express"
import cors from "cors"
import router from "./routes.js";


const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}))

app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
