module.exports = app => {
  const artworks = require("./artwork.controller.js");

  // Create a new Product
  app.post("/artworks", artworks.create);

  // Retrieve all Products
  app.get("/artworks", artworks.findAll);

  // Retrieve a single Product with productId
  app.get("/artworks/:artworkId", artworks.findOne);

  // Update a Note with productId
  app.put("/artworks/:artworkId", artworks.update);

  // Delete a Note with productId
  app.delete("/artworks/:artworkId", artworks.delete);
};
