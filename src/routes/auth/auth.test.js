const request = require('supertest');
const app = require('../../app');
const {connectDB, disconnectDB} = require('../../services/mongo');

describe('Test POST /register', ()=>{
    beforeAll(async()=>{
        await connectDB();
    }, 30000);

    const completeUserData = {
        name:'Ideiya Baba',
        email:'ideiruduiiido@gmail.com',
        password:'Oladoyin92*'
    };
    const userDataExistingEmail = {
        name:'Idrissa Oye',
        email:'idrissadoyyee@gmail.com',
        password:'Oladoyin92*'
    };
    const userDataExistingName = {
        name : 'Idryssa Oke',
        email : 'khalid@gmail.com',
        password : 'Oladoyin92*'
    };
    test('It should respond with 201 success', async()=>{
        const response = await request(app)
            .post('/api/v1/auth/register')
            .send(completeUserData)
            .expect('Content-Type',/json/)
            .expect(201)
    });
    test('It should respond with 500 internal server error', async()=>{
        const response = await request(app)
            .post('/api/v1/auth/register')
            .send(userDataExistingEmail)
            .expect('Content-Type',/json/)
            .expect(500);
    });
    test('It should respond with 500 internal server error', async()=>{
        const response = await request(app)
            .post('/api/v1/auth/register')
            .send(userDataExistingName)
            .expect('Content-Type', /json/)
            .expect(500);
    })
})