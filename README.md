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


