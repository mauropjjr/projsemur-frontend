import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { AlertModule } from '@coreui/angular';

@Component({
  selector: 'app-control-list-error-messages',
  standalone: true,
  templateUrl: './control-list-error-messages.component.html',
  styleUrls: ['./control-list-error-messages.component.scss'],
  imports: [CommonModule, AlertModule]
})
export class ControlListErrorMessagesComponent implements OnInit {

  @Input() errors: any;

  constructor() { }

  ngOnInit() {
  }

  get listErros() {
    if(this.errors){
      return this.getTratarListaErros(this.errors);
    }
    return [];
  }

  getTratarListaErros(errors: any = []) {
    let objErrors = errors;
    let keyCampos = Object.keys(errors);
    const listErros: { campo: string; validate: string; msg: string; erroMsg: string }[] = [];
    keyCampos.forEach(keyCampo => {
      let erros = objErrors[keyCampo];
      let errosField = Object.keys(errors[keyCampo]);      

      errosField.forEach(funcValidate => {
        let erroMsg: any = erros[funcValidate];
        listErros.push({'campo': keyCampo, 'validate': funcValidate, 'msg': `${keyCampo}: ${erroMsg}`, 'erroMsg': erroMsg });
      });

    });
    return listErros;
  }

}
