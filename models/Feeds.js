const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const FeedsSchema = new Schema(
  {
    date: {
      type: String,
      required: [true, 'Set date for bay feeds'],
    },

    name: {
      type: String,
      required: [true, 'Set name for bay feeds'],
    },

    price: {
      type: String,
      required: [true, 'Set price for bay feeds'],
    },

    quantity: {
      type: String,
      required: [true, 'Set quantity for bay feeds'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

FeedsSchema.post('save', handleMongooseError);

const Feeds = model('Feeds', FeedsSchema);

module.exports = Feeds;
