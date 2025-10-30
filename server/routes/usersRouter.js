const {Router} = require('express');
const checkToken = require('./../middleware/checkToken');
const {paginate, upload} = require('./../middleware');
const {usersControllers} = require('./../controllers');

const usersRouter = Router();

usersRouter.route('/')
.post(upload.uploadUserPhoto, usersControllers.createUser)
.get(paginate.paginateUsers, usersControllers.getUsers);

usersRouter.post('/login', usersControllers.userLogin);

usersRouter.get('/profile', checkToken, usersControllers.getProfile);

usersRouter.route('/:id')
.get(checkToken, usersControllers.getUserById)
.patch(checkToken, usersControllers.updateUserById)
.delete(checkToken, usersControllers.deleteUserById);

usersRouter.route('/user-trainings')
.post(checkToken, usersControllers.addTrainingToUser)

module.exports = usersRouter;