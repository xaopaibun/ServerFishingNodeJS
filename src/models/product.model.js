const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const { toJSON, paginate } = require('./plugins');

const optionSchema = mongoose.Schema({
  value: {
    type: String,
  },
  price: {
    type: Number,
  },
  inventory: {
    type: Boolean,
  },
});

const variantSchema = mongoose.Schema({
  name: {
    type: String,
  },
  option: [optionSchema],
});

const productSchema = mongoose.Schema(
  {
    category_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    slug: {
      type: String,
      slug: ['name'],
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    width: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    variant: [variantSchema],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
productSchema.plugin(slug);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
