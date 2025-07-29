export interface RegisterModel {
  email: string;
  password: string;
  username: string;
}

export interface UserModel {
  displayName?: string;
  email?: string;
  uid?: string;
  profileImage?: string;
}
