const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HeroSchema = new Schema ({
    name: { type: String, required: true, maxLength: 20 , minLength: 3 },
    pet: { type: Schema.Types.ObjectId, ref: "Pet", required: false}
});

HeroSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/infos/hero/${this._id}`;
});

// Export model
module.exports = mongoose.model("Hero", HeroSchema);