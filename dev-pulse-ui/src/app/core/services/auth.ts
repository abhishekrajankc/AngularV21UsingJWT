import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed, effect, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'devpulse_token';
  baseUrl = 'http://localhost:7000/api/auth';

  private http = inject(HttpClient);

  private _token = signal<string | null>(localStorage.getItem(this.tokenKey)); 

  isAuthenticated = computed(() => {

    const token = this._token();

    if (!token) return false;
    return !this.istokenExpired(token);
  });

  user = computed(() => this.decodeToken(this._token()));

  constructor() {
    effect(() => {
      const token = this._token();
      if (this.istokenExpired(token)) {
        this.logout();
      }
    });
  }
  getToken() {
    return this._token();
  }
   
  login(mockToken: string) {
    localStorage.setItem(this.tokenKey, mockToken);
    this._token.set(mockToken);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this._token.set(null);
  }

  decodeToken(token: string | null): any {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    }
    catch (e) {
      return null;
    }
  }

  istokenExpired(token: string | null): boolean {
    if (!token) return true;

    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }
}
