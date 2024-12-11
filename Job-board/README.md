# Job Board Application

This is a simple job board application built with Express.js. It allows users to view, add, and manage job applications.

## Features

- View a list of job applications
- Add new job applications
- Manage existing job applications

- View a list of job applications
- Add new job applications
- Manage existing job applications

- View a list of job applications
- Add new job applications
- Manage existing job applications

## Installation

1. Clone the repository:
 
   git clone https://github.com/your-username/job-board.git

2,Install the dependencies
 1. npm init -y
 2. npm i express
 3. nom i method-override
 4. npm install mongoose

2. Set up environment variables in .env

3.Start the server:

nodemon index.js
Open your browser and navigate to http://localhost:3000/jobs to view the job applications.
Open your browser and navigate to http://localhost:3000/applications to view the job applications.
Open your browser and navigate to http://localhost:3000/users to view the useres.



3. Routes
Users Routes
GET /users: View all users

POST /users: Add a new user

PATCH /users/:id: Update an existing user

DELETE /users/:id: Delete a user

Jobs Routes
GET /jobs: View all jobs

POST /jobs: Add a new job

PATCH /jobs/:id: Update an existing job

DELETE /jobs/:id: Delete a job

Applications Routes
GET /applications: View all applications

POST /applications: Add a new application

DELETE /applications/:id: Delete an application


4. Validation 
.1. Name - Minlength ,MaxLength
 2. Email - Email format validation
 3. Required fields

5. Indexes where created

### Example Data - **Sample Users**: ```json [ { "name": "Alice Johnson", "email": "alice.johnson@example.com", "password": "password123" }, { "name": "Bob Smith", "email": "bob.smith@example.com", "password": "password123" }, { "name": "Carol Taylor", "email": "carol.taylor@example.com", "password": "password123" }, { "name": "David Brown", "email": "david.brown@example.com", "password": "password123" }, { "name": "Emma Davis", "email": "emma.davis@example.com", "password": "password123" } ]

### Example Data - **Sample Jobs**: ```json [ 
  { "title": "Software Engineer", "company": "Tech Corp", "location": "San Francisco, CA", "description": "Develop and maintain software applications." },
  { "title": "Product Manager", "company": "Innovate LLC", "location": "New York, NY", "description": "Manage product development and strategy." },
  { "title": "Data Scientist", "company": "Data Solutions", "location": "Boston, MA", "description": "Analyze and interpret complex data sets." },
  { "title": "UX Designer", "company": "Design Studio", "location": "Austin, TX", "description": "Create user-friendly interfaces and experiences." },
  { "title": "System Administrator", "company": "IT Services", "location": "Chicago, IL", "description": "Maintain and support IT systems." }
]


### Example Data - **Sample Applications**: ```json [ 
  { "jobTitle": "Software Engineer", "applicantName": "Alice Johnson" },
  { "jobTitle": "Product Manager", "applicantName": "Bob Smith" },
  { "jobTitle": "Data Scientist", "applicantName": "Carol Taylor" },
  { "jobTitle": "UX Designer", "applicantName": "David Brown" },
  { "jobTitle": "System Administrator", "applicantName": "Emma Davis" }
]



