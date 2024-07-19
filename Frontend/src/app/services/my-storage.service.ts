import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyStorageService {
storageUpdate = new EventEmitter<string>();

  constructor() { }

  public Store(key: string, value: string){

    //store element
    localStorage.setItem(key,value);

    //emit event
    this.storageUpdate.emit(value);

  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}
