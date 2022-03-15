import { ObjectId } from "mongodb";

type Role = "ADMIN" | undefined | null;

export default interface User {
  _id: ObjectId;
  email: string;
  username: string;
  password?: string;
  given_name: string;
  family_name: string;
  role: Role;
}
