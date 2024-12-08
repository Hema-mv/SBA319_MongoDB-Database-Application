import express from 'express';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import connectDB from './db/conn.js';
import indexRoutes from './routes/index.js';
import error from './utilities/error.js';
import jobs from './routes/jobs.js';
import users from './routes/users.js';
import applications from './routes/applications.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));
// Override with a query value in the request 
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
//connectDB();

// Use routes
app.use('/', indexRoutes);
app.use('/jobs', jobs);
app.use('/users', users);
app.use('/applications', applications);

// Error handling middleware
app.use(error);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
