const http = require('http');

const options = {
    hostname: 'localhost',
    port: 8080, // Using the port from .env (defaulting to 8080 as per previous context)
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
    console.log('--- Testing Week 6 Part 1 (Orders & OAuth) ---');

    try {
        // 1. GET /orders (Should be Public -> 200)
        const getOrders = await makeRequest('/orders');
        if (getOrders.statusCode === 200) {
            console.log('[PASS] Public Access: GET /orders returned 200 OK');
        } else {
            console.error(`[FAIL] Public Access: GET /orders returned ${getOrders.statusCode}`);
        }

        // 2. POST /orders (Should be Protected -> 401)
        const postOrder = await makeRequest('/orders', 'POST', {
            userId: 'test', productId: 'test', quantity: 1, status: 'pending'
        });
        if (postOrder.statusCode === 401) {
            console.log('[PASS] Protected Access: POST /orders returned 401 Unauthorized');
        } else {
            console.error(`[FAIL] Protected Access: POST /orders returned ${postOrder.statusCode} (Expected 401)`);
        }

        // 3. POST /products (Should be Protected -> 401)
        const postProduct = await makeRequest('/products', 'POST', {
            name: 'test', price: 10, description: 'test', category: 'test', stock: 1, brand: 'test', rating: 5
        });
        if (postProduct.statusCode === 401) {
            console.log('[PASS] Protected Access: POST /products returned 401 Unauthorized');
        } else {
            console.error(`[FAIL] Protected Access: POST /products returned ${postProduct.statusCode} (Expected 401)`);
        }

        // 4. GET /login (Should redirect to GitHub -> 302)
        const login = await makeRequest('/login');
        if (login.statusCode === 302) {
            console.log('[PASS] OAuth flow: GET /login redirects (302) to GitHub');
        } else {
            console.error(`[FAIL] OAuth flow: GET /login returned ${login.statusCode}`);
        }

    } catch (err) {
        console.error('Test execution failed:', err.message);
    }
};

runTests();
