// types/Family.ts

import { User } from "./User";

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Family {
  _id: string;
  familyName: string;
  community: string;
  members: User[];
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}
