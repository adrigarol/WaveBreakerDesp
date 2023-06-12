export class UserDto {
  readonly _id?: string;
  readonly userName: string;
  readonly email: string;
  password: string;
  avatar: string;
  readonly role: string;
  readonly level: number;
  readonly exp: number;
  readonly maxExp: number;
}
