import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLOTHING_STORE_API } from 'src/app/app-injections-tokens';
import { ViewEmployee } from 'src/models/employees/view.employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeApiUrl = this.baseApiUrl + '/api/employees'

  constructor(
    private http: HttpClient, 
    @Inject(CLOTHING_STORE_API) private baseApiUrl: string
  ) { }

  getAllEmployees(): Observable<ViewEmployee[]> {
    return this.http.get<ViewEmployee[]>(this.employeeApiUrl);
  }

  getMyEmployee(): Observable<ViewEmployee> {
    return this.http.get<ViewEmployee>(this.employeeApiUrl + '/my');
  }

  getEmployeeById(employeeId: number): Observable<ViewEmployee> {
    return this.http.get<ViewEmployee>(this.employeeApiUrl + '/' + employeeId);
  }
}
