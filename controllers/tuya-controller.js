// const Rabbit = require('../models/Rabbit');

// const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');


// const { query } = require('express');

// const getAllRabbits = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { ...query } = req.query;
//   const resultList = await Rabbit.find({ owner, ...query }, '-createdAt -updatedAt').populate('name', 'breed');
//   res.json(resultList);
// };

// const getRabbitById = async (req, res) => {
//   const rabbitId = req.params.rabbitId;
//   const getRabbitResult = await Rabbit.findById(rabbitId);
//   if (!getRabbitResult) {
//     throw HttpError(404);
//   }
//   res.json(getRabbitResult);
// };

// const addRabbit = async (req, res) => {
//   const { _id: owner } = req.user;
//   const addRabbitResult = await Rabbit.create({ ...req.body, owner });
//   res.status(201).json(addRabbitResult);
// };

// const updateRabbit = async (req, res) => {
//   const rabbitId = req.params.rabbitId;
//   const updateRabbitResult = await Rabbit.findByIdAndUpdate(rabbitId, req.body, { new: true });
//   if (!updateRabbitResult) {
//     throw HttpError(404);
//   } else res.json(updateRabbitResult);
// };

// const updateRabbitFavorite = async (req, res) => {
//   const rabbitId = req.params.rabbitId;
//   const updateRabbitResult = await Rabbit.findByIdAndUpdate(rabbitId, req.body, { new: true });
//   if (!updateRabbitResult) {
//     throw HttpError(404);
//   } else res.json(updateRabbitResult);
// };

// const deleteRabbit = async (req, res) => {
//   const RabbitId = req.params.rabbitId;
//   const deleteRabbitResult = await Rabbit.findByIdAndDelete(RabbitId);
//   if (deleteRabbitResult === null) {
//     throw HttpError(404);
//   } else res.status(200).json({ message: 'Rabbit deleted' });
// };


// module.exports = {
//   getAllRabbits: ctrlWrapper(getAllRabbits),
//   getRabbitById: ctrlWrapper(getRabbitById),
//   addRabbit: ctrlWrapper(addRabbit),
//   deleteRabbit: ctrlWrapper(deleteRabbit),
//   updateRabbit: ctrlWrapper(updateRabbit),
//   updateRabbitFavorite: ctrlWrapper(updateRabbitFavorite),
// };


// import { createAsyncThunk } from '@reduxjs/toolkit';
const { generateTokenAuth, generateAuth } = require('./generateToken.js');
const axios =  require ('axios');


const TuyaConfig = {
  clientId: [],
  secret: [],
  baseUrl: [],
  accessToken: [],
  refreshToken:[],
};
// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/**
 * Example 1: Get Access Token (Simple Mode)
 * This is equivalent to the Postman request for getting an access token
 */
// const getAllRabbits = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { ...query } = req.query;
//   const resultList = await Rabbit.find({ owner, ...query }, '-createdAt -updatedAt').populate('name', 'breed');
//   res.json(resultList);
// };

// const getToken = async (req, res) => {
//   try {
//     const { clientId, secret, baseUrl } = req.query;
//     axios.defaults.baseURL = `${baseUrl}`
//     // приклад виклику Tuya API
//     const response = await axios.post(
//       `${baseUrl}/v1.0/token?grant_type=1`,
//       {},
//       {
//         headers: {
//           client_id: clientId,
//           secret: secret,
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (err) {
//     console.error('Error in getToken:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// };



const getToken = async (req, res) => {
  // дані приходять у query string
  const { clientId, secret, baseUrl } = req.query;

  TuyaConfig.clientId = clientId
  TuyaConfig.secret = secret
  TuyaConfig.baseUrl= baseUrl


  try {
    const auth = generateTokenAuth(TuyaConfig);

    const response = await axios.get(auth.url, {
      headers: auth.headers,
    });

    if (response.data.success) {
      TuyaConfig.accessToken = response.data.result.access_token;
      TuyaConfig.refreshToken = response.data.result.refresh_token;
      res.json({
        accessToken: TuyaConfig.accessToken,
        refreshToken: TuyaConfig.refreshToken,
      });

    } else {
      res.status(400).json({ error: response.data });
    }
    authenticatedRequest(TuyaConfig);
    return TuyaConfig
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};


/**
 * Example 2: Make Authenticated API Request
 * Use this after obtaining an access token
 */
const authenticatedRequest= async (req, res) => {
  const config2 = {
    clientId: TuyaConfig.clientId,
    secret: TuyaConfig.secret,
    accessToken: TuyaConfig.accessToken, // From previous token request

    method: 'GET',
    path: `${TuyaConfig.baseUrl}/v1.0/devices/list`,
    query: {},
  };

  const auth = generateAuth(config2);

  try {
    const response = await axios.get(`${auth.url}`, {
      headers: auth.headers,
    });

    console.log('Devices:', response);
    return response;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

/**
 * Example 3: POST Request with JSON Body
 */
// export async function PostRequest(token, url, deviceId, commandOnOff) {
//   const requestBody = {
//     commands: [
//       {
//         code: 'switch',
//         value: commandOnOff,
//       },
//     ],
//   };

//   const config = {
//     clientId: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     accessToken: token.accessToken,
//     method: 'POST',
//     path: `${url}${deviceId}/commands`,
//     body: requestBody,
//     contentType: 'json',
//   };

//   const auth = generateAuth(config);
//   const fullUrl = `https://openapi.tuyaeu.com${auth.url}`;

//   try {
//     const response = await axios.post(fullUrl, requestBody, {
//       headers: {
//         ...auth.headers,
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log('Command Response:', response.data);
//   } catch (error) {
//     console.error('Error:', error.response?.data || error.message);
//   }
// }

/**
 * Example 4: Using with native fetch API
 */
// async function WithFetch() {
//   const config = {
//     clientId: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     baseUrl: 'https://openapi.tuyaeu.com',
//   };

//   const auth = generateTokenAuth(config);

//   try {
//     const response = await fetch(auth.url, {
//       method: 'GET',
//       headers: auth.headers,
//     });

//     const data = await response.json();
//     console.log('Response:', data);
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

/**
 * Example 5: Complete workflow - Get token and make request
 */
// export async function CompleteWorkflow() {
//   const config = {
//     clientId: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     baseUrl: 'https://openapi.tuyaeu.com',
//   };

//   // Step 1: Get access token
//   console.log('Step 1: Getting access token...');
//   const tokenAuth = generateTokenAuth(config);

//   try {
//     const tokenResponse = await axios.get(tokenAuth.url, {
//       headers: tokenAuth.headers,
//     });

//     if (!tokenResponse.data.success) {
//       throw new Error('Failed to get token: ' + tokenResponse.data.msg);
//     }

//     const accessToken = tokenResponse.data.result.access_token;
//     console.log('✓ Access token obtained');

//     // Step 2: Use access token to make authenticated request
//     console.log('Step 2: Making authenticated request...');
//     const apiAuth = generateAuth({
//       clientId: config.clientId,
//       secret: config.secret,
//       accessToken: accessToken,
//       method: 'GET',
//       path: '/v1.0/Predator007/devices',
//       query: {},
//     });

//     const apiResponse = await axios.get(`${config.baseUrl}${apiAuth.url}`, {
//       headers: apiAuth.headers,
//     });

//     console.log('✓ API Response:', apiResponse.data);
//   } catch (error) {
//     console.error('✗ Error:', error.response?.data || error.message);
//   }
// }

module.exports = {
  // //   getToken,
  getToken: ctrlWrapper(getToken),
  authenticatedRequest: ctrlWrapper(authenticatedRequest),
  //   //   addRabbit: ctrlWrapper(addRabbit),
  //   //   deleteRabbit: ctrlWrapper(deleteRabbit),
  //   //   updateRabbit: ctrlWrapper(updateRabbit),
  //   //   updateRabbitFavorite: ctrlWrapper(updateRabbitFavorite),
};