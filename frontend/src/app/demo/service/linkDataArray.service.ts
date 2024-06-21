import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from '../interfaces/Link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private BASE_URL = 'http://localhost:3000/link';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Link[]> {
    return this.http.get<Link[]>(this.BASE_URL);
  }

  findOne(id: number): Observable<Link> {
    return this.http.get<Link>(`${this.BASE_URL}/${id}`);
  }

  create(link: Link): Observable<Link> {
    return this.http.post<Link>(this.BASE_URL, link);
  }

  update(id: number, link: Link): Observable<Link> {
    return this.http.patch<Link>(`${this.BASE_URL}/${id}`, link);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
  findByVersionId(versionId: number): Observable<Link[]> {
    return this.http.get<Link[]>(`${this.BASE_URL}/version/${versionId}`);
  }
}
