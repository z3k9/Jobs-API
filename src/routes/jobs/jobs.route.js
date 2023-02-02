const express = require('express');
const jobsRouter = express.Router();
const { getAllJobs, getAJob, createAJob, updateAJob, deleteAJob } = require('./jobs.controller');

jobsRouter.route('/').post(createAJob).get(getAllJobs);
jobsRouter.route('/:id').get(getAJob).patch(updateAJob).delete(deleteAJob);

module.exports = jobsRouter;