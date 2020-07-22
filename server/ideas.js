const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js')
const db  = require('./db'); 



ideasRouter.param('ideaId', (req, res, next, id) => {
  const ideas = db.getFromDatabaseById('ideas', id);
  if (ideas) {
    req.ideas = ideas;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('ideas'));
});

ideasRouter.post('/',checkMillionDollarIdea ,(req, res, next) => {
  const newIdeas = db.addToDatabase('ideas', req.body);
  res.status(201).send(newIdeas);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.ideas);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
  let updatedIdeaInstance = db.updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdeaInstance);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deleted = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = ideasRouter;

