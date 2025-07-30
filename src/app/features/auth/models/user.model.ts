export interface UserModel {
  id: string;
  deletedAt: null;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  firebaseId: string;
  phoneNumber: null;
  profileImageUrl: null;
  role: string;
  emailVerified: boolean;
}
