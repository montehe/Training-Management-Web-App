import mongoose, { Document, Schema } from 'mongoose';

interface IRegistration extends Document {
 userId:mongoose.Types.ObjectId;
  formationId: mongoose.Types.ObjectId;
  date: Date;
  discountedPrice: number;
}

const registrationSchema = new Schema<IRegistration>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  formationId: { type: Schema.Types.ObjectId, ref: 'Formation', required: true },
  date: { type: Date, default: Date.now },
  discountedPrice: { type: Number, required: true },
});

const Registration = mongoose.model<IRegistration>('Registration', registrationSchema);

export default Registration;
export { IRegistration };
