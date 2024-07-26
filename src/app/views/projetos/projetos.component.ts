import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, PageItemDirective, PageLinkDirective, PaginationComponent, BadgeComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, TableDirective, RowComponent, ColComponent, FormControlDirective, FormDirective, FormFloatingDirective, FormLabelDirective, FormSelectDirective, GutterDirective } from '@coreui/angular';

@Component({
  selector: 'app-projetos',
  standalone: true,
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss',
  imports: [CommonModule, RouterLink, BadgeComponent,  
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CardGroupComponent,
    CardHeaderComponent,
    ButtonDirective,  ModalComponent, 
    ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent,PageItemDirective, PageLinkDirective, 
    TableDirective,
    PaginationComponent,
    RowComponent, ColComponent,
    FormFloatingDirective, FormControlDirective, FormLabelDirective, ReactiveFormsModule, FormsModule, FormDirective, NgStyle, FormSelectDirective, GutterDirective
  ]
})
export class ProjetosComponent {
  bancos: any;
  p = 1;
  total: any;
  buscaForm!: FormGroup;
  removeId: number | undefined;
  paginacaoEnum =  30;
  exigencias = [{id:1, nome: "teste", ativo:1},{id:2, nome: "teste efr wq eqwr wqrqrr", ativo:1}];
  public visible = false;
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.buscar();
  } 

  createForm() {
    this.buscaForm = this.formBuilder.group({
      nome: [""]

    });
  }

  openRemove(id: any){
    this.removeId = id;
  }
  onTableDataChange(event:any){

  }
  remover(){
    this.removeId = undefined;
  }

  buscar(){
    console.log(this.buscaForm.value);
  }

}
