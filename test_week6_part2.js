const http = require('http');

const options = {
    hostname: 'localhost',
    port: 8080,
    timeout: 2000
};

const makeRequest = (path, method = 'GET', body = null) => {
    return new Promise((resolve, reject) => {
        const reqOptions = { ...options, path, method };
        if (body) {
            reqOptions.headers = {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(body).length
            };
        }

        const req = http.request(reqOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, data }));
        });

        req.on('error', (err) => reject(err));

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
};

const runTests = async () => {
    console.log('--- Testing Week 6 Part 2 (Reviews) ---');

    try {
        // 1. GET /reviews (Should be Public -> 200)
        const getReviews = await makeRequest('/reviews');
        if (getReviews.statusCode === 200) {
            console.log('[PASS] Public Access: GET /reviews returned 200 OK');
        } else {
            console.error(`[FAIL] Public Access: GET /reviews returned ${getReviews.statusCode}`);
        }

        // 2. GET /reviews with ID (Should be Public -> 200 or 404 if not found)
        // We don't have a known ID easily, but let's just check if it doesn't error out with 500
        // If we use a valid looking fake ID
        const fakeId = '65b4f8a1e4b0a1b2c3d4e5f7';
        const getSingleReview = await makeRequest(`/reviews/${fakeId}`);
        if (getSingleReview.statusCode === 404 || getSingleReview.statusCode === 200) {
            console.log(`[PASS] Public Access: GET /reviews/:id returned ${getSingleReview.statusCode}`);
        } else {
            console.error(`[FAIL] Public Access: GET /reviews/:id returned ${getSingleReview.statusCode}`);
        }

        // 3. POST /reviews (Should be Public? or Protected?)
        // Prompt said "OAuth Security: Implement GitHub OAuth... protect the POST, PUT, and DELETE routes for at least two collections (e.g., Products and Orders)."
        // It didn't explicitly say Reviews must be protected, but usually they are.
        // However, looking at the code, I don't see `isAuthenticated` being imported or used in `routes/reviews.js` (I haven't viewed it yet).
        // Let's check if it allows creating a review.

        const postReview = await makeRequest('/reviews', 'POST', {
            productId: '65b4f8a1e4b0a1b2c3d4e5f7',
            userId: '65b4f8a1e4b0a1b2c3d4e5f6',
            rating: 5,
            comment: "Great stuff"
        });

        console.log(`[INFO] POST /reviews returned ${postReview.statusCode}`);

        // If it returns 201, it's public. If 401, it's protected. If 400, validation failed (which is good).

    } catch (err) {
        console.error('Test execution failed:', err.message);
    }
};

runTests();
