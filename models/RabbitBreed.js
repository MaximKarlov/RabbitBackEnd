const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const RabbitsBreedSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for rabbit breed'],
    },

    color: {
      type: String,
      required: [true, 'Set color for rabbit breed'],
    },

    about: {
      type: String,
      required: [false, 'Set about for rabbit breed'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false }
);

RabbitsBreedSchema.post('save', handleMongooseError);

const RabbitsBreed = model('breeds', RabbitsBreedSchema);

module.exports = RabbitsBreed;
