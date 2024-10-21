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
  tech: string[];
  avatar: string;
  _id: string;
  ratings: any;
  avgRating: number;
  location: string;
  trainingCount: number;
};

export type TrainingType = {
  _id: string;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
  mode: string;
  trainer: TrainerType;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  contact: number;
  avatar: string;
  password: string;
};
