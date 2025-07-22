const {Router} = require('express');

const traningsRouter = Router();

traningsRouter.route('/')
.post(() => {})
.get(() => {console.log("get training ok")});

traningsRouter.route('/:id')
.patch(() => {})
.delete(() => {});

module.exports = traningsRouter;