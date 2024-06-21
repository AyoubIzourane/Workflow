import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Element } from '../interfaces/Element';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private BASE_URL = 'http://localhost:3000/element';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Element[]> {
    return this.http.get<Element[]>(this.BASE_URL);
  }

  findOne(id: number): Observable<Element> {
    return this.http.get<Element>(`${this.BASE_URL}/${id}`);
  }

  create(element: Element): Observable<Element> {
    return this.http.post<Element>(this.BASE_URL, element);
  }

  update(id: number, element: Element): Observable<Element> {
    return this.http.patch<Element>(`${this.BASE_URL}/${id}`, element);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
  findByVersionId(versionId: number): Observable<Element[]> {
    return this.http.get<Element[]>(`${this.BASE_URL}/version/${versionId}`);
  }
}
