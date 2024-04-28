require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

app.use("/register", require("./routes/Register"));

app.use("/login", require("./routes/Login"));

app.use("/addtrain", require("./routes/AddTrain"));

app.use("/trains", require("./routes/Trains"));

app.use("/book", require("./routes/Book"));

app.use("/booking", require("./routes/Booking"));

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
