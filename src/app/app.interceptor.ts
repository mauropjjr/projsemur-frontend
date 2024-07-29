import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
//import { SessaoService } from './sessao.service';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor {
  private apiUrl = 'http://10.0.0.146:5089/api/';
  
  
  constructor(
    private toastr: ToastrService,
  //  private sessaoService: SessaoService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const api_key = ''; //this.sessaoService.get('Token') || '';
    const currentRoute = this.router.url;

    const cloneReq = request.clone({
      url: `${this.apiUrl}${request.url}`,
      headers: request.headers.set('Authorization', `Basic ${api_key}`)
    });

    return next.handle(cloneReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!(error.error instanceof ErrorEvent)) {
          switch (error.status) {
            case 401:
              this.toastr.warning('Login ou Senha inválido!');
              if (currentRoute !== '/login') {
               // this.router.navigate(['/login']);
              //  this.sessaoService.limparSessao();
              }
              break;
            case 400:
              this.toastr.error('Confira os campos obrigatórios', 'Atenção');
              break;
            case 500:
              this.toastr.error(`Erro no servidor: ${error.status} ${error.statusText}`);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
