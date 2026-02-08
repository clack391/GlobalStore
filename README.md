# GlobalStore API

## Part 1: Project Setup & Products Collection (Precious) (Completed)
- **Project Structure**: Initialized Node.js project, installed dependencies, and created MVC folders.
- **Database**: Configured MongoDB connection (`data/database.js`) to `global_store_db`.
- **Products**:
  - Controller (`controllers/products.js`): `getAll`, `getSingle`, `createProduct`, `updateProduct`, `deleteProduct`.
  - Routes (`routes/products.js`): GET, POST, PUT, DELETE endpoints.
  - Fields included: `name`, `price`, `description`, `category`, `stock`, `brand`, `rating`.

## Part 2: Users & Documentation (Praise) (TODO)
**Your focus**: The "Users" collection and the Swagger Documentation setup.

### 1. Users Collection
- [ ] Create `controllers/users.js` with 5 functions: `getAll`, `getSingle`, `createUser`, `updateUser`, `deleteUser`.
- [ ] Fields: `oauthId`, `username`, `avatar`, `role` (default to 'user').
- [ ] Error Handling: Wrap every function in a `try...catch` block.
- [ ] Routes: Create `routes/users.js` with GET, POST, PUT, DELETE endpoints.

### 2. Swagger Documentation
- [ ] Create `swagger.js` file using `swagger-autogen`.
- [ ] Info: Title: "GlobalStore API", Description: "E-commerce Backend".
- [ ] Schemes: `['https', 'http']`.
- [ ] Output: Save to `swagger-output.json`.

### 3. Routing Integration
- [ ] Update `routes/index.js`:
  - [ ] Add the route for Swagger UI at `/api-docs`.
  - [ ] Add the route for `/users` (pointing to user routes).
  - [ ] (Done) Route for `/products` is already there.

### Setup Instructions for Praise
1.  **Clone/Pull the project**: Ensure you have the latest code.
2.  **Install Dependencies**: Run `npm install` to install all required packages.
3.  **Database Setup**:
    - Create a `.env` file in the root directory (same level as `package.json`).
    - Add your MongoDB connection string to the `.env` file. It should look like this:
      ```
      MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/global_store_db?retryWrites=true&w=majority
      PORT=3000
      ```
    - **Important**: ensure the database name value in the URI is `global_store_db` (or relies on the default in `database.js` which handles the connection). The code explicitly connects to `global_store_db` in `data/database.js` if not specified in the URI, but it's best to include it.
    - **Verification**: The database should contain a `products` collection and a `users` collection.
4.  **Start Server**: Run `npm start`.
    - You should see "Database is listening and node running on port 3000" and "Connected to database: global_store_db".

