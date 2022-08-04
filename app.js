const express = require("express");
const { engine, create } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { configuratorRouter } = require("./routes/configurator");
const { homeRouter } = require("./routes/home");
const { orderRouter } = require("./routes/order");
const path = require("path");
const { handlebarsHelpers } = require("./utils/handlebars-helpers");

const app = express();
const hbs = create({
  helpers: handlebarsHelpers,
});

app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/", homeRouter);
app.use("/configurator", configuratorRouter);
app.use("/order", orderRouter);

app.listen("3000", () => {
  console.log("listening at port 3000");
});
