const express = require("express");

const configuratorRouter = express.Router();

configuratorRouter.get("/select-base/:baseName", (req, res) => {
  const { baseName } = req.params;
  res.cookie("cookieBase", baseName);
  res.render("configurator/base-selected", {
    baseName,
  });
});

configuratorRouter.get("/select-addons/:addonName", (req, res) => {
  const { addonName } = req.params;
  res.send(addonName);
});

module.exports = {
  configuratorRouter,
};
