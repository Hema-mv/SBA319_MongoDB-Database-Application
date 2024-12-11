import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: String,
  datePosted: {
    type: Date,
    default: Date.now,
  },
});



const Job = mongoose.model('Job', jobSchema);


jobSchema.index({ title: 1 });
jobSchema.index({ company: 1});

export default Job;

