import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AdminService } from './services/admin.services';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component'
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    MatIconModule,
  ],
  providers: [AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
