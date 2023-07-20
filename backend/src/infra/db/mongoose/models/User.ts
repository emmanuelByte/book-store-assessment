import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string | undefined;
  firstName?: string;
  lastName?: string;
  books: Types.ObjectId[];
}
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  {
    timestamps: true,
  },
);

const User = model<IUser>('User', userSchema);
export default User;
