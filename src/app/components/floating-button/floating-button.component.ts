import { Component, Input } from '@angular/core';
//import { SessaoService } from 'src/app/services/sessao.service';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {
@Input() vertical: 'top' | 'bottom' = 'top';
@Input() horizontal: 'start' | 'end' = 'end';
@Input() buttonColor: string = 'primary'; // Valor padrão é 'primary'

tipoPerfil: string = '';

// Mapeamento de cores para classes de estilo do CoreUI
colorStyles: { [key: string]: string } = {
  primary: 'btn-primary',
  danger: 'btn-danger',
  info: 'btn-info',
  warning: 'btn-warning',
  secundary: 'btn-secundary',
  default: 'btn-default',
  // Adicione mais cores e classes de estilo conforme necessário
};

showList = false;

// constructor(private sessaoService: SessaoService) {
//   this.tipoPerfil = this.sessaoService.getUsuarioPerfil();
// }

toggleList() {
  this.showList = !this.showList;
}

getButtonColorStyle() {
  return this.colorStyles[this.buttonColor] || 'btn-primary'; // Use 'btn-primary' como padrão se a cor não estiver mapeada
}
}
