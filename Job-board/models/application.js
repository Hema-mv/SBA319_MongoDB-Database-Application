import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    jobTitle: {
    type: String,
    required: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
});

applicationSchema.index({ jobTitle: 1 });
applicationSchema.index({ applicantName: 1});

const Applicant = mongoose.model('Application', applicationSchema);
export default Applicant;
