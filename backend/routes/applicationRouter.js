    const express = require('express');
    const router = express.Router();

    const {postApplication} = require('../controlers/Apply');
    const{auth, isStudent, isRecruiter, isAdmin} = require('../middlewares/Authorization');
    const{allApplication} = require('../controlers/AllApplication');
    const{appliedJob} = require('../controlers/ApplyJob');
    const{isApplied} = require('../controlers/isApplied');

    router.post('/apply/:id', auth, isStudent, postApplication);
    router.get('/allApplicatins/:id',auth, isRecruiter, allApplication);
    router.get('/appliedJob',auth, isStudent, appliedJob );
    router.get('/isApplied/:id', auth, isStudent, isApplied);

    module.exports = router;