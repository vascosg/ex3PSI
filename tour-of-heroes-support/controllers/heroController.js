const Hero = require("../models/hero");
const Pet = require("../models/pet");
const asyncHandler = require("express-async-handler");

// Display Hero detail.
exports.hero_detail = asyncHandler(async (req, res, next) => {
  try {
      const hero = await Hero.findById(req.params.id).populate("pet"); //aqui fazemos populare de pet para também obter as informações do pet

      if (!hero) {
        return res.status(404).json({ message: "Hero not found" });
      }

      res.json(hero);
    } catch (error) {
      next(error);
    }
});

// Display Hero delete.
exports.hero_delete = asyncHandler(async (req, res, next) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.json({ message: "Hero deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Handle Hero create on POST.
exports.hero_create_post = asyncHandler(async (req, res, next) => {
  try {
    const { name, pet } = req.body;

    const hero = new Hero({ name, pet: pet || null });

    await hero.save();

    if (pet) {
      await Pet.findByIdAndUpdate(pet, { hero: hero._id });
    }

    res.status(201).json(hero);
  } catch (error) {
    next(error);
  }
});
