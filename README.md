# User Management App

  

Overview

  

This is a web application that allows users to view, add, edit, and delete user details. The app interacts with the JSONPlaceholder API (/users endpoint) to simulate backend operations.

  

# Features

  

View Users: Fetch and display a list of users.

  

Add User: Submit a form to add a new user.

  

Edit User: Update user details through a form.

  

Delete User: Remove a user by calling api.

  

Error Handling: Display error messages for API failures.

  

## Additional Features:

  Pagination

 Client-side form  validation.

 Responsive UI.

Search Functionality

  

## Installation & Setup

  Clone the repository:

  

git clone https://github.com/geetam-das-binani/ajackus-assignment

cd project directory

  

Install dependencies:

  

npm install

  

Start the development server:

  

npm run dev

  

Open the app in a browser:

  

http://localhost:5173

  

## API Usage

  

This app interacts with the JSONPlaceholder API (https://jsonplaceholder.typicode.com/users). Since JSONPlaceholder is a mock API:

  

POST requests simulate adding a user but won't persist data.

  

PUT requests simulate editing a user but won’t update permanently.

  

DELETE requests simulate removing a user but don’t actually delete data.

  

## Challenges Faced

  


  

Error Handling: Handling API failures and simulating different error scenarios was essential for robustness.

  

Validation: Ensuring input fields have proper validation to prevent incorrect data submission.

  

Responsive Design: Adjusting the UI to be user-friendly across different screen sizes.

  

## Future Improvements

  

Implement a real backend with database storage for persistent data.

  

Improve the UI/UX with better styling and animations.

  

Add authentication  enhanced security.

Enhance sorting functionalities for a better user experience.

  
