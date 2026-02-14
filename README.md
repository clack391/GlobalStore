# GlobalStore API

## Part 1: Project Setup & Products Collection (Precious) (Completed)
- **Project Structure**: Initialized Node.js project, installed dependencies, and created MVC folders.
- **Database**: Configured MongoDB connection (`data/database.js`) to `global_store_db`.
- **Products**:
  - Controller (`controllers/products.js`): `getAll`, `getSingle`, `createProduct`, `updateProduct`, `deleteProduct`.
  - Routes (`routes/products.js`): GET, POST, PUT, DELETE endpoints.
  - Fields included: `name`, `price`, `description`, `category`, `stock`, `brand`, `rating`.

## Part 2: Users & Documentation (Praise) (Completed)
**Focus**: The "Users" collection and the Swagger Documentation setup.

### 1. Users Collection
- [x] Create `controllers/users.js` with 5 functions: `getAll`, `getSingle`, `createUser`, `updateUser`, `deleteUser`.
- [x] Fields: `oauthId`, `username`, `avatar`, `role` (default to 'user').
- [x] Error Handling: Wrapped every function in a `try...catch` block.
- [x] Routes: Created `routes/users.js` with GET, POST, PUT, DELETE endpoints.

### 2. Swagger Documentation
- [x] Created `swagger.js` file using `swagger-autogen`.
- [x] Info: Title: "GlobalStore API", Description: "E-commerce Backend".
- [x] Schemes: `['https']` (Forced HTTPS for deployment).
- [x] Output: Saved to `swagger-output.json`.

### 3. Routing Integration
- [x] Updated `routes/index.js`:
  - [x] Added root route `/` returning "Hello World".
  - [x] Added route for `/users`.
  - [x] Verified `/products` route.

## API Documentation
The API documentation is available via Swagger UI.

- **Local**: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)
- **Live (Render)**: [https://globalstore-94hn.onrender.com/api-docs](https://globalstore-94hn.onrender.com/api-docs)

### Setup Instructions
1.  **Clone/Pull the project**: Ensure you have the latest code.
2.  **Install Dependencies**: Run `npm install`.
3.  **Database Setup**:
    - Create a `.env` file in the root directory.
    - Add your MongoDB connection string and port:
      ```
      MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/global_store_db?retryWrites=true&w=majority
      PORT=8080
      ```
4.  **Start Server**: Run `npm start`.

## Week 6: Collections, Validation, & OAuth

### Part 1: Orders & OAuth (Precious) (Completed)
- **Orders Collection**: Implemented Controller, Routes, and Validation.
- **Validation**: Centralized in `middleware/validation.js`.
- **OAuth Security**:
  - Implemented GitHub Login via Passport module.
  - Protected `POST`, `PUT`, `DELETE` routes for **Products** and **Orders**.
  - Routes: `/login`, `/logout`, `/github/callback`.

### Part 2: Reviews & Testing (Praise) (TODO)
**Focus**: The "Reviews" collection, Unit Testing, and Swagger Updates.

#### 1. Reviews Collection
- [ ] Create `controllers/reviews.js`: `getAll`, `getSingle`, `createReview`, `updateReview`, `deleteReview`.
- [ ] Routes: Create `routes/reviews.js`.
- [ ] Validation: Add `validateReview` to `middleware/validation.js` (require `productId`, `userId`, `rating`, `comment`).

#### 2. Unit Testing
- [ ] Install `jest` and `supertest`.
- [ ] Create `__tests__/get.spec.js`.
- [ ] Write tests to verify `GET` routes for all 4 collections return 200 OK.

#### 3. Swagger Update
- [ ] Run `node swagger.js` to regenerate documentation including the new commands.

### Setup Instructions (Week 6)
1.  **Clone/Pull**: Get latest code.
2.  **Install**: `npm install` (includes new passport deps).
3.  **Environment Variables**:
    - Ensure `.env` has `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `CALLBACK_URL`.
    - `CALLBACK_URL` should match your dev environment (e.g., `http://localhost:8080/github/callback`).
4.  **Start**: `npm start`.


