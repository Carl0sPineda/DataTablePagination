export interface LoginResponse {
  id: string;
  username: string;
}

export interface Profile extends LoginResponse {
  iat: number;
}
