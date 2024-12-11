import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be at least 3 characters long'], 
    maxlength: [50, 'Name must be at most 50 characters long'], 
    
  },
  email: {
    type: String,
    required: true,
  }  
});

const User = mongoose.model('User', userSchema);
export default User;


userSchema.index({ name: 1 });
userSchema.index({ email: 1});

