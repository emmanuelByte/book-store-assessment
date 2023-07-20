import mongoose, { model, Document, Types } from 'mongoose';

export interface IBook extends Document {
  title: string;
  description: string;
  price: string;
  category: string;
}
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String },
});

const Book = model<IBook>('Book', BookSchema);
export default Book;
