const Hero = require("../models/hero");
const asyncHandler = require("express-async-handler");

// Display Hero list.
exports.heroes_list = asyncHandler(async (req, res, next) => {
  try {
      const heroes = await Hero.find().populate("pet");

      res.json(heroes);
    } catch (error) {
      next(error);
    }
});