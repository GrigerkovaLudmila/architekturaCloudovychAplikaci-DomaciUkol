const express = require("express");
const cors = require("cors");

const app = express();
const port = 8888;

const categoryController = require("./controller/category");
const groceryItemController = require("./controller/groceryItem");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("FridgeSpy server is running");
});

app.use("/category", categoryController);
app.use("/groceryItem", groceryItemController);

app.listen(port, () => {
  console.log(`FridgeSpy server listening on port ${port}`);
});