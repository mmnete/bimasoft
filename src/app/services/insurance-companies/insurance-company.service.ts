// src/app/services/insurance-companies/insurance-company.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsuranceCompany } from '../../types';
import { environment } from '../../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root',
})
export class InsuranceCompanyService {
  apiUrl = `${environment.apiUrl}/insurance/companies`; // Base backend URL for insurance companies
  apiKey = environment.apiKey; // API key to access backend

  constructor(private http: HttpClient) {}

  // Helper function to create headers with the API key
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
      'x-api-key': this.apiKey, // Include the API key
    });
  }

  // Get all insurance companies
  getAllCompanies(): Observable<InsuranceCompany[]> {
    const headers = this.getHeaders();
    return this.http.get<InsuranceCompany[]>(this.apiUrl, { headers });
  }

  // Get a single insurance company by ID
  getCompanyById(id: number): Observable<InsuranceCompany> {
    const headers = this.getHeaders();
    return this.http.get<InsuranceCompany>(`${this.apiUrl}/${id}`, { headers });
  }

  // Create a new insurance company
  createCompany(company: InsuranceCompany): Observable<InsuranceCompany> {
    const headers = this.getHeaders();
    return this.http.post<InsuranceCompany>(this.apiUrl, company, { headers });
  }

  // Update an existing insurance company
  updateCompany(id: number, company: InsuranceCompany): Observable<InsuranceCompany> {
    const headers = this.getHeaders();
    return this.http.put<InsuranceCompany>(`${this.apiUrl}/${id}`, company, { headers });
  }

  // Delete an insurance company
  deleteCompany(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Search for insurance companies
  searchCompanies(query: string): Observable<InsuranceCompany[]> {
    const headers = this.getHeaders();
    return this.http.get<InsuranceCompany[]>(`${this.apiUrl}/search`, {
      headers,
      params: { query }, // Pass the query as a query parameter
    });
  }

  searchCompanyFromWeb(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
      'x-api-key': this.apiKey, // Attach API key in headers
    });

    // Append query to the URL as a query parameter
    const url = `${this.apiUrl}/search-company?query=${encodeURIComponent(query)}`;

    return this.http.get(url, { headers });
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