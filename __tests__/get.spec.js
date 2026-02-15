const request = require('supertest');
const mongodb = require('../data/database');
const app = require('../server');

beforeAll((done) => {
    mongodb.initDb((err) => {
        if (err) {
            console.error('Database connection failed:', err);
        }
        done();
    });
}, 15000);

describe('GET /products', () => {
    test('should return a 200 status code', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
    });
});

describe('GET /users', () => {
    test('should return a 200 status code', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
    });
});

describe('GET /orders', () => {
    test('should return a 200 status code', async () => {
        const res = await request(app).get('/orders');
        expect(res.statusCode).toBe(200);
    });
});

describe('GET /reviews', () => {
    test('should return a 200 status code', async () => {
        const res = await request(app).get('/reviews');
        expect(res.statusCode).toBe(200);
    });
});
