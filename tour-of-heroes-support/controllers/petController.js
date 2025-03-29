const Pet = require("../models/pet");
const Hero = require("../models/hero");
const asyncHandler = require("express-async-handler");

// Display list of all Pet s id s.
exports.pet_ids = asyncHandler(async (req, res, next) => {
  try {
    const pets = await Pet.find({}, "_id");
    res.json(pets.map((pet) => pet._id));
  } catch (error) {
    next(error);
  }
});

// Display Hero detail.
exports.pet_detail = asyncHandler(async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("hero"); // Busca o pet e popula o hero associado
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    next(error);
  }
});

exports.pet_create_post = asyncHandler(async (req, res, next) => {
  try {
      const { name, hero } = req.body;

      const pet = new Pet({ name, hero: hero || null });

      await pet.save();

      if (hero) {
        await Hero.findByIdAndUpdate(hero, { pet: pet._id });
      }

      res.status(201).json(pet);
    } catch (error) {
      next(error);
    }
});