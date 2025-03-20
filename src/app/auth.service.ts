// auth.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; // Correct import

interface TokenPayload {
  [key: string]: any;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    
    if (!token) return null;

    try {
      const decoded: TokenPayload = jwtDecode(token); // Use jwtDecode instead of jwt_decode
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
