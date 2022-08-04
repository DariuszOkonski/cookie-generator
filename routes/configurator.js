const express = require("express");
const { COOKIE_ADDONS, COOKIE_BASES } = require("../data/cookies-data");
const { getAddonsFromReq } = require("../utils/get-addons-from-req");

const configuratorRouter = express.Router();

configuratorRouter.get("/select-base/:baseName", (req, res) => {
  const { baseName } = req.params;

  if (!COOKIE_BASES[baseName]) {
    return res.render("error", {
      description: `There is no such base as ${baseName}`,
    });
  }

  res.cookie("cookieBase", baseName);
  res.render("configurator/base-selected", {
    baseName,
  });
});

configuratorRouter.get("/add-addons/:addonName", (req, res) => {
  const { addonName } = req.params;

  if (!COOKIE_ADDONS[addonName]) {
    return res.render("error", {
      description: `There is no such addon as ${addonName}`,
    });
  }

  const addons = getAddonsFromReq(req);

  if (addons.includes(addonName)) {
    return res.render("error", {
      description: `${addonName} is already on your cookie. You can not added twice`,
    });
  }

  addons.push(addonName);

  res.cookie("cookieAddons", JSON.stringify(addons));
  res.render("configurator/added", {
    addonName,
  });
});

configuratorRouter.get("/delete-addon/:addonName", (req, res) => {
  const { addonName } = req.params;

  const oldAddons = getAddonsFromReq(req);

  if (!oldAddons.includes(addonName)) {
    return res.render("error", {
      description: `Can not delete something that isn't already added to the cookie. ${addonName} not found on cookie`,
    });
  }

  const addons = oldAddons.filter((addon) => addon !== addonName);

  res.cookie("cookieAddons", JSON.stringify(addons));
  res.render("configurator/deleted", {
    addonName,
  });
});

module.exports = {
  configuratorRouter,
};
