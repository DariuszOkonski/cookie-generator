const express = require("express");
const { COOKIE_ADDONS, COOKIE_BASES } = require("../data/cookies-data");
const { getAddonsFromReq } = require("../utils/get-addons-from-req");
const { handlebarsHelpers } = require("../utils/handlebars-helpers");

const orderRouter = express.Router();

orderRouter.get("/summary", (req, res) => {
  const { cookieBase } = req.cookies;

  const addons = getAddonsFromReq(req);

  let sum =
    (cookieBase
      ? handlebarsHelpers.findPrice(Object.entries(COOKIE_BASES), cookieBase)
      : 0) +
    addons.reduce((prev, cur) => {
      return (
        prev + handlebarsHelpers.findPrice(Object.entries(COOKIE_ADDONS), cur)
      );
    }, 0);

  res.render("order/summary", {
    cookie: {
      base: cookieBase,
      addons: addons,
    },
    bases: Object.entries(COOKIE_BASES),
    addons: Object.entries(COOKIE_ADDONS),
    sum,
  });
});

module.exports = {
  orderRouter,
};
