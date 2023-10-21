import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PasswordChangeMockService {
  changePassword(data: any): Observable<any> {
    // conectar com a rota no backend quando pronta
    return of({ status: 200, message: 'Password changed successfully' });
  }
}
