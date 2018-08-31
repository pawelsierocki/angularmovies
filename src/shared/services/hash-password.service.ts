import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class HashPasswordService {

  constructor() { }

  hashPassword(password: string){
    return Md5.hashStr(password);
  }
}
