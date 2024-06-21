import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workflow } from '../interfaces/Workflow';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  BASE_URL: string = 'http://localhost:3000';
  tokenKey: string = 'token'; // Key for storing token in local storage

  constructor(private http: HttpClient) { }

  findAll(): Observable<Workflow[]>{
    return this.http.get<Workflow[]>(`${this.BASE_URL}/workflow`);
  }

  findOne(id: number): Observable<Workflow>{
    return this.http.get<Workflow>(`${this.BASE_URL}/workflow/${id}`);
  }

  create(workflow: Workflow): Observable<Workflow> {
    return this.http.post<Workflow>(`${this.BASE_URL}/workflow`, workflow);
  }

  update(id: number, workflow: Workflow): Observable<Workflow> {
    return this.http.patch<Workflow>(`${this.BASE_URL}/workflow/${id}`, workflow);
  }

  delete(id: number): Observable<Workflow> {
    return this.http.delete<Workflow>(`${this.BASE_URL}/workflow/${id}`);
  }

  
}
