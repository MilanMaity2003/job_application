const express = require('express');
const router = express.Router();
    
    const {createJob} = require('../controlers/JobCreation');
    const{auth, isStudent, isRecruiter, isAdmin} = require('../middlewares/Authorization');
    const{getAllJob} = require('../controlers/JobFetch');
    const{getRecruiterJob} = require('../controlers/JobCreatedByRecruiter');
    const {deleteJob} = require('../controlers/DeleteJob');
    const {updateJob} = require('../controlers/UpdateJob');
    const{getJob} = require('../controlers/GetJob');

    router.post('/createJob', auth, isRecruiter, createJob);
    router.get('/getJob',getAllJob);
    router.put('/updateJob/:id',auth, isRecruiter, updateJob);
    router.get('/getRecruiterJob',auth, isRecruiter, getRecruiterJob);
    router.delete('/deleteJob/:id', auth, isRecruiter, deleteJob);
    router.get('/getJob/:id', auth, isRecruiter, getJob);

    module.exports = router;