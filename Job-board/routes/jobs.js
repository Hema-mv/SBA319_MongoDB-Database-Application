import express from 'express';
import Job from '../models/job.js';


const router = express.Router();


// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
   // console.log(jobs)
   res.render('jobs', { jobs });
   // res.render('jobs');
   // res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  // const job = new Job({
  //   title: req.body.title,
  //   company: req.body.company,
  //   location: req.body.location,
  //   description: req.body.description,
  // });
  console.log(req.body)
  try {
   // const newJob = await job.save();
    const newJob = await Job.create(req.body);
   // res.status(201).json(newJob);
   res.redirect('/jobs');
   console.log(res.status)
  } catch (error) {
    console.log(res.status)
    res.status(400).json({ message: error.message });
  }
});

// Get a job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/update/:id', async (req, res) => {

 
  // const { id } = req.params;
  //   //const job = await Job.findById(req.params.id);
  // const job = req.body;
  const job = await Job.findById(req.params.id);
  if (job) {
      res.render('EditJob', { job, jobIndex: req.params.id });
  } else {
      res.status(404).json({ error: 'Job not found' });
  }
});
// Update a job
router.patch('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (req.body.title != null) {
      job.title = req.body.title;
    }
    if (req.body.company != null) {
      job.company = req.body.company;
    }
    if (req.body.location != null) {
      job.location = req.body.location;
    }
    if (req.body.description != null) {
      job.description = req.body.description;
    }

    const updatedJob = await job.save();
    res.redirect('/jobs')
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.redirect('/jobs');
    // await job.remove();
    // res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
