const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema ({
    name: { type: String, required: true, maxLength: 20 , minLength: 3 },
    hero: { type: Schema.Types.ObjectId, ref: "Hero", required: false}
});

PetSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/infos/pet/${this._id}`;
});

// Export model
module.exports = mongoose.model("Pet", PetSchema);