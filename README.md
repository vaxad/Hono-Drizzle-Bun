# Setup

To install dependencies:
```sh
bun install
```
_Set environment variable for [neonDB postgres databas](https://neon.tech/)_ as `DATABASE_URL` along with `JWT_SECRET`

For syncing database:
```sh
bun run db:generate
bun run db:migrate
bun run db:push
```

For dropping database:
```sh
bun run db:drop
```

To run:
```sh
bun run dev
```

open http://localhost:5000

### Documentation regarding the API can be found in the [bruno](https://www.usebruno.com/) collection given

# API Documentation

## Overview
This project is a simple API built using the Hono framework. It includes routes for user management, posts, and comments. Authentication and validation are implemented to ensure secure and correct data handling.

### Main Routes
1. `/user` - User-related routes (registration, login, user profile).
2. `/post` - Post-related routes (create, update, delete, and fetch posts).
3. `/comment` - Comment-related routes (create, update, delete, and fetch comments).

### Global Middleware
- `logger`: Logs all incoming requests for monitoring and debugging purposes.
- `authMiddleware`: Ensures that routes are only accessible to authenticated users.

---

## Route Details

### **User Routes**
- **POST /user/**  
  - **Description:** Create a new user account.  
  - **Body:** `{ "name": string, "email": string, "password": string }`  
  - **Response:** `{ "success": true }`

- **GET /user/**  
  - **Description:** Retrieve all users (excluding passwords).  
  - **Response:** `{ "users": User[], "success": true }`

- **POST /user/login**  
  - **Description:** Authenticate a user and return a token.  
  - **Body:** `{ "email": string, "password": string }`  
  - **Response:** `{ "token": string, "success": true }`

- **GET /user/me**  
  - **Description:** Get details of the authenticated user.  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "user": User, "success": true }`

- **GET /user/:id**  
  - **Description:** Retrieve details of a specific user by ID.  
  - **Params:** `id: number`  
  - **Response:** `{ "user": User, "success": true }`

### **Post Routes**
- **POST /post/**  
  - **Description:** Create a new post.  
  - **Body:** `{ "title": string, "content": string }`  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "success": true }`

- **GET /post/**  
  - **Description:** Retrieve all posts of the authenticated user.  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "posts": Post[], "success": true }`

- **GET /post/all**  
  - **Description:** Retrieve all posts (no user restriction).  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "post": Post[], "success": true }`

- **GET /post/:id**  
  - **Description:** Retrieve a specific post by ID, belonging to the authenticated user.  
  - **Params:** `id: number`  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "post": Post, "success": true }`

- **PUT /post/:id**  
  - **Description:** Update a post.  
  - **Body:** `{ "title": string, "content": string }`  
  - **Params:** `id: number`  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "success": true }`

- **DELETE /post/:id**  
  - **Description:** Delete a post by ID.  
  - **Params:** `id: number`  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "success": true }`

- **GET /post/:id/comment**  
  - **Description:** Retrieve comments for a specific post by ID.  
  - **Params:** `id: number`  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "comments": Comment[], "success": true }`

- **POST /post/:id/comment**  
  - **Description:** Add a comment to a specific post.  
  - **Params:** `id: number`  
  - **Body:** `{ "text": string }`  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "success": true }`

### **Comment Routes**
- **GET /comment/**  
  - **Description:** Retrieve all comments made by the authenticated user.  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "comments": Comment[], "success": true }`

- **GET /comment/:id**  
  - **Description:** Retrieve a specific comment by ID, belonging to the authenticated user.  
  - **Params:** `id: number`  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "comment": Comment, "success": true }`

- **PUT /comment/:id**  
  - **Description:** Update a comment by ID.  
  - **Body:** `{ "text": string }`  
  - **Params:** `id: number`  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "success": true }`

- **DELETE /comment/:id**  
  - **Description:** Delete a comment by ID.  
  - **Params:** `id: number`  
  - **Headers:** `Authorization: Bearer <token>`  
  - **Response:** `{ "success": true }`

