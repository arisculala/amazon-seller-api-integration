const express = require('express');
const router = express.Router();
const {
  validateRequest,
  validateResponse
} = require('../middlewares/validator.middleware');
const userController = require('../controllers/user.controller');
const { createUserSchema, userSchema } = require('../resources/user.resource');

router.post(
  '/',
  validateRequest({ bodySchema: createUserSchema }),
  userController.createUser
);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.patch('/:id', userController.updateUserById);

router.delete('/:id', userController.deleteUserById);

module.exports = router;
