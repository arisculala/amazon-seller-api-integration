const { HttpStatusCode } = require('../utils/httpstatus');
const ControllerErrorHandler = require('../utils/controller_error_handler');
const userService = require('../services/user.service');
const { UserErrorCode } = require('../resources/user.resource');
const StandardError = require('../utils/standard_error');

class UserController {
  static async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(HttpStatusCode.Created).send(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.send(users);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.send(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  static async updateUserById(req, res) {
    const updates = req.body;

    try {
      const user = await userService.updateUserById(req.params.id, updates);
      res.send(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  static async deleteUserById(req, res) {
    try {
      const user = await userService.deleteUserById(req.params.id);
      if (!user) {
        throw new StandardError({
          code: UserErrorCode.USER_NOT_FOUND_ERROR,
          message: `User with id ${id} not found.`,
          status: HttpStatusCode.NotFound
        });
      }
      res.send(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }
}

module.exports = UserController;
