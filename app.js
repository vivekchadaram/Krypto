import {} from 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import registerRouter from "./routes/registerRoute.js";
import alertRouter from "./routes/alertRoute.js";
import loginRouter from "./routes/loginRoute.js";


const app = express();

app.use(express.json())

const URL=
"mongodb+srv://template-1:TquDF0IARQ02ltPp@cluster0.9btsl.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.PORT || 4000;

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

app.use('/register', registerRouter);
app.use("/login", loginRouter);
app.use('/alert',alertRouter);