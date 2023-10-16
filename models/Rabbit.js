const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

const RabbitSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for rabbit'],
    },

    gender: {
      type: String,
      required: [true, 'Set gender for rabbit'],
    },

    breed: {
      type: String,
      required: [true, 'Set breed for rabbit'],
    },

    dateBirthDay: {
      type: Date,
      required: [true, 'Set date of BirthDay for rabbit'],
      default: '00/00/2023',
    },
    Mother: {
      type: String,
      required: [false, 'Set Mother for rabbit'],
      default: 'unknown',
    },
    Father: {
      type: Object,
      required: [false, 'Set Father for rabbit'],
      default: 'unknown',
    },

    Vakcine: {
      type: Array,
    },

    weight: {
      type: Array,
    },

    cage: {
      type: Array,
      required: [false, 'Set cage for rabbit'],
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    photoRabbit: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

RabbitSchema.post('save', handleMongooseError);

const Rabbit = model('Rabbit', RabbitSchema);

module.exports = Rabbit;
