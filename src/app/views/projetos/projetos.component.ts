import { CommonModule, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, PageItemDirective, PageLinkDirective, PaginationComponent, BadgeComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, TableDirective, RowComponent, ColComponent, FormControlDirective, FormDirective, FormFloatingDirective, FormLabelDirective, FormSelectDirective, GutterDirective } from '@coreui/angular';
import {ProjetosFormComponent} from './projetos-form/projetos-form.component';
import {ExigenciaService} from '../../services/exigencia.service';
import {PaginacaoEnum} from '../../enums/paginacao.enum';
@Component({
  selector: 'app-projetos',
  standalone: true,
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss',
  imports: [ProjetosFormComponent, CommonModule, RouterLink, BadgeComponent,  
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
  @ViewChild(ProjetosFormComponent) projetosFormComponent!: ProjetosFormComponent;

  bancos: any;
  p = 1;
  total: any;
  buscaForm!: FormGroup;
  removeId: number | undefined;
  paginacaoEnum =  PaginacaoEnum;
  exigencias = [{id:1, nome: "teste", ativo:1},{id:2, nome: "teste efr wq eqwr wqrqrr", ativo:1}];
  modalAdd = false;
  public visible = false;
  constructor(private formBuilder: FormBuilder, private exigenciaService: ExigenciaService) {
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

  buscar(page: any = 1) {
    this.exigenciaService.get({ limit: this.paginacaoEnum.Limit, page: page, ...this.buscaForm.value }).subscribe(data => {
      this.bancos = data;
    });
  }
  closeAdd(){
    this.modalAdd = false;
  }

}
