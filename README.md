# MovieList Admin Backend

MovieList Admin Backend is a JavaScript backend project designed as an admin app that includes 3 services, focused on handling movies and user movie lists. It features a REST API with CRUD operations, an app service that fetches data from the API and uses HTML files, and an authentication service for user login and registration using JWT tokens.

The backend part of the application is managed only by an admin and provides secure access to the application's data. The project is scalable and can be easily modified to meet changing requirements.

## Project setup
```
npm install
```

## Services
1. REST API Service - This service provides CRUD operations for handling movies and user movie lists. It includes endpoints for creating, reading, updating and deleting movie data, as well as user movie lists. It also handles authorization and authentication using JWT tokens.

2. App Service - This service fetches data from the API and uses HTML files to display the data to the user. It also includes a search function for finding movies by title or genre.

3. Authentication Service - This service is used for user login and registration using JWT tokens. It includes endpoints for registering a new user, logging in and out, and refreshing access tokens.

## How to Use
To use MovieList Admin Backend, simply download the project and import it into your JavaScript IDE of choice. The project is structured in a modular way, with each service implemented in its own package. This makes it easy to understand and modify the code.
