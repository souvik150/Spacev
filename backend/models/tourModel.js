const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
      maxlength: [40, 'Name must be less than 40 characters'],
      minlength: [10, 'Name must be at least 10 characters'],
      // validate: [validator.isAlpha, 'Name must contain only characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Group size is required'],
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Image is required'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Document middleware: runs before .save() and .create()

// this is going to point to the tour document which we are making/saving

/*
We can have middleware running before and after a certain event. And in the case of document middleware,
that event is usually the save event. And then in the middleware function itself, we have access to the this keyword, which is gonna point at the currently being saved document. And it's also very important to keep in mind that this save middleware only runs for the save and create Mongoose methods.

It's not gonna run, for example, for insert many and also not for find one and update or find by ID and update, which we already used before

*/

// Pre-save hook: runs before .save()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//

// tourSchema.post('create', function (next) {
//   console.log(doc);
//   next();
// });

// Query middleware: runs before .find() and .findOne()

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(docs);
  console.log(`Query took ${Date.now() - this.start} milliseconds`);

  next();
});

// For find by id
tourSchema.pre(/^findOne/, function (next) {
  this.findOne({ secretTour: { $ne: true } });
  next();
});

// Aggregation middleware: runs before .aggregate()

tourSchema.pre('aggregate', function (next) {
  // Unshift will add an array to the start of the array, so in this we add the $match stage to the beginning of the array
  // console.log(this.pipeline());

  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
