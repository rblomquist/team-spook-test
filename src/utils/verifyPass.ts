import bcrypt from "bcrypt";
import { User } from "../models/collections.js";

export const verifyPass = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return { message: 'Password verified' };
    } else {
      throw new Error('Invalid password');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
