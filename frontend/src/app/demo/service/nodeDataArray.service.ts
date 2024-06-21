import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Node } from '../interfaces/Node';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  private BASE_URL = 'http://localhost:3000/node';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Node[]> {
    return this.http.get<Node[]>(this.BASE_URL);
  }

  findOne(id: number): Observable<Node> {
    return this.http.get<Node>(`${this.BASE_URL}/${id}`);
  }

  create(node: Node): Observable<Node> {
    return this.http.post<Node>(this.BASE_URL, node);
  }

  update(id: number, node: Node): Observable<Node> {
    return this.http.patch<Node>(`${this.BASE_URL}/${id}`, node);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
  findByVersionId(versionId: number): Observable<Node[]> {
    return this.http.get<Node[]>(`${this.BASE_URL}/version/${versionId}`);
  }
}
