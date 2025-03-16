// src/app/services/insurance-brokers/insurance-broker.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsuranceBroker } from '../../types';
import { environment } from '../../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root',
})
export class InsuranceBrokerService {
  apiUrl = `${environment.apiUrl}/insurance/brokers`; // Base backend URL for insurance brokers
  apiKey = environment.apiKey; // API key to access backend

  constructor(private http: HttpClient) {}

  // Helper function to create headers with the API key
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
      'x-api-key': this.apiKey, // Include the API key
    });
  }

  // Get all insurance brokers
  getAllBrokers(): Observable<InsuranceBroker[]> {
    const headers = this.getHeaders();
    return this.http.get<InsuranceBroker[]>(this.apiUrl, { headers });
  }

  // Get a single insurance broker by ID
  getBrokerById(id: number): Observable<InsuranceBroker> {
    const headers = this.getHeaders();
    return this.http.get<InsuranceBroker>(`${this.apiUrl}/${id}`, { headers });
  }

  // Create a new insurance broker
  createBroker(broker: InsuranceBroker): Observable<InsuranceBroker> {
    const headers = this.getHeaders();
    return this.http.post<InsuranceBroker>(this.apiUrl, broker, { headers });
  }

  // Update an existing insurance broker
  updateBroker(id: number, broker: InsuranceBroker): Observable<InsuranceBroker> {
    const headers = this.getHeaders();
    return this.http.put<InsuranceBroker>(`${this.apiUrl}/${id}`, broker, { headers });
  }

  // Delete an insurance broker
  deleteBroker(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Search for insurance brokers
  searchBrokers(query: string): Observable<InsuranceBroker[]> {
    const headers = this.getHeaders();
    return this.http.get<InsuranceBroker[]>(`${this.apiUrl}/search`, {
      headers,
      params: { query }, // Pass the query as a query parameter
    });
  }

  searchBrokerFromWeb(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
      'x-api-key': this.apiKey, // Attach API key in headers
    });

    // Append query to the URL as a query parameter
    const url = `${this.apiUrl}/search-broker?query=${encodeURIComponent(query)}`;

    return this.http.get(url, { headers });
  }
}
