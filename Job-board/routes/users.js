import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from '../models/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const usersFilePath = path.join(__dirname, '../data/users.js');

// Read users from the file
const readUsers = async () => { 
    try {
    const users = await User.find();
    res.render('users', { users });
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};

router.get('/', async (req, res) => {
    try {
      const users = await User.find();
  
      res.render('users', { users });
     // res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//Write users to the file
const writeUsers = (users) => {
    const usersContent = `const users = ${JSON.stringify(users, null, 4)};\n\nexport default users;`;
    fs.writeFileSync(usersFilePath, usersContent, 'utf8');
};

// GET route to list all users
router.get('/', async (req, res) => {
    const users = await readUsers();
    res.render('users', { users });
});

// GET route to show the update user page
router.get('/update/:id', async (req, res) => {
    //console.log("in get/update");
    console.log(req.params)
   const { id } = req.params;
    const users = await User.findById(id);
    console.log(users)
    //const users = await readUsers();
    const user = users[id];
    if (user) {
        res.render('EditUser', { user, userIndex: id });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// POST route to add a new user
router.post('/', async (req, res) => {
    // const { name, email } = req.body;
    // const users = await readUsers();
    // users.push({ name, email });
    // const NEW= await Job.create(req.body);
    // //writeUsers(users);
    // res.redirect('/users');


    try {
        // const newJob = await job.save();
         const newUser = await User.create(req.body);
        // res.status(201).json(newJob);
        res.redirect('/users');
        console.log(res.status)
       } catch (error) {
         console.log(res.status)
         res.status(400).json({ message: error.message });
       }
});

// PATCH route to update a user
router.patch('/:id', async (req, res) => {
    console.log("I'm in patch");
    const { id } = req.params;
    const { name, email } = req.body;
    const users = await readUsers();
    const user = users[id];

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
       // writeUsers(users);
        const updatedUser = await user.save();
        res.redirect('/users');
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// DELETE route to delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const users = await readUsers();
    if (users[id]) {
        users.splice(id, 1);
        writeUsers(users);
        res.redirect('/users');
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.redirect('/users');
      // await job.remove();
      // res.json({ message: 'Job deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;
