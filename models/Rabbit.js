const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const RabbitSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for rabbit'],
    },
    breed: {
      type: String,
      required: [true, 'Set breed for rabbit'],
    },
    photoRabbit: {
      type: String,
      required: [true, 'Set phone for rabbit'],
    },
    Vakcine: {
      type: String,
      required: [false, 'Set date vakcine for rabbit'],
    },
    weight: {
      type: Number,
      required: [false, 'Set weight for rabbit'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    Mother: {
      type: String,
    },
    Father: {
      type: Object,
    },
    dateBirthDay: {
      type: Date,
    },
  },
  { versionKey: false, timestamps: true }
);

RabbitSchema.post('save', handleMongooseError);

const Rabbit = model('Rabbit', RabbitSchema);

module.exports = Rabbit;
