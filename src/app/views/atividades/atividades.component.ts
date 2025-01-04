import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, PageItemDirective, PageLinkDirective, PaginationComponent, BadgeComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, TableDirective, RowComponent, ColComponent, FormControlDirective, FormDirective, FormFloatingDirective, FormLabelDirective, FormSelectDirective, GutterDirective } from '@coreui/angular';
import {AtividadesFormComponent} from './atividades-form/atividades-form.component';
import {AtividadeService} from '../../services/atividade.service';
import {PaginacaoEnum} from '../../enums/paginacao.enum';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { ControlListErrorMessagesComponent} from '../../components/control-list-error-messages/control-list-error-messages.component';
import {FloatingButtonComponent} from '../../components/floating-button/floating-button.component';
import { freeSet } from '@coreui/icons';
@Component({
  selector: 'app-atividades',
  standalone: true,
  templateUrl: './atividades.component.html',
  styleUrl: './atividades.component.scss',
  providers: [IconSetService],
  imports: [NgIf, NgFor,IconDirective ,AtividadesFormComponent
    , CommonModule, RouterLink, BadgeComponent,  
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
    FormFloatingDirective, FormControlDirective, FormLabelDirective, ReactiveFormsModule, FormsModule, FormDirective, NgStyle, FormSelectDirective, GutterDirective,
    NgxPaginationModule,
    ControlListErrorMessagesComponent,
    FloatingButtonComponent
  ]
})
export class AtividadesComponent {
  @ViewChild(AtividadesFormComponent) atividadesFormComponent!: AtividadesFormComponent;

  p = 1;
  total: any;
  buscaForm!: FormGroup;
  removeId: number | undefined;
  editar: any;
  paginacaoEnum =  PaginacaoEnum;
  atividades: any;
  modalAdd = false;
  public visible = false;
  constructor(private formBuilder: FormBuilder, private atividadeService: AtividadeService, private toastr: ToastrService,public iconSet: IconSetService) {
    iconSet.icons = { ...freeSet};
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
    this.buscar(event);
  }
  remover(){
    this.atividadeService.remove(Number(this.removeId)).subscribe(() => {
      this.toastr.success('Removido com sucesso!', 'Sucesso');
      this.removeId =  undefined;
      this.buscar(1);
    });
  }

  buscar(page: any = 1) {
    this.p = page;
    this.atividadeService.get({ pageSize: this.paginacaoEnum.Limit, pageNumber: page,campoOrdem: 'Nome', ...this.buscaForm.value }).subscribe(data => {
      this.atividades = data;
    });
  }
  editarItem(item: any){
    this.editar = item;
    this.modalAdd = true;
  }
  closeAdd(){
    this.modalAdd = false;
    this.buscar(1);
  }

}
