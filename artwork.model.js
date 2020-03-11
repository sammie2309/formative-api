const mongoose = require("mongoose");

const ArtworkSchema = mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    author: String,
    url: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Artworks", ArtworkSchema);
