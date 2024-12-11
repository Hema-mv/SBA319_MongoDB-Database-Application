import express from 'express';
import Job from '../models/job.js';


const router = express.Router();



const tmpJobs = [
  { title: 'Software Engineer', company: 'Tech Corp', location: 'San Francisco, CA', description: 'Develop and maintain software applications.' },
  { title: 'Product Manager', company: 'Innovate LLC', location: 'New York, NY', description: 'Manage product development and strategy.' },
  { title: 'Data Scientist', company: 'Data Solutions', location: 'Boston, MA', description: 'Analyze and interpret complex data sets.' },
  { title: 'UX Designer', company: 'Design Studio', location: 'Austin, TX', description: 'Create user-friendly interfaces and experiences.' },
  { title: 'System Administrator', company: 'IT Services', location: 'Chicago, IL', description: 'Maintain and support IT systems.' }
];

router.get('/', async (req, res) => {
    try {
        let jobs = await Job.find();

        if (jobs.length === 0) {
            console.log('No jobs found in the database. Adding temporary jobs.');
            jobs = await Job.insertMany(tmpJobs);
        } else {
            console.log('Jobs found:', jobs);
        }

        res.render('jobs', { jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
  try {
  
   const newJob = await Job.create(req.body); 
   res.redirect('/jobs');
 
  } catch (error) {

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
