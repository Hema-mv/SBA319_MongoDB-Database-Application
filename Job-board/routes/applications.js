//const express = require('express');
import express from 'express';
const router = express.Router();
//const applications=require("../data/applications")
import applications from './applications.js';
//let applications = [];

router.get('/', (req, res) => {
    res.render('applications', { applications });
});

router.post('/', (req, res) => {
    const { jobTitle, applicantName } = req.body;
    applications.push({ jobTitle, applicantName });
    res.redirect('/applications');
});

//module.exports = router;
export default router;