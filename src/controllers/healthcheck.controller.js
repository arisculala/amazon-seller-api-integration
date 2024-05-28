const mongoose = require('mongoose');
const { HttpStatusCode, HttpStatusName } = require('../utils/httpstatus');

/**
 * Returns the readiness state to accept incoming requests from the gateway or the upstream proxy
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function healthcheck(req, res) {
  res
    .status(HttpStatusCode.OK)
    .json({ status: HttpStatusName[HttpStatusCode.OK] });
}

/**
 * - Signals that the application is ready to handle incoming requests
 * - Used to determine if a service is prepared to serve traffic
 * - The readiness check verifies whether all the application's dependencies, services, or resources are available and properly initialized
 * - If the readiness check fails, the service is marked as not ready to serve traffic, but it doesn't necessarily mean the service is unhealthy
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function healthcheckReady(req, res) {
  try {
    const mongoDBStatus = await checkDatabase(); // Check MongoDB connectivity

    const dependencies = [
      { name: 'MongoDB', ready: mongoDBStatus === 'OK' }
      // Add more dependencies as needed
    ];

    const allDependenciesReady = dependencies.every((dep) => dep.ready);

    const result = {
      status: allDependenciesReady ? 'OK' : 'Service Unavailable',
      dependencies: dependencies.map((dep) => ({
        name: dep.name,
        status: dep.ready ? 'OK' : 'Service Unavailable',
        error: dep.ready ? '' : 'MongoDB connection is not established'
      }))
    };

    res
      .status(
        allDependenciesReady
          ? HttpStatusCode.OK
          : HttpStatusCode.ServiceUnavailable
      )
      .json(result);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).send(error);
  }
}

/**
 * - Checks if the application is still alive and functioning properly
 * - Used to determine if the application is responsive and handling requests
 * - The liveness check verifies if the application's internal state is healthy and if it's still capable of handling requests
 * - If the liveness check fails, it indicates that the service is not functioning correctly and might need to be restarted
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function healthcheckLive(req, res) {
  try {
    const mongoDBStatus = await checkDatabase(); // Check MongoDB connectivity

    const dependencies = [
      { name: 'MongoDB', ready: mongoDBStatus === 'OK' }
      // add more dependencies as needed
    ];

    const allDependenciesReady = dependencies.every((dep) => dep.ready);

    const result = {
      status: allDependenciesReady ? 'OK' : 'Service Unavailable',
      dependencies: dependencies.map((dep) => ({
        name: dep.name,
        status: dep.ready ? 'OK' : 'Service Unavailable',
        error: dep.ready ? '' : 'MongoDB connection is not established'
      }))
    };

    res
      .status(
        allDependenciesReady
          ? HttpStatusCode.OK
          : HttpStatusCode.ServiceUnavailable
      )
      .json(result);
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).send(error);
  }
}

/**
 * Check MongoDB database connectivity
 * @returns {Promise<string>} 'OK' if the connection is successful, otherwise 'Service Unavailable'
 */
async function checkDatabase() {
  try {
    await mongoose.connection.db.admin().ping();
    return 'OK';
  } catch (error) {
    return 'Service Unavailable';
  }
}

module.exports = {
  healthcheck,
  healthcheckReady,
  healthcheckLive
};
