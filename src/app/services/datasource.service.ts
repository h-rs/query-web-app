import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(
      'https://jsonblob.com/api/jsonBlob/1032616998282215424'
    );
  }

  getProducts(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(
      'https://jsonblob.com/api/jsonBlob/1032666564524261376'
    );
  }

  getSuppliers(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(
      'https://jsonblob.com/api/jsonBlob/1032972081956143104'
    );
  }
}
