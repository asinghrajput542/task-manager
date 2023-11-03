<div align="center">

<h1><strong>Task</strong>Manager App - Backend</h1>
</div>


 The backend of the Task Manager App is built using Node.js, Express, and MongoDB. This component of the application is responsible for handling task management operations, including creating, updating, and deleting tasks. By leveraging the power of Node.js and MongoDB, the backend provides a robust and efficient foundation for your task management needs.

---

## Features 📋

⚡️ Create New Tasks: Users can create new tasks by sending POST requests to the /tasks endpoint. Task details, such as title, description, and status, can be included in the request body.\
⚡️ Update Task Details: Existing tasks can be updated using PUT requests to the /tasks/:id endpoint. Users can modify task attributes like title, description, and status.\
⚡️ Delete Task: Unwanted or completed tasks can be removed from the system by sending DELETE requests to the /tasks/:id endpoint.\
⚡️ Get All Tasks: Retrieve a list of all tasks by sending a GET request to the `/tasks` endpoint. This feature allows you to fetch and display all tasks in your application.


### Frameworks & Libraries used 📚
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/-Chai-%238A4182?style=for-the-badge&logo=Chai&logoColor=white)


<!--## Deployments
![vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)-->


## Getting Started 🚀

To use this project, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Start the development server using `npm start`.
4. The backend will be accessible at http://localhost:9000.

## API Endpoints 🍕
1. `Create Task` : POST /task - Create a new task by providing task details in the request body.
2. `Update Task` : PUT /task/:id - Update an existing task by specifying the task ID and providing the updated task details in the request body.
3. `Delete Task` : DELETE /task/:id - Delete a task by specifying its unique ID.
4. `Get All Tasks` : GET /task - Retrieve a list of all tasks in the database. This endpoint returns all tasks currently stored in the system.




