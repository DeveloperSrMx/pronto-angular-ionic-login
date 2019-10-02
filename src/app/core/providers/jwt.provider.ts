import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as JWT from 'jwt-decode';

@Injectable()
export class JwtProvider {

  tokenJWT: String = '';

  constructor(private storage: Storage) { }

  getToken(): Promise<any> {
    return this.storage.get('jwtToken');
  }

  saveToken(token: String) {
    this.tokenJWT = token;
    this.storage.set('jwtToken', token);
  }

  saveUserId(token: any): Promise<any>{
    this.saveToken(token);
    let userData = JWT(token);
    return this.storage.set('userId', userData['id']);
  }

  getUserId(): Promise<any> {
    return this.storage.get('userId');
  }

  destroyToken() {
    this.storage.remove('jwtToken');
  }

}
