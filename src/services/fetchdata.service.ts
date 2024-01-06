import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchdataService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://backend-ten-topaz.vercel.app';
  scrapeCompanyData(companyName: string): Observable<any> {
    const url = `${this.apiUrl}/scrape/${encodeURIComponent(companyName)}`;
    return this.http.get<any>(url);
  }
}
