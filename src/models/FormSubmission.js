import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  countryCode: String,
  phone: String,
  website: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);
export default FormSubmission;
