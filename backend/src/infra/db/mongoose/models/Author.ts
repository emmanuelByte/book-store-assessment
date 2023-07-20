import mongoose, { model, Document, Types } from 'mongoose';

export interface IAuthor extends Document {
  bio: string;
  user: Types.ObjectId;
  name: string;
}
const AuthorSchema = new mongoose.Schema({
  bio: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
});

const Author = model<IAuthor>('Author', AuthorSchema);
export default Author;
