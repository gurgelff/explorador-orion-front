import { Injectable } from '@angular/core';
import { EnumStorageType } from '../common/enums/enum.storage.type.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public setItem(key: string, value: string, storage: EnumStorageType = EnumStorageType.LOCAL): void {
    window[storage].setItem(key, value); 
  }
 
  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }  

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
