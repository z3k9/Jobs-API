const Job = require('../../models/job.mongo');


async function getAllJobs(req,res){
    const jobs = await Job.find({createdBy: req.user._id}).sort('createdAt');
    res.status(200).json({jobs, count:jobs.length});
}

async function getAJob(req,res){
    const {
        user: {_id}, 
        params:{id:jobId}
    } = req;
    const job = await Job.findOne({
        _id: jobId, createdBy: _id
    });
    if(!job){
        res.status(404).json({msg: 'This job does not exist'});
    }
    res.status(200).json({job});
}

async function createAJob(req,res){
    req.body.createdBy = req.user._id;
    const job = await Job.create(req.body);
    
    res.status(200).json({job});
}

async function updateAJob(req,res){
    const {
        body: {company, position},
        user: {_id},
        params: {id: jobId}
    } = req;
    if(company === "" || position === ""){
        return res.status(401).json({msg: 'Company or position fields cannot be empty'});
    }
    const job = await Job.findByIdAndUpdate({_id:jobId, createdBy: _id}, req.body, {new:true, runValidators:true});
    if(!job){
        return res.status(404).json({msg: `No job with id ${jobId}`});
    }
    res.status(201).json({job});
    console.log(req);
}

async function deleteAJob(req,res){
    const { user: {_id}, params:{id:jobId}} = req;
    const job = await Job.findOneAndRemove({_id: jobId, createdBy: _id});
    if(!job){
        return res.status(404).json({msg: 'Job does not exist'});
    }
    res.status(201).json({msg: 'Job deleted successfully'});
}

module.exports = { getAllJobs, getAJob, createAJob, updateAJob, deleteAJob }