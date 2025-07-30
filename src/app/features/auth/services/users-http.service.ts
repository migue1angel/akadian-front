import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { map, Observable, tap } from 'rxjs';
import { User } from 'firebase/auth';
import { ServerResponse } from '../../../shared/models/server.response';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  private readonly http = inject(HttpClient);
  private readonly apiURL = environment.apiURL;
  constructor() {}

  getProfile(): Observable<UserModel> {
    return this.http
      .get<ServerResponse>(`${this.apiURL}/users/profile`)
      .pipe(map((response) => response.data));
  }
}
