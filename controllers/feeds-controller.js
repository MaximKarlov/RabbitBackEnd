const Feeds = require('../models/Feeds');


const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');
// const { query } = require('express');



// /////////////////////////////////////FEED////////////////////////////////////
const getAllFeeds = async (req, res) => {
  const { _id: owner } = req.user;
  const { ...query } = req.query;
  const resultList = await Feeds.find({ owner, ...query }, '-createdAt -updatedAt').populate('date','name');
  // console.log('resultBreed>>>>>>', resultList);
  res.json(resultList);
};

const addFeed = async (req, res) => {
  const { _id: owner } = req.user;
  const addFeedResult = await Feeds.create({ ...req.body, owner });
  res.status(201).json(addFeedResult);
  return res.status(201);
};

const getFeedById = async (req, res) => {
  const rabbitBreedId = req.params.breedId;
  const getRabbitResult = await Feeds.findById(rabbitBreedId);
  if (!getRabbitResult) {
    throw HttpError(404);
  }
  res.json(getRabbitResult);
};

const updateFeed = async (req, res) => {
  const rabbitBreedId = req.params.breedId;
  const updateRabbitResult = await Feeds.findByIdAndUpdate(rabbitBreedId, req.body, { new: true });
  if (!updateRabbitResult) {
    throw HttpError(404);
  } else res.json(updateRabbitResult);
};

const deleteFeed = async (req, res) => {
  const FeedId = req.params.feedId;
  const deleteResult = await Feeds.findByIdAndDelete(FeedId);
  if (deleteResult === null) {
    throw HttpError(404);
  } else res.status(200).json({ message: 'Feed deleted' });
};

module.exports = {
  getAllFeeds: ctrlWrapper(getAllFeeds),
  getFeedById: ctrlWrapper(getFeedById),
  addFeed: ctrlWrapper(addFeed),
  deleteFeed: ctrlWrapper(deleteFeed),
  updateFeed: ctrlWrapper(updateFeed),
};
