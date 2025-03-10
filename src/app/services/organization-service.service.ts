import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import * as xml2js from 'xml2js';

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

  createCustomer(customerData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
      'x-api-key': this.apiKey, // Attach API key in headers
    });
  
    return this.http.post(`${this.apiUrl}/add-customer`, customerData, {
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

  verifyMotor(motorRegistrationNumber: string): Observable<any> {
    const verifyUrl = 'https://tiramis.tira.go.tz/covernote/api/public/portal/verify';
    const body = {
      paramType: 2,
      searchParam: motorRegistrationNumber,  // Use the registration number from the request body
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY',  // Add necessary API key or other headers here
    });

    // Make the POST request using fetch and return as an Observable
    return from(
      fetch(verifyUrl, {
        method: 'POST',
        // headers: headers,
        body: JSON.stringify(body),  // Send the body as a JSON string
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to verify vehicle insurance');
          }
          return response.text();
        })
        .then(responseBody => {
          return new Promise((resolve, reject) => {
            xml2js.parseString(responseBody, { trim: true, explicitArray: false }, (err, result) => {
              if (err) {
                reject('Error parsing XML response');
              } else {
                const jsonResponse = result.Response;  // The root of the XML response is "Response"
                if (jsonResponse && jsonResponse.error === "false") {
                  resolve({
                    success: true,
                    message: 'Vehicle insurance verified successfully',
                    data: jsonResponse.data,
                  });
                } else {
                  reject({
                    success: false,
                    message: 'Vehicle is not insured or verification failed',
                  });
                }
              }
            });
          });
        })
        .catch(error => {
          throw new Error(error); // Re-throw error for Observable to catch
        })
    );
  }
}
