import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const usersFilePath = path.join(__dirname, '../data/users.js');

// Read users from the file
const readUsers = async () => { 
    // Use dynamic import to read the users file 
    const module = await import(usersFilePath); 
    return module.default; 
};

router.get('/', async (req, res) => {
    try {
      const jobs = await Job.find();
      console.log(jobs)
      res.render('jobs', { jobs });
     // res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Write users to the file
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
    console.log("in get/update");
    const { id } = req.params;
    const users = await readUsers();
    const user = users[id];
    if (user) {
        res.render('EditUser', { user, userIndex: id });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// POST route to add a new user
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    const users = await readUsers();
    users.push({ name, email });
    writeUsers(users);
    res.redirect('/users');
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
        writeUsers(users);
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

export default router;
