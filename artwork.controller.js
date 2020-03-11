const Artwork = require("./artwork.model.js");

//Create new Product
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Artwork content can not be empty"
    });
  }

  // Create a Product
  const artwork = new Artwork({
    name: req.body.name || "No product title",
    imageUrl: req.body.imageUrl,
    author: req.body.author,
    url: req.body.url
  });

  // Save Product in the database
  artwork
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the product."
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  Artwork.find()
    .then(artworks => {
      res.send(artworks);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving products."
      });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
  Artwork.findById(req.params.artworkId)
    .then(artwork => {
      if (!artwork) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.artworkId
        });
      }
      res.send(artwork);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.artworkId
        });
      }
      return res.status(500).send({
        message:
          "Something wrong retrieving product with id " + req.params.artworkId
      });
    });
};

// Update a product
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Product content can not be empty"
    });
  }

  // Find and update product with the request body
  Artwork.findByIdAndUpdate(
    req.params.artworkId,
    {
      name: req.body.name || "No product title",
      imageUrl: req.body.imageUrl,
      author: req.body.author,
      url: req.body.url
    },
    { new: true }
  )
    .then(artwork => {
      if (!artwork) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.artworkId
        });
      }
      res.send(artwork);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.artworkId
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.artworkId
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Artwork.findByIdAndRemove(req.params.artworkId)
    .then(artwork => {
      if (!artwork) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.artworkId
        });
      }
      res.send({ message: "Product deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.artworkId
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.artworkId
      });
    });
};
