const Job = require('../../models/job.mongo');

async function getAllJobs(req,res){
    res.send('All Jobs');
}

async function getAJob(req,res){
    res.send('A job');
}

async function createAJob(req,res){
    req.body.createdBy = req.user._id;
    const job = await Job.create(req.body);
    
    res.status(200).json(job);
}

async function updateAJob(req,res){
    res.send('Job updated');
}

async function deleteAJob(req,res){
    res.send('Job deleted');
}

module.exports = { getAllJobs, getAJob, createAJob, updateAJob, deleteAJob }