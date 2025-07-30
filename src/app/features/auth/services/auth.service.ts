import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterModel } from '../models/register.model';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';
import { UsersHttpService } from './users-http.service';
import { ServerResponse } from '../../../shared/models/server.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = getAuth();
  private readonly http = inject(HttpClient);
  private readonly userHttpService = inject(UsersHttpService);
  private readonly googleProvider = new GoogleAuthProvider();
  private readonly apiURL = environment.apiURL;

  private readonly _user = signal<UserModel | null>(null);
  public readonly user = computed(() => this._user());

  constructor() {
    this.listenToAuthChanges();
  }

  async register(model: RegisterModel) {
    const { email, password, username } = model;

    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user) throw new Error('Fallo al crear el usuario en Firebase');

    try {
      await updateProfile(user, { displayName: username });
      await sendEmailVerification(user);

      const userData = this.mapFirebaseUserToDTO(user);

      await firstValueFrom(
        this.http.post<ServerResponse>(`${this.apiURL}/auth/register`, userData)
      );
    } catch (error) {
      await user.delete();
      throw error;
    }
  }

  async login(model: LoginModel) {
    const { email, password } = model;
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async googleLogin() {
    try {
      const credential = await signInWithPopup(this.auth, this.googleProvider);
      const userData = this.mapFirebaseUserToDTO(credential.user);
      return firstValueFrom(
        this.http.post(`${this.apiURL}/auth/google-login`, userData)
      );
    } catch (error) {
      this.auth.currentUser?.delete();
      throw error;
    }
  }

  async logout() {
    return signOut(this.auth);
  }

  async sendPasswordResetEmail(email: string) {
    return firebaseSendPasswordResetEmail(this.auth, email);
  }

  async getUserProfile() {
    const profile = await firstValueFrom(this.userHttpService.getProfile());
    this._user.set(profile);
  }

  private listenToAuthChanges() {
    onAuthStateChanged(this.auth, async (user) => {
      if (!user) {
        this._user.set(null);
        return;
      }
      try {
        await this.getUserProfile();
      } catch {
        this._user.set(null);
      }
    });
  }

  private mapFirebaseUserToDTO(user: FirebaseUser) {
    return {
      username: user.displayName,
      email: user.email,
      firebaseId: user.uid,
      profileImage: user.photoURL,
    };
  }
}
