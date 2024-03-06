const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'A tour must have a name '],
    minlenght: [4, 'cake must have a name grater the 4 character'],
  },
  summary: {
    type: String,
    required: [true, 'The tour must have a summery'],
  },
  description: {
    type: String,
    required: [true, 'The tour must have a description'],
  },
  coverImage: {
    type: String,
    required: [true, 'Tour must have a cover image'],
  },
  ortherImages: [String],
  category: [String],
  ratingQuantity: {
    type: Number,
    default: 4.0,
  },
  ratingAvarage: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceType: {
    type: String,
    default: 'person',
  },
  duration: {
    type: Number,
    required: [true, 'A tour must a fixed duration'],
  },
  maxGroupSize: {
    type: Number,
  },
  includeInPrice: [String],
  notIncludeInPrice: [String],
  slug: {
    type: String,
    unique: true,
  },
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.title);
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
