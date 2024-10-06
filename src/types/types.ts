export type messageType = {
  message: string;
};

export type cardType = {
  imageURL: string;
  heading: string;
  text: string;
  tags:string[];
  slug:string
};

export type userSavingType = {
  email: string | null | undefined;
  userName: string | null;
  uid: string;
};
