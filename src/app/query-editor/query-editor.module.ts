import { NgModule } from '@angular/core';
import { QueryEditorComponent } from './query-editor.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QueryEditorRoutingModule } from './query-editor-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [QueryEditorComponent],
  imports: [
    QueryEditorRoutingModule,
    MatCardModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
})
export class QueryEditorModule {}
