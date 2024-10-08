export type messageType = {
  message: string;
};

export type CardData = {
  firebaseID?: string;
  imageURL?: string;
  title?: string;
  mark?: string;
  tag?: string;
  slug?: string;
  heading?: string;
  text?: string;
};

export type userSavingType = {
  email: string | null | undefined;
  userName: string | null;
  uid: string;
};

export type blogType = {
  title: string;
  file: File | null | undefined;
  tag: string;
  mark: string;
  slug: string;
  createdDate: Date;
};
