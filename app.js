const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const Logger = require('./src/utils/logger');

const userRoutes = require('./src/routes/user.route');
const healthcheckRoutes = require('./src/routes/healthcheck.route');
const adsReportRoutes = require('./src/routes/ads_report.route');

const app = express();

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

// connect to MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    Logger.info(`Successfully connected to MongoDB`);
  })
  .catch((err) => Logger.error(`Error connecting to MongoDB`, err));

// middleware
app.use(bodyParser.json());

// enable CORS for all routes
app.use(cors());

// create a Router instance for all API routes
const apiRouter = express.Router();
app.use('/api', apiRouter); // prefix all API routes with /api

// mounts routes on the apiRouter
apiRouter.use('/users', userRoutes);
apiRouter.use('/healthcheck', healthcheckRoutes);
apiRouter.use('/ads-reports', adsReportRoutes);

app.listen(PORT, () => {
  Logger.info(
    `🚀 [${ENVIRONMENT}] 2seelife App listening on port ${PORT} 🚀`
  );
});
