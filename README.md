# Social Network API

Welcome to the Social Network API project! This repository contains the implementation of a powerful and flexible API for a social network web application. This API allows users to share their thoughts, react to friends' thoughts, and manage their friend lists. Built with MongoDB for efficient data handling and Express.js for routing, this project serves as a foundational backend system for social networking platforms.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description

In the world of social networking, handling vast amounts of unstructured data is crucial. MongoDB, known for its speed and flexibility, serves as the ideal choice for such scenarios. This project showcases the construction of an API that harnesses the power of MongoDB, Express.js, and the Mongoose ODM to provide a seamless experience for users interacting with a social network platform.

## Features

- User Management: Create, update, and delete users
- Thought Sharing: Share thoughts, react to thoughts, and delete thoughts
- Friendships: Add and remove friends to a user's friend list
- Efficient Data Handling: Utilize MongoDB's speed and flexibility for large amounts of unstructured data
- API Routes: Define various API routes for users, thoughts, reactions, and friendships

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies using npm install.
3. Set up your MongoDB connection in the appropriate configuration file.
4. Run the application using npm start.

## Usage

Once the server is up and running, you can use tools like Insomnia to interact with the API.

# User Routes
- GET /api/users: Get a list of all users.
- GET /api/users/:id: Get a specific user by their ID.
- POST /api/users: Create a new user.
- PUT /api/users/:id: Update a user's information.
- DELETE /api/users/:id: Delete a user.

# Thought Routes
- GET /api/thoughts: Get a list of all thoughts.
- GET /api/thoughts/:id: Get a specific thought by its ID.
- POST /api/thoughts: Create a new thought.
- PUT /api/thoughts/:id: Update a thought's content.
- DELETE /api/thoughts/:id: Delete a thought.

# Reaction Routes
- POST /api/reactions/:thoughtId: Add a reaction to a thought.
- DELETE /api/reactions/:thoughtId/:reactionId: Remove a reaction from a thought.
- Friendship Routes
- POST /api/friendships/:userId/:friendId: Add a friend to a user's friend list.
- DELETE /api/friendships/:userId/:friendId: Remove a friend from a user's friend list.

# Walkthrough Video
Please refer to the [walkthrough video](https://youtu.be/L2B05BzE08o) for a comprehensive demonstration of the API's functionality.

## License

Please refer to the license in the repo