import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntitePrimaire } from '../interfaces/EntitePrimaire';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntitePrimaireService {
  BASE_URL: string = 'http://localhost:3000';
  tokenKey: string = 'token'; // Key for storing token in local storage

  constructor(private http: HttpClient) { }

  findAll(): Observable<EntitePrimaire[]>{
    return this.http.get<EntitePrimaire[]>(`${this.BASE_URL}/entitePrimaire`);
  }

  findOne(id: number): Observable<EntitePrimaire>{
    return this.http.get<EntitePrimaire>(`${this.BASE_URL}/entitePrimaire/${id}`);
  }

  create(entitePrimaire: EntitePrimaire): Observable<EntitePrimaire> {
    return this.http.post<EntitePrimaire>(`${this.BASE_URL}/entitePrimaire`, entitePrimaire);
  }

  update(id: number, entitePrimaire: EntitePrimaire): Observable<EntitePrimaire> {
    return this.http.patch<EntitePrimaire>(`${this.BASE_URL}/entitePrimaire/${id}`, entitePrimaire);
  }

  delete(id: number): Observable<EntitePrimaire> {
    return this.http.delete<EntitePrimaire>(`${this.BASE_URL}/entitePrimaire/${id}`);
  }

   getDatabaseTables(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/tables`);
  }

  getTableColumns(tableName: string): Observable<{ column_name: string, data_type: string }[]> {
    return this.http.get<{ column_name: string, data_type: string }[]>(`${this.BASE_URL}/columns/${tableName}`);
  }
  
}
