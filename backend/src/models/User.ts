import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  _id: string;  
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  name?: string;
  tel?: string;
  adresse?: string;
  fonction?: 'etudiant' | 'employer';
  verifyToken?: string;
  resetPasswordToken?: string;  
  resetPasswordExpires?: Date;   
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
  tel: { type: String },
  adresse: { type: String },
  fonction: { type: String, enum: ['etudiant', 'employer'] },
  verifyToken: { type: String },
  resetPasswordToken: { type: String }, 
  resetPasswordExpires: { type: Date }   
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
