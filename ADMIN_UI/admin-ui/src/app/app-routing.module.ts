import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
const routes: Routes = [
  { path: 'admin_form', component: AdminComponent },
  { path: 'admin_edit/:id', component: AdminEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AdminComponent, AdminEditComponent]