function notFound(req,res){
    res.status(404).send('The page you\'re looking for does not exist');
}

module.exports = notFound;