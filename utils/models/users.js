import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  pwd: { type: String ,required:true},
  key:{ type: String, required: true },
  secret:{ type: String, required: true },
});

const User = mongoose.models.users || mongoose.model('users',userSchema)

export default User;