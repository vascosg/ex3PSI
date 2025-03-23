const Pet = require("../models/pet");
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