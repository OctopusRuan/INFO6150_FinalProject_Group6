User Management System with Image Uploads

Overview

This project implements a RESTful API for managing users, including functionalities such as user creation, updating user details, deleting users, retrieving all users, and uploading images. The application is built using Node.js, Express, MongoDB, and Multer for file uploads. The API enforces several validations such as email format, password strength, and image file format for uploads.

Technologies Used:
Node.js: Server-side JavaScript runtime
Express: Web framework for Node.js
MongoDB: NoSQL database
Mongoose: ODM for MongoDB
bcrypt: Library for hashing passwords
Multer: Middleware for handling file uploads
Features

User Creation: Users can create an account with a valid email, full name, and strong password.
Update User Details: Users can update their full name and password.
Delete User: Users can be deleted from the system using their email.
Retrieve All Users: A list of all users can be fetched.
Image Upload: Users can upload a profile image (only JPEG, PNG, or GIF formats allowed). Only one image per user.
Installation


1. Install dependencies:
npm install
2. Set up MongoDB
Ensure you have MongoDB installed and running. You can download and install MongoDB from here. Alternatively, use a MongoDB cloud service like MongoDB Atlas.

3. Start the server:
npm start
This will start the server on http://localhost:8080.

API Endpoints

1. Create User
Endpoint: POST /user/create
Request Body:
fullName: User's full name (only alphabetic characters)
email: User's email (must end with @northeastern.edu)
password: User's password (must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character)
Response:
Success (201): { "message": "User created successfully." }
Error (400): { "error": "Validation failed." }
2. Update User Details
Endpoint: PUT /user/edit
Request Body:
email: User's email (cannot be changed)
fullName: New full name (optional)
password: New password (optional)
Response:
Success (200): { "message": "User updated successfully." }
Error (400): { "error": "Validation failed." }
Error (404): { "error": "User not found." }
3. Delete User
Endpoint: DELETE /user/delete
Request Body:
email: User's email
Response:
Success (200): { "message": "User deleted successfully." }
Error (404): { "error": "User not found." }
4. Get All Users
Endpoint: GET /user/getAll
Response:

Success (200): { "users": [ { "fullName": "John Doe", "email": "john.doe@example.com" } ] }
5. Upload Image
Endpoint: POST /user/uploadImage
Request Body:
email: User's email (to associate the image with the correct user)
image: Image file (JPEG, PNG, or GIF only)
Response:
Success (201): { "message": "Image uploaded successfully.", "filePath": "/images/filename.extension" }
Error (400): { "error": "Invalid file format. Only JPEG, PNG, and GIF are allowed." }
Error (400): { "error": "Image already exists for this user." }
Error (404): { "error": "User not found." }
Validation Rules

Email: Must be in the format email@northeastern.edu.
Full Name: Must contain only alphabetic characters (no spaces or other symbols).
Password: Must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
Image Upload: Only one image can be uploaded per user. The image format must be JPEG, PNG, or GIF.
Testing with Postman

Create User: Send a POST request to http://localhost:8080/user/create with the required body (JSON).
Update User: Send a PUT request to http://localhost:8080/user/edit with the updated user details.
Delete User: Send a DELETE request to http://localhost:8080/user/delete with the user's email.
Get All Users: Send a GET request to http://localhost:8080/user/getAll.
Upload Image: Send a POST request to http://localhost:8080/user/uploadImage with the email and image file.
Error Handling

The API provides appropriate error messages and HTTP status codes for all validation failures and server errors.

Example:

400 (Bad Request): Invalid input, such as invalid email or password format.
404 (Not Found): User not found for the requested operation.
500 (Internal Server Error): Server errors, such as database connection issues.
Swagger Documentation

Swagger documentation for the API can be accessed at the following URL:

http://localhost:8080/api-docs