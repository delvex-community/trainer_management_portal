export type CreateUserType = {
  name: string;
  email: string;
  contact: number;
  password: string;
};

export type GoogleRegisterType = {
  name: string;
  email: string;
  contact: number;
  avatar: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type CreateTrainerType = {
  name: string;
  email: string;
  contact: number;
  tech: string;
  avatar: File;
};

export type TrainerType = {
  name: string;
  email: string;
  contact: number;
  tech: string;
  avatar: string;
  _id: string;
  ratings: any;
};
