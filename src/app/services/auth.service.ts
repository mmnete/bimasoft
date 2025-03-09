import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
    message: string;
    user: {
        uid: string;
        email: string;
        organization_id: string;
    };
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiUrl = environment.apiUrl;
    apiKey = environment.apiKey; // Securely injected API key

    constructor(private http: HttpClient) { }

    // Login method to send the credentials to backend and store the token in localStorage
    login(user_email: string, user_password: string): Observable<LoginResponse> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json', // Set the content type to JSON
            'x-api-key': this.apiKey, // Attach API key in headers
        });

        const body = {
            email: user_email,
            password: user_password, // Password to authorize the approval
        };

        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body, {
            headers,
        });
    }

    getUserInfo(): any {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    // Store the token in localStorage
    storeToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    // Get the token from localStorage
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    storeUserDetails(loginDetails: any): void {
        localStorage.setItem('loginDetails', JSON.stringify(loginDetails));
    }
    
    getUserDetails(): any | null {
        const data = localStorage.getItem('loginDetails');
        return data ? JSON.parse(data) : null;
    }

    // Check if the user is logged in by verifying if the token exists in localStorage
    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    // Get the current user info by sending the token to the backend
    getCurrentUser(): Observable<any> {
        const token = this.getToken();
        if (!token) {
            throw new Error('No token found');
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json', // Set the content type to JSON
            'x-api-key': this.apiKey,
            'Authorization': `Bearer ${token}`,
        });
        return this.http.get<any>(`${this.apiUrl}/check-logged-in`, { headers });
    }

    // Logout the user by removing the token from localStorage
    logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            const loginDetails = this.getUserDetails();

            // Define HTTP headers for the request
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',  // Set the content type to JSON
                'x-api-key': this.apiKey,  // Attach API key in headers
            });

            // Define the body of the request
            const body = {
                email: loginDetails.user.email,
            };

            // Send the logout request
            this.http.post<LoginResponse>(`${this.apiUrl}/logout`, body, { headers })
                .subscribe(
                    (response) => {
                        // Handle successful response
                        console.log('User logged out successfully');

                        // Clear local storage after successful logout
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('loginDetails');

                        // Resolve the promise indicating success
                        resolve();
                    },
                    (error) => {
                        // Handle error if logout fails
                        console.error('Logout failed:', error);

                        // Reject the promise if logout fails
                        reject(new Error('Logout failed. Please try again later.'));
                    }
                );
        });
    }
}
