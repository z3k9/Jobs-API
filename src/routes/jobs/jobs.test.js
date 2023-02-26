const request = require('supertest');
const app = require('../../app');
const { connectDB } = require('../../services/mongo');
const jwt = require('jsonwebtoken');
jest.setTimeout(30000);

let token = '';

describe('Test GET /jobs', ()=>{
    beforeAll(async()=>{
        await connectDB();
        const response = await request(app).post('/api/v1/auth/login').send({email:'veda@gmail.com',
        password: '$Ajelelade97'});
        token = response.body.token;
        console.log(token)
    }, 30000);
    
    test('It should respond with 200 success', async ()=>{
        const response = await request(app)
            .get('/api/v1/jobs')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

});