const axios = require('axios');
const RedisClient = require('../utils/redis_client');
const config = require('./amazon_config');

const AMAZON_ACCESS_TOKEN_KEY = 'amazon_access_token';
const AMAZON_ACCESS_TOKEN_EXPIRES_IN_KEY = 'amazon_access_token_expires_in';

class AmazonSPAPIClient {
  static async getAccessToken() {
    const redisClient = new RedisClient();

    let accessToken, expirationTime;
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

    // get the value of useRedis from environment variables
    const useRedis = process.env.USE_REDIS === 'true';

    if (useRedis) {
      // check if the access token is already in Redis
      accessToken = await redisClient.redisGetValue(AMAZON_ACCESS_TOKEN_KEY);
      expirationTime = await redisClient.redisGetValue(
        AMAZON_ACCESS_TOKEN_EXPIRES_IN_KEY
      );

      // if accessToken exist and still valid return the cached values
      if (accessToken && expirationTime && currentTime < expirationTime) {
        console.log('Using Redis cached access token');
        return accessToken;
      }
    }

    const url = `${config.authenticationBaseUrl}/o2/token`;
    const params = new URLSearchParams();
    params.append('grant_type', config.grantType);
    params.append('refresh_token', config.refreshToken);
    params.append('client_id', config.clientId);
    params.append('client_secret', config.clientSecret);

    try {
      const response = await axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      accessToken = response.data.access_token;
      const expiresIn = response.data.expires_in; // expiration time in seconds
      expirationTime = currentTime + expiresIn; // calculate the expiration time

      console.log('New access token fetched');

      if (useRedis) {
        // store the new access token and expiration time in Redis
        await redisClient.redisSetValue(
          AMAZON_ACCESS_TOKEN_KEY,
          accessToken,
          expiresIn
        );
        await redisClient.redisSetValue(
          AMAZON_ACCESS_TOKEN_EXPIRES_IN_KEY,
          expirationTime,
          expiresIn
        );
        console.log('New access token cached in Redis');
      }

      return accessToken;
    } catch (error) {
      console.error(
        `Error fetching access token: ${error.response ? error.response.data : error.message}`
      );
      throw error;
    }
  }

  static async getMarketplaceParticipations(accessToken) {
    const url = `${config.spApiBaseUrl}/sellers/v1/marketplaceParticipations`;
    try {
      const response = await axios.get(url, {
        headers: {
          'x-amz-access-token': accessToken
        }
      });

      // Extract the payload from the response
      const { payload } = response.data;

      // Loop through each marketplaceParticipation
      payload.forEach(({ marketplace, participation }, index) => {
        console.log(`Marketplace ${index + 1}:`);
        console.log('Marketplace:', marketplace);
        console.log('Participation:', participation);
      });

      return response.data;
    } catch (error) {
      console.error(
        `Error fetching marketplace participations: ${error.response ? error.response.data : error.message}`
      );
      throw error;
    }
  }
}

module.exports = AmazonSPAPIClient;
