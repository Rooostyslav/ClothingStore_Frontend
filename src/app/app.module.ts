import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
import { EmployeeService } from 'src/services/employee.service';
import { ProductService } from 'src/services/product.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CLOTHING_STORE_API, CLOTHING_STORE_AUTH_API } from './app-injections-tokens';
import { AuthInterceptor } from 'src/interseptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    EmployeeService,
    ProductService,
    { provide: CLOTHING_STORE_API, useValue: environment.clothingStoreApi },
    { provide: CLOTHING_STORE_AUTH_API, useValue: environment.clothingStoreAuthApi },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
