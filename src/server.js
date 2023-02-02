const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const { connectDB } = require('./services/mongo');


async function start(){
    await connectDB();
    
    server.listen(PORT, (req,res)=>{
        console.log(`Server is listening on port: ${PORT}`);
    });
}

start();