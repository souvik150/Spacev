const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "A tour name must have less than 40 characters"],
    minlength: [10, "A tour name must have more than 10 characters"],
  },
  rating: {
    type: Number,
    default: 4.5,
    max: [5, "A tour rating must be less than 5"],
    min: [1, "A tour rating must be more than 1"],
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
