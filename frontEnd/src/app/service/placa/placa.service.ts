import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IPlaca, IPlacaCreate } from '../../components/placas/placas.model';

@Injectable({
  providedIn: 'root'
})
export class PlacaService {
  private api = 'http://localhost:3000/placa';

  constructor(private http: HttpClient) { }

  getAll(): Observable<IPlaca[]> {
    return this.http.get<IPlaca[]>(this.api);
  }  

  create(placaEntrada: IPlacaCreate): Observable<IPlaca> {
    return this.http.post<IPlaca>(this.api, placaEntrada);
  }

  update(id: number, placaEntrada: IPlaca): Observable<IPlaca> {
    return this.http.put<IPlaca>(`${this.api}/${id}`, placaEntrada);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

}
