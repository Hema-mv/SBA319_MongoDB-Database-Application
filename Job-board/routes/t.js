import express from 'express';
import Applicant from '../models/Application'; // Adjust the path as necessary

const router = express.Router();

const tmpApplications = [
  { jobTitle: 'Software Engineer', applicantName: 'Alice Johnson' },
  { jobTitle: 'Product Manager', applicantName: 'Bob Smith' },
  { jobTitle: 'Data Scientist', applicantName: 'Carol Taylor' },
  { jobTitle: 'UX Designer', applicantName: 'David Brown' },
  { jobTitle: 'System Administrator', applicantName: 'Emma Davis' }
];

router.get('/', async (req, res) => {
    try {
        let applications = await Applicant.find();

        if (applications.length === 0) {
            console.log('No applications found in the database. Adding temporary applications.');
            applications = await Applicant.insertMany(tmpApplications);
        } else {
            console.log('Applications found:', applications);
        }

        res.render('applications', { applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
