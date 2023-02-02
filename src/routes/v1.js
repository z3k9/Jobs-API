const express = require('express');
const authRouter = require('./auth/auth.route');
const jobsRouter = require('./jobs/jobs.route');
const api = express.Router();
const authenticationMiddleware = require('../services/authentication');

api.use('/auth', authRouter);
api.use('/jobs', authenticationMiddleware, jobsRouter);

module.exports = api;
