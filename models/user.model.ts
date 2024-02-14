import mongoose, { Schema } from "mongoose";
import DocumentStatus, { UserRole } from "../constants";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  status: DocumentStatus;
}

const userSchema: Schema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: UserRole,
    required: true,
  },
  status: {
    type: String,
    enum: DocumentStatus,
    default: DocumentStatus.ACTIVE,
  },
});

export default mongoose.model<IUser>("User", userSchema);
