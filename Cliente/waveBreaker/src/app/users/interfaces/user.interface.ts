export interface User {
  _id?: number;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  level: number;
  exp: number;
  maxExp: number;
}


export interface UserLogin {
  email: string;
  password: string;
}
