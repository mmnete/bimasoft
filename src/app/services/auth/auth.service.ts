// src/app/services/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse, UserDetails } from '../../types'; // Assuming UserDetails is defined in your types

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Base backend URL
  private apiKey = environment.apiKey; // API key for authentication

  constructor(private http: HttpClient) {}

  // Helper function to create headers with the API key
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
      'x-api-key': this.apiKey, // Include the API key
    });
  }

  /**
   * Log in a user by sending credentials to the backend.
   * @param email - User email
   * @param password - User password
   * @returns Observable with login response
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const headers = this.getHeaders();
    const body = { email, password };

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body, { headers });
  }

  /**
   * Log out the user by removing the token and user details from localStorage.
   * @returns Promise indicating success or failure
   */
  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      const userDetails = this.getUserDetails();

      if (!userDetails) {
        this.clearLocalStorage();
        resolve();
        return;
      }

      const headers = this.getHeaders();
      const body = { email: userDetails.email };

      this.http.post(`${this.apiUrl}/logout`, body, { headers }).subscribe(
        () => {
          this.clearLocalStorage(); // Clear local storage on successful logout
          resolve();
        },
        (error) => {
          console.error('Logout failed:', error);
          reject(new Error('Logout failed. Please try again later.'));
        }
      );
    });
  }

  /**
   * Store the authentication token in localStorage.
   * @param token - Authentication token
   */
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Retrieve the authentication token from localStorage.
   * @returns Authentication token or null if not found
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Store user details in localStorage.
   * @param userDetails - User details to store
   */
  storeUserDetails(loginResponse: LoginResponse): void {
    localStorage.setItem('userDetails', JSON.stringify(loginResponse.user));
  }

  /**
   * Retrieve user details from localStorage.
   * @returns User details or null if not found
   */
  getUserDetails(): UserDetails | null {
    const data = localStorage.getItem('userDetails');
    return data ? JSON.parse(data) : null;
  }

  /**
   * Check if the user is logged in by verifying the presence of a token.
   * @returns True if the user is logged in, false otherwise
   */
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Fetch the current user's information from the backend.
   * @returns Observable with user information
   */
  getCurrentUser(): Observable<UserDetails> {
    const token = this.getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const headers = this.getHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserDetails>(`${this.apiUrl}/check-logged-in`, { headers });
  }

  /**
   * Clear all authentication-related data from localStorage.
   */
  private clearLocalStorage(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
  }
}