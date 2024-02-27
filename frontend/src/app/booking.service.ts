import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:3000/book'; // Replace with your Node.js backend URL

  constructor(private http: HttpClient) { }

  bookMatch(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
