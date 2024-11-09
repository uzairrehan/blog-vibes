import { ReactNode } from "react";

export type messageType = {
  message: string;
};

export type CardData = {
  firebaseID?: string;
  imageURL?: string;
  title?: string;
  mark?: string;
  category?: string;
  slug?: string;
  heading?: string;
  text?: string;
  createdDate?: Date;
};

export type userSavingType = {
  email: string | null | undefined;
  userName: string | null;
  uid: string;
};

export type blogType = {
  title?: string;
  file?: File | null | undefined;
  category?: string;
  mark?: string;
  slug?: string;
  createdDate?: Date;
  editedDate?: Date;
  firebaseID?: string;
  imageURL?: string;
  uid?: string;
};

export type updateProfileType = {
  picture: File | null | undefined;
  name: string;
  fathername: string;
  phonenumber: string;
  DOB: string;
  bio: string;
};
export type AdminLayoutTypes = {
  children: ReactNode;
};


export type AllCardsProps = {
  allCards: blogType[];
}


export type UserState = {
  email: string;
  uid: string;
  DOB?: string;
  bio?: string;
  fathername?: string;
  imageURL?: string;
  phonenumber?: string;
  userName?: string;
  role?: string;
  saved?:string[]
}