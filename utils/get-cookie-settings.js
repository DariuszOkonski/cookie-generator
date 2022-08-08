const { COOKIE_ADDONS, COOKIE_BASES } = require("../data/cookies-data");
const { getAddonsFromReq } = require("./get-addons-from-req");
const { handlebarsHelpers } = require("../utils/handlebars-helpers");

function getCookieSettings(req) {
  const { cookieBase: base } = req.cookies;

  const addons = getAddonsFromReq(req);

  const allBases = Object.entries(COOKIE_BASES);
  const allAddons = Object.entries(COOKIE_ADDONS);

  let sum =
    (base ? handlebarsHelpers.findPrice(allBases, base) : 0) +
    addons.reduce((prev, cur) => {
      return prev + handlebarsHelpers.findPrice(allAddons, cur);
    }, 0);

  return {
    // selected studd
    addons,
    base,

    // calculations
    sum,

    // all possibilities
    allBases,
    allAddons,
  };
}

module.exports = {
  getCookieSettings,
};
