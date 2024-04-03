const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({
    path: "./src/config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
      .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log("DB connection successful!");
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});





