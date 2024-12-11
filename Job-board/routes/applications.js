
import express from 'express';
const router = express.Router();
import Application from '../models/application.js';

router.get('/', async (req, res) => {
    try {
      const applications = await Application.find();
      console.log(applications)
      res.render('applications', { applications });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router.post('/', async(req, res) => {
    const newJob = await Application.create(req.body);
    res.redirect('/applications');
});

export default router;