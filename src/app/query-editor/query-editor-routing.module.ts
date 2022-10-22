import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryEditorComponent } from './query-editor.component';

const routes: Routes = [
  {
    path: 'query-editor',
    component: QueryEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryEditorRoutingModule {}
