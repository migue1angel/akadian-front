import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  private readonly http = inject(HttpClient);
  private readonly apiURL = environment.apiURL;
  constructor() { }

  getProfile() {
    return this.http.get(`${this.apiURL}/users/profile`);
  }
}
