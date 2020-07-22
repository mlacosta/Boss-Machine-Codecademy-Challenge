const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');
const { deleteFromDatabasebyId } = require('./db');

//middleware functions

const setName = name =>{

    return (req,res,next) =>{
        req.name = name;
        next();
    }

}

const getAllItem = (req,res)=>{
    const allItems =  db.getAllFromDatabase(req.name);

    if (allItems !== null){
        res.send(allItems);
    }else{
        res.sendStatus(404); 
    }
}

const postItem = (req,res) =>{
    const item = req.body();
    const lastId =  db.getAllFromDatabase(req.name).slice(-1).pop()['id'];

    const newItem = db.addToDatabase(req.name,item);

    if(allItems !== null){
        res.send(newItem);
    }else{
        throw new Error('Invalid request');
    }
} 

const getItem = (req,res)=>{

    const item =  db.getFromDatabaseById(req.name,req.body.id);

    if (item !== -1){
        res.send(item);
    }else{
        throw new Error('Invalid request');
    }

}

const putItem = (req,res,next)=>{

    const item =  db.updateInstanceInDatabase(req.name,req.body.id);

    if (item !== null){
        res.send(item);
    }else{
        throw new Error('Invalid request');
    }

}

const deleteItem = (req,res)=>{
    const isDeleted =  db.deleteFromDatabasebyId(req.name,req.body.id);

    if (item !== null){
        res.send(item);
    }else{
        res.sendStatus(404);
    }
}


// Minion Router
const minionsRouter = express.Router({mergeParams: true});

minionsRouter.get('/', setName('minions'));
minionsRouter.get('/', getAllItem);

minionsRouter.post('/', setName('minions'));
minionsRouter.post('/', postItem);

minionsRouter.get('/:minionId', setName('minions'));
minionsRouter.post('/', getItem);

minionsRouter.put('/:minionId',setName('minions'));
minionsRouter.put('/:minionId',putItem);

minionsRouter.delete('/:minionId',setName('minions'));
minionsRouter.delete('/:minionId',deleteItem);

// Ideas Router
const ideasRouter = express.Router({mergeParams: true});

ideasRouter.get('/', setName('ideas'));
ideasRouter.get('/', getAllItem);

ideasRouter.post('/', setName('ideas'));
ideasRouter.post('/', postItem);

ideasRouter.get('/:ideaId', setName('ideas'));
ideasRouter.post('/', getItem);

ideasRouter.put('/:ideaId',setName('ideas'));
ideasRouter.put('/:ideaId',putItem);

ideasRouter.delete('/:ideaId',setName('ideas'));
ideasRouter.delete('/:ideaId',deleteItem);

// Meetings Router
const meetingsRouter = express.Router({mergeParams: true});

ideasRouter.get('/', setName('meetings'));
ideasRouter.get('/', getAllItem);

ideasRouter.post('/',(req,res)=>{

    db.createMeeting();
});

ideasRouter.delete('/',(req,res)=>{
    db.deleteAllFromDatabase('meetings');
});

//nested routers

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;
