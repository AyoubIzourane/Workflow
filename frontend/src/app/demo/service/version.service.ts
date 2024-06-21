import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Version } from '../interfaces/Version';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  BASE_URL: string = 'http://localhost:3000';
  tokenKey: string = 'token'; // Key for storing token in local storage

  constructor(private http: HttpClient) { }

  findAll(): Observable<Version[]>{
    return this.http.get<Version[]>(`${this.BASE_URL}/version`);
  }

  findOne(id: number): Observable<Version>{
    return this.http.get<Version>(`${this.BASE_URL}/version/${id}`);
  }

  create(version: Version): Observable<Version> {
    return this.http.post<Version>(`${this.BASE_URL}/version`, version);
  }

  update(id: number, version: Version): Observable<Version> {
    return this.http.patch<Version>(`${this.BASE_URL}/version/${id}`, version);
  }

  delete(id: number): Observable<Version> {
    return this.http.delete<Version>(`${this.BASE_URL}/version/${id}`);
  }

  getVersionsByWorkflowId(workflowId: number): Observable<Version[]> {
    return this.http.get<Version[]>(`${this.BASE_URL}/version/VersionsByWorkflowId/${workflowId}`);
  }

  updateVersionWithDetails(id: number, version: Version): Observable<Version> {
    return this.http.post<Version>(`${this.BASE_URL}/version/${id}`, version);
  }

}
