const express = require("express");
const router = express.Router();

const hero_controller = require("../controllers/heroController");
const pet_controller = require("../controllers/petController");
const init_controller = require("../controllers/initController");
const heroes_controller = require("../controllers/heroesController");

router.get("/init", init_controller.init_get );

router.get("/heroes", heroes_controller.heroes_list);

router.get("/hero/:id", hero_controller.hero_detail);

router.delete("/hero/:id", hero_controller.hero_delete);

router.get("/pets", pet_controller.pet_ids);

router.get("/pet/:id", pet_controller.pet_detail);

router.post("/hero", hero_controller.hero_create_post);

module.exports = router;