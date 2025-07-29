import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { environment } from '../../../../environments/environment.development';
import { RegisterModel, UserModel } from '../models/register.model';
import { initializeApp } from 'firebase/app';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private googleAuthProvider = new GoogleAuthProvider();
  private auth = getAuth();
  private readonly http = inject(HttpClient);
  private readonly apiURL = environment.apiURL;

  constructor() {
    onAuthStateChanged(this.auth, (user) => {});
  }

  async register(registerModel: RegisterModel) {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      registerModel.email,
      registerModel.password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: registerModel.username });
    const userData = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      profileImage: user.photoURL,
    };
    await sendEmailVerification(user);
    console.log(userData);

    return this.http.post(`${this.apiURL}/auth/register`, userData);
  }

  async login(loginModel: LoginModel) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      loginModel.email,
      loginModel.password
    );
    const user = userCredential.user;
    // return this.http.post(`${this.apiURL}/auth/login`, userData);
  }

  async googleLogin() {
    const userCredential = await signInWithPopup(
      this.auth,
      this.googleAuthProvider
    );
    const user = userCredential.user;
    // return this.http.post(`${this.apiURL}/auth/login`, userData);
  }
  async logout() {
    await signOut(this.auth);
  }

  async sendPasswordResetEmail(email: string) {
    await sendPasswordResetEmail(this.auth, email);
  }
}
