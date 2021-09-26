export type AuthPayload = {
  casID: string;
  password: string;
};

export type TokenPayload = {
  casID: string;
  data: string;
};
