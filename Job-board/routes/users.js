import express from 'express';
import User from '../models/user.js';
const router = express.Router();

const tmpusers = [
  { name: 'Alice Johnson', email: 'alice.johnson@example.com', password: 'password123' },
  { name: 'Bob Smith', email: 'bob.smith@example.com', password: 'password123' },
  { name: 'Carol Taylor', email: 'carol.taylor@example.com', password: 'password123' },
  { name: 'David Brown', email: 'david.brown@example.com', password: 'password123' },
  { name: 'Emma Davis', email: 'emma.davis@example.com', password: 'password123' }
];

router.get('/', async (req, res) => {
    try {
        let users = await User.find();
console.log(users)
        if (users.length === 0) {
            console.log('No users found in the database. Adding temporary users.');
            users = await User.insertMany(tmpusers);
        } else {
            console.log('Users found:', users);
        }

        res.render('users', { users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Write users to the file
const writeUsers = (users) => {
    const usersContent = `const users = ${JSON.stringify(users, null, 4)};\n\nexport default users;`;
    fs.writeFileSync(usersFilePath, usersContent, 'utf8');
};


router.get('/', async (req, res) => {
      const users = await User.find();
    res.render('users', { users });
});


router.get('/update/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (user) {
          res.render('EditUser', { user, userIndex: req.params.id });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});


// POST route to add a new user
router.post('/', async (req, res) => {
      try {
       
         const newUser = await User.create(req.body);
      
        res.redirect('/users');
        console.log(res.status)
       } catch (error) {
         console.log(res.status)
         res.status(400).json({ message: error.message });
       }
});


router.patch('/:id', async (req, res) => {
    console.log("I'm in patch");
    console.log(req.body)
   const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findById(req.params.id);
    //const user = users[id];

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

router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      // console.log(user)
      // if (!user) {
      //   return res.status(404).json({ message: 'User not found' });
      // }
      res.redirect('/users');
       } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;
