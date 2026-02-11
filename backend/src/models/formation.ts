import mongoose, { Document, Schema } from 'mongoose';

interface IFormation extends Document {
  titre: string;
  description: string;
  prix: number;
  photo: string;
}

const FormationSchema: Schema = new Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Formation = mongoose.model<IFormation>('Formation', FormationSchema);

export default Formation;
export { IFormation };
