const User = require('../models/user.model');
const { UserErrorCode } = require('../resources/user.resource');
const DocumentTransformer = require('../utils/document_transformer');
const { HttpStatusCode } = require('../utils/httpstatus');
const StandardError = require('../utils/standard_error');

class UserService {
  static async createUser(newUserData) {
    const user = new User(newUserData);
    await user.save();
    return DocumentTransformer.transformDocumentToObject(user);
  }

  static async getAllUsers() {
    const users = await User.find();
    return users.map((user) =>
      DocumentTransformer.transformDocumentToObject(user)
    );
  }

  static async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new StandardError({
        code: UserErrorCode.USER_NOT_FOUND_ERROR,
        message: `User with id ${id} not found.`,
        status: HttpStatusCode.NotFound
      });
    }
    return DocumentTransformer.transformDocumentToObject(user);
  }

  static async updateUserById(id, updates) {
    // check allowable user field that can be updated
    const allowedUpdates = ['firstName', 'lastName', 'email'];
    const isValidOperation = Object.keys(updates).every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      throw new StandardError({
        code: UserErrorCode.USER_UPDATE_ERROR,
        message: `Invalid data updates for user with id ${id}.`,
        status: HttpStatusCode.NotFound
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) {
      throw new StandardError({
        code: UserErrorCode.USER_NOT_FOUND_ERROR,
        message: `User with id ${id} not found.`,
        status: HttpStatusCode.NotFound
      });
    }
    return DocumentTransformer.transformDocumentToObject(updatedUser);
  }

  static async deleteUserById(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new StandardError({
        code: UserErrorCode.USER_NOT_FOUND_ERROR,
        message: `User with id ${id} not found.`,
        status: HttpStatusCode.NotFound
      });
    }
    return DocumentTransformer.transformDocumentToObject(deletedUser);
  }
}

module.exports = UserService;
