import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SqlToObjectComponent } from './pages/sql-to-object/sql-to-object.component';
import { JsonToSqlTableComponent } from './pages/json-to-sql-table/json-to-sql-table.component';

const routes: Routes = [
    { path: '', component: SqlToObjectComponent },
    { path: 'json-to-sql-table', component: JsonToSqlTableComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
    SqlToObjectComponent,
    JsonToSqlTableComponent
]