const {Router} = require('express');

const usersRouter = Router();

usersRouter.route('/')
.post(() => {})
.get(() => {console.log("get ok")});

usersRouter.route('/:id')
.patch(() => {})
.delete(() => {});

module.exports = usersRouter;