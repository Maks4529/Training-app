const {Router} = require('express');
const {paginate, upload} = require('./../middleware');
const {usersControllers} = require('./../controllers');

const usersRouter = Router();

usersRouter.route('/')
.post(upload.uploadUserPhoto, usersControllers.createUser)
.get(paginate.paginateUsers, usersControllers.getUsers);

usersRouter.route('/:id')
.get(usersControllers.getUserById)
.patch(usersControllers.updateUserById)
.delete(usersControllers.deleteUserById);

module.exports = usersRouter;