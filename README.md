Getting Started with Create React App
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Progress for Assignment Task
Completed Features:
User Management UI

Created a UserManagement component using React and MUI.
Displayed a table with user data including columns for ID, Username, Role, Status, and Actions.
Mock API Setup

Installed json-server to simulate a REST API for the project.
Created a db.json file to store mock user data.
Fetching Data

Successfully integrated Axios to fetch data from the mock API (http://localhost:5000/users) and displayed it in the table.
JSON Server Setup

Installed and configured json-server to run on localhost:5000 for handling CRUD operations.
Action Buttons

Added "Edit" and "Delete" buttons for each user in the table.
Styled the buttons using MUI's Button component.

Installation Steps for Mock API:
Install json-server globally:

npm install -g json-server
Create db.json:

{
  "users": [
    { "id": 1, "username": "admin", "role": "Administrator", "status": "Active" },
    { "id": 2, "username": "editor", "role": "Editor", "status": "Inactive" }
  ]
}


Start the mock server:

"scripts": {
  "start-json-server": "json-server --watch db.json --port 5000"
}

npm run start-json-server

