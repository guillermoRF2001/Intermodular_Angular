import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coche } from '../models/coche.model';

@Injectable({
  providedIn: 'root',
})
export class CocheService {
  private apiUrl = 'http://localhost:8080/api/coches';

  constructor(private http: HttpClient) {}

  listarCoches(): Observable<Coche[]> {
    return this.http.get<Coche[]>(this.apiUrl);
  }

  obtenerCoche(id: number): Observable<Coche> {
    return this.http.get<Coche>(`${this.apiUrl}/${id}`);
  }

  guardarCoche(coche: Coche): Observable<Coche> {
    return this.http.post<Coche>(this.apiUrl, coche);
  }


  actualizarCoche(id: number, coche: Coche): Observable<Coche> {
    return this.http.put<Coche>(`${this.apiUrl}/${id}`, coche);
  }

  eliminarCoche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}