const Rabbit = require('../models/Rabbit');
const RabbitsBreed = require('../models/RabbitBreed');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');
// const { query } = require('express');

const getAllRabbits = async (req, res) => {
  const { _id: owner } = req.user;
  const { ...query } = req.query;
  const resultList = await Rabbit.find({ owner, ...query }, '-createdAt -updatedAt').populate('name', 'breed');
  res.json(resultList);
};

const getRabbitById = async (req, res) => {
  const rabbitId = req.params.rabbitId;
  const getRabbitResult = await Rabbit.findById(rabbitId);
  if (!getRabbitResult) {
    throw HttpError(404);
  }
  res.json(getRabbitResult);
};

const addRabbit = async (req, res) => {
  const { _id: owner } = req.user;
  const addRabbitResult = await Rabbit.create({ ...req.body, owner });
  res.status(201).json(addRabbitResult);
};

const updateRabbit = async (req, res) => {
  const rabbitId = req.params.rabbitId;
  const updateRabbitResult = await Rabbit.findByIdAndUpdate(rabbitId, req.body, { new: true });
  if (!updateRabbitResult) {
    throw HttpError(404);
  } else res.json(updateRabbitResult);
};

const updateRabbitFavorite = async (req, res) => {
  const rabbitId = req.params.rabbitId;
  const updateRabbitResult = await Rabbit.findByIdAndUpdate(rabbitId, req.body, { new: true });
  if (!updateRabbitResult) {
    throw HttpError(404);
  } else res.json(updateRabbitResult);
};

const deleteRabbit = async (req, res) => {
  const RabbitId = req.params.rabbitId;
  const deleteRabbitResult = await Rabbit.findByIdAndDelete(RabbitId);
  if (deleteRabbitResult === null) {
    throw HttpError(404);
  } else res.status(200).json({ message: 'Rabbit deleted' });
};

// /////////////////////////////////////BREED////////////////////////////////////
const getAllRabbitsBreed = async (req, res) => {
  const { _id: owner } = req.user;
  const { ...query } = req.query;
  const resultList = await RabbitsBreed.find({ owner, ...query }, '-createdAt -updatedAt').populate('name', 'color');
  // console.log('resultBreed>>>>>>', resultList);
  res.json(resultList);
};

const addRabbitBreed = async (req, res) => {
  const { _id: owner } = req.user;
  const addRabbitResult = await RabbitsBreed.create({ ...req.body, owner });
  res.status(201).json(addRabbitResult);
  return res.status(201);
};

const getRabbitBreedById = async (req, res) => {
  const rabbitBreedId = req.params.breedId;
  const getRabbitResult = await RabbitsBreed.findById(rabbitBreedId);
  if (!getRabbitResult) {
    throw HttpError(404);
  }
  res.json(getRabbitResult);
};

const updateRabbitBreed = async (req, res) => {
  const rabbitBreedId = req.params.breedId;
  const updateRabbitResult = await RabbitsBreed.findByIdAndUpdate(rabbitBreedId, req.body, { new: true });
  if (!updateRabbitResult) {
    throw HttpError(404);
  } else res.json(updateRabbitResult);
};

const deleteRabbitBreed = async (req, res) => {
  const BreedId = req.params.breedId;
  const deleteResult = await RabbitsBreed.findByIdAndDelete(BreedId);
  if (deleteResult === null) {
    throw HttpError(404);
  } else res.status(200).json({ message: 'Breed deleted' });
};

module.exports = {
  getAllRabbits: ctrlWrapper(getAllRabbits),
  getAllRabbitsBreed: ctrlWrapper(getAllRabbitsBreed),
  getRabbitById: ctrlWrapper(getRabbitById),
  getRabbitBreedById: ctrlWrapper(getRabbitBreedById),
  addRabbit: ctrlWrapper(addRabbit),
  addRabbitBreed: ctrlWrapper(addRabbitBreed),
  deleteRabbit: ctrlWrapper(deleteRabbit),
  deleteRabbitBreed: ctrlWrapper(deleteRabbitBreed),
  updateRabbit: ctrlWrapper(updateRabbit),
  updateRabbitBreed: ctrlWrapper(updateRabbitBreed),
  updateRabbitFavorite: ctrlWrapper(updateRabbitFavorite),
};
