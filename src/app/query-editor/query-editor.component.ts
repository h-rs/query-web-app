import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QueryType } from '../enums/query-types.enum';
import { ICustomer } from '../interfaces/customer.interface';
import { IQuery } from '../interfaces/query.interface';
import { DataSourceService } from '../services/datasource.service';
import { finalize, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss'],
})
export class QueryEditorComponent implements OnInit {
  displayedColumns: string[] = [];
  source: ICustomer[] = [];

  editorForm: FormGroup;
  selectedOp: string;
  queryList: IQuery[] = [];
  updateMessage = new BehaviorSubject<string>('');
  loading = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataSourceService: DataSourceService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setSupportedQueryList();
  }

  getResults() {
    this.selectedOp = this.editorForm.get('query')?.value;
    if (!this.selectedOp) {
      alert('Please select a Query from the list to run.');
      return;
    }
    this.updateMessage.next('');
    this.loading.next(true);
    switch (this.selectedOp) {
      case QueryType.Select_Customers:
        this.getCustomers();
        break;
      case QueryType.Select_Products:
        this.getProducts();
        break;
      case QueryType.Select_Suppliers:
        this.getSuppliers();
        break;
      case QueryType.Update_Customers:
      case QueryType.Delete_Customers:
      case QueryType.Update_Products:
        this.loading.next(false);
        this.source = [];
        this.updateMessage.next(
          `You have made changes to the database. Rows affected: ${Math.floor(
            Math.random() * 10
          )}`
        );
        break;
    }
  }

  initializeForm() {
    this.editorForm = this.formBuilder.group({
      query: '',
    });
  }

  setTableColumns(): void {
    this.displayedColumns = Object.keys(this.source[0]);
  }

  getCustomers() {
    this.dataSourceService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loading.next(false))
      )
      .subscribe((data: ICustomer[]) => {
        this.source = data;
        this.setTableColumns();
      });
  }

  getProducts() {
    this.dataSourceService
      .getProducts()
      .pipe(
        take(1),
        finalize(() => this.loading.next(false))
      )
      .subscribe((data: ICustomer[]) => {
        this.source = data;
        this.setTableColumns();
      });
  }

  getSuppliers() {
    this.dataSourceService
      .getSuppliers()
      .pipe(
        take(1),
        finalize(() => this.loading.next(false))
      )
      .subscribe((data: ICustomer[]) => {
        this.source = data;
        this.setTableColumns();
      });
  }

  setSupportedQueryList() {
    this.queryList = [
      {
        id: QueryType.Select_Customers,
        query: 'SELECT * FROM CUSTOMERS;',
      },
      {
        id: QueryType.Select_Products,
        query: 'SELECT * FROM PRODUCTS;',
      },
      {
        id: QueryType.Select_Suppliers,
        query: 'SELECT * FROM SUPPLIERS;',
      },
      {
        id: QueryType.Delete_Customers,
        query: `DELETE FROM CUSTOMERS WHERE contactName='Maria';`,
      },
      {
        id: QueryType.Update_Customers,
        query: `UPDATE CUSTOMERS SET companyName='Island Trading';`,
      },
      {
        id: QueryType.Update_Products,
        query: `UPDATE PRODUCTS SET unitPrice= 18
        WHERE productName = 'Tofu';`,
      },
    ];
  }

  copyQuery() {
    let queryId = this.editorForm.get('query')!.value;
    if (!queryId) {
      alert('Please select a Query from the list to copy.');
      return;
    }
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.queryList.find((q) => q.id === queryId)!.query;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  exportResults() {
    const header = Object.keys(this.source[0]);
    let csv = this.source.map((row: any) =>
      header.map((fieldName) => JSON.stringify(row[fieldName])).join(',')
    );
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, 'queryResults.csv');
  }
}
