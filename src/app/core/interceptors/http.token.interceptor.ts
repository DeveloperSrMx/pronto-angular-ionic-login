import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtProvider } from '../providers/jwt.provider';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtProvider: JwtProvider) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

      /* const token = this.jwtProvider.tokenJWT; 

      if (token && req.url.includes('mock',0)) {

      }else if(token && !req.url.includes('auth',0)){
        headersConfig['X-access-token'] = token;
      }
  */ 
      const request = req.clone({ setHeaders: headersConfig });
      return next.handle(request);


  }
}
