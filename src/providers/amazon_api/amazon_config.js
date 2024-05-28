const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  clientId: process.env.AMAZON_CLIENT_ID,
  clientSecret: process.env.AMAZON_CLIENT_SECRET,
  refreshToken: process.env.AMAZON_REFRESH_TOKEN,
  grantType: process.env.AMAZON_GRANT_TYPE,

  authenticationBaseUrl:
    process.env.AMAZON_AUTHENTICATION_BASE_URL || 'https://api.amazon.com/auth',

  spApiBaseUrl: process.env.AMAZON_SP_API_BASE_URL
};
