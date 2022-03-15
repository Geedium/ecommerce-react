import { ObjectId } from "mongodb";

export default interface Category {
  _id: ObjectId;
  parentId?: ObjectId;
  name: string;
  slug?: string;
  order: number;
  children?: Category[];
  createdAt?: Date;
  updatedAt?: Date;
}
