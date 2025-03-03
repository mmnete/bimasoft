import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  apiUrl = environment.apiUrl;
  apiKey = environment.apiKey; // Securely injected API key

  constructor(private http: HttpClient) {}

  // Method to create a new organization
  createOrganization(organizationData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
      'x-api-key': this.apiKey, // Attach API key in headers
    });

    return this.http.post(`${this.apiUrl}/add-organization`, organizationData, {
      headers,
    });
  }

  approveCompany(id: number, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
      'x-api-key': this.apiKey, // Attach API key in headers
    });

    const body = {
      organization_id: id,
      dev_password: password, // Password to authorize the approval
    };

    return this.http.post(`${this.apiUrl}/approve-company`, body, {
      headers,
    });
  }

  // Method to fetch the list of pending companies
  fetchPendingCompanies(): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey, // Attach API key in headers
    });

    return this.http.get(`${this.apiUrl}/pending-companies`, { headers });
  }

  // Method to update an existing organization
  deleteOrganization(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey, // Attach API key in headers
    });

    return this.http.delete(`${this.apiUrl}/remove-organization/${id}`, {
      headers,
    });
  }
}
