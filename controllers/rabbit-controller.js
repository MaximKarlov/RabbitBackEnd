const Rabbit = require('../models/Rabbit');
const RabbitsBreed = require('../models/RabbitBreed');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');
// const { query } = require('express');

const getAllRabbits = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;
  const resultList = await Rabbit.find({ owner, ...query }, '-createdAt -updatedAt', { skip, limit }).populate(
    'name',
    'breed'
  );
  res.json(resultList);
};

const getAllRabbitsBreed = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;
  const resultList = await RabbitsBreed.find({ owner, ...query }, '-createdAt -updatedAt', { skip, limit }).populate(
    'name',
    'color'
  );
  console.log('resultBreed>>>>>>', resultList);
  res.json(resultList);
};

const getRabbitById = async (req, res) => {
  const contactId = req.params.contactId;
  const getContactResult = await Rabbit.findById(contactId);
  if (!getContactResult) {
    throw HttpError(404);
  }
  res.json(getContactResult);
};

const addRabbit = async (req, res) => {
  const { _id: owner } = req.user;
  const addRabbitResult = await Rabbit.create({ ...req.body, owner });
  res.status(201).json(addRabbitResult);
};

const addRabbitBreed = async (req, res) => {
  const { _id: owner } = req.user;
  const addRabbitResult = await RabbitsBreed.create({ ...req.body, owner });
  res.status(201).json(addRabbitResult);
};

const updateRabbit = async (req, res) => {
  const contactId = req.params.contactId;
  const updateContactResult = await Rabbit.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updateContactResult) {
    throw HttpError(404);
  } else res.json(updateContactResult);
};

const updateRabbitFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const updateContactResult = await Rabbit.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updateContactResult) {
    throw HttpError(404);
  } else res.json(updateContactResult);
};

const deleteRabbit = async (req, res) => {
  const contactId = req.params.contactId;
  const deleteContactResult = await Rabbit.findByIdAndDelete(contactId);
  if (deleteContactResult === null) {
    throw HttpError(404);
  } else res.status(200).json({ message: 'contact deleted' });
};
module.exports = {
  getAllRabbits: ctrlWrapper(getAllRabbits),
  getAllRabbitsBreed: ctrlWrapper(getAllRabbitsBreed),
  getRabbitById: ctrlWrapper(getRabbitById),
  addRabbit: ctrlWrapper(addRabbit),
  addRabbitBreed: ctrlWrapper(addRabbitBreed),
  deleteRabbit: ctrlWrapper(deleteRabbit),
  updateRabbit: ctrlWrapper(updateRabbit),
  updateRabbitFavorite: ctrlWrapper(updateRabbitFavorite),
};
