import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formulaire } from '../interfaces/Formulaire';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {
  private BASE_URL = 'http://localhost:3000/formulaire';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Formulaire[]> {
    return this.http.get<Formulaire[]>(this.BASE_URL);
  }

  findOne(id: number): Observable<Formulaire> {
    return this.http.get<Formulaire>(`${this.BASE_URL}/${id}`);
  }

  create(formulaire: Formulaire): Observable<Formulaire> {
    return this.http.post<Formulaire>(this.BASE_URL, formulaire);
  }

  update(id: number, formulaire: Formulaire): Observable<Formulaire> {
    return this.http.patch<Formulaire>(`${this.BASE_URL}/${id}`, formulaire);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
