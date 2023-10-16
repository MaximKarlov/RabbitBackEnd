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
      required: [true, 'Set about for rabbit breed'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

RabbitsBreedSchema.post('save', handleMongooseError);

const RabbitsBreed = model('RabbitBreed', RabbitsBreedSchema);

module.exports = RabbitsBreed;
