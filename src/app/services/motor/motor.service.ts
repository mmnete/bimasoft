import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MotorResponse } from '../../types'; // Import the MotorResponse type
import { environment } from '../../../environments/environment'; // Import environment

@Injectable({
    providedIn: 'root',
})
export class MotorService {
    private apiUrl = `${environment.apiUrl}/motor-details`; // Replace with your backend URL
    apiKey = environment.apiKey; // API key to access backend

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json', // Set the content type to JSON
            'x-api-key': this.apiKey, // Include the API key
        });
    }

    // Fetch motor details based on the name
    getMotorDetails(name: string): Observable<MotorResponse[]> {
        const headers = this.getHeaders();

        console.log('getMotorDetails');

        return this.http.get<MotorResponse[]>(`${this.apiUrl}?name=${name}`, { headers });
    }
}
