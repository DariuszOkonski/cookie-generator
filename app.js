const express = require("express");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { configuratorRouter } = require("./routes/configurator");
const { homeRouter } = require("./routes/home");
const { orderRouter } = require("./routes/order");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/", homeRouter);
app.use("/configurator", configuratorRouter);
app.use("/order", orderRouter);

app.listen("3000", () => {
  console.log("listening at port 3000");
});
