import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrgScraperService {
  apiUrl = environment.apiUrl;
  apiKey = environment.apiKey; // Securely injected API key

  constructor(private http: HttpClient) {}

  searchCompany(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
      'x-api-key': this.apiKey, // Attach API key in headers
    });

    // Append query to the URL as a query parameter
    const url = `${this.apiUrl}/search-company?query=${encodeURIComponent(query)}`;

    return this.http.get(url, { headers });
  }
}
