import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Method to create a new organization
  createOrganization(organizationData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
    });

    return this.http.post(`${this.apiUrl}/add-organization`, organizationData, {
      headers,
    });
  }

  // Method to update an existing organization
  deleteOrganization(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-organization/${id}`);
  }
}
