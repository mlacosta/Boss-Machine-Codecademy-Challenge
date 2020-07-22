const meetingRouter = require('express').Router();
const db  = require('./db'); 

meetingRouter.get('/',(req,res)=>{
    res.send(db.getAllFromDatabase('meetings'));
})

meetingRouter.post('/',(req,res)=>{
    let newMeeting = db.addToDatabase('meetings', db.createMeeting());
    res.status(201).send(newMeeting);
})

meetingRouter.delete('/', (req, res) => {
    db.deleteAllFromDatabase('meetings');
    res.status(204).send();
  });

module.exports =  meetingRouter;