const Hero = require("../models/hero");
const Pet = require("../models/pet");
const asyncHandler = require("express-async-handler");

// Init database.
exports.init_get = asyncHandler(async (req, res, next) => {
  try {
    /*
    const heroCount = await Hero.countDocuments();
    const petCount = await Pet.countDocuments();

    if (heroCount > 0 || petCount > 0) {
      return res.send("Database already initialized with heroes and pets.");
    }
    */

    await Hero.deleteMany({});
    await Pet.deleteMany({});

    console.log("Todas as coleções foram apagadas.");

    const pet1 = await Pet.create({ name: "Krypto", hero: null });
    const pet2 = await Pet.create({ name: "Ace", hero: null });

    const hero1 = await Hero.create({ name: "Superman", pet: pet1._id });
    const hero2 = await Hero.create({ name: "Batman", pet: pet2._id });

    await Pet.findByIdAndUpdate(pet1._id, { hero: hero1._id });
    await Pet.findByIdAndUpdate(pet2._id, { hero: hero2._id });

    res.send("Database initialized with sample heroes and pets.");
  } catch (error) {
    next(error);
  }
});