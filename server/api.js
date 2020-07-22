const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');
const { deleteFromDatabasebyId } = require('./db');
const minionsRouter = require('./minions.js');
const ideasRouter = require('./ideas.js');

//nested routers

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
