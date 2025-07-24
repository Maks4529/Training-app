const {Router} = require('express');
const {paginate} = require('./../middleware');
const {usersControllers} = require('./../controllers');

const usersRouter = Router();

usersRouter.route('/')
.post(usersControllers.createUser)
.get(paginate.paginateUsers, usersControllers.getUsers);

usersRouter.route('/:id')
.get(usersControllers.getUserById)
.patch(usersControllers.updateUserById)
.delete(usersControllers.deleteUserById);

module.exports = usersRouter;