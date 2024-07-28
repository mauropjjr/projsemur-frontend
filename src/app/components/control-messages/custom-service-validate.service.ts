import { Injectable } from '@angular/core';

@Injectable()
export class CustomServiceValidateService {

  constructor() { }

  static customMensageService(errors: any, formControl: any) {
    let objeto = errors;
    let campos = Object.keys(errors);
    campos.forEach(campo => {
      let erros = objeto[campo];
      let erro = Object.keys(errors[campo]);
      if (formControl.controls[campo]) {
        formControl.controls[campo].setErrors({ customService: erros[erro[0]] });
      }
    });
  }

  static customMensageServiceItens(errors: any, formControl: any, segundoNivel = '') {
    let itens = Object.keys(errors);
    itens.forEach((i: any) => {
      //itens.forEach((i: any, keyCampo: any) => {

      //Primeiro nível
      let campos = Object.keys(errors[i]);
      campos.forEach((campo: any) => {
        let erros = errors[i][campo];
        let erro = Object.keys(errors[i][campo]);
        let msg = erros[erro[0]];

        if (formControl.controls[i].controls[campo]) {
          formControl.controls[i].controls[campo].setErrors({ customService: msg });
        }

        //Segundo nível
        if (campo == segundoNivel) {
          this.customMensageService(errors[i][segundoNivel], formControl.controls[i].controls[campo]);
        }
      });

    });
  }

}
