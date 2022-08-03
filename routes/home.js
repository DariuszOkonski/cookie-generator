const express = require("express");
const { COOKIE_BASES, COOKIE_ADDONS } = require("../data/cookies-data");
const { handlebarsHelpers } = require("../handlebars-helpers");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  const { cookieBase } = req.cookies;

  let sum =
    (cookieBase
      ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), cookieBase)
      : 0) +
    ["coconut", "cranberries", "honey"].reduce((prev, cur) => {
      return (
        prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), cur)
      );
    }, 0);
  res.render("home", {
    cookie: {
      base: cookieBase,
      addons: ["coconut", "cranberries", "honey"],
    },
    bases: Object.entries(COOKIE_BASES),
    addons: Object.entries(COOKIE_ADDONS),
    sum: sum,
  });
});

module.exports = {
  homeRouter,
};
