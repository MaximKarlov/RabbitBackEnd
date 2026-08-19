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
  const feedsId = req.params.feedsId;
  const getfeedsResult = await Feeds.findById(feedsId);
  if (!getfeedsResult) {
    throw HttpError(404);
  }
  res.json(getfeedsResult);
};

const updateFeed = async (req, res) => {
  console.log(req.params.feedsId);
  const feedsId = req.params.feedsId;
  console.log(feedsId);
  const updateFeedsResult = await Feeds.findByIdAndUpdate(feedsId, req.body, { new: true });
  if (!updateFeedsResult) {
    throw HttpError(404);
  } else res.json(updateFeedsResult);
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
