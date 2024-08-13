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
