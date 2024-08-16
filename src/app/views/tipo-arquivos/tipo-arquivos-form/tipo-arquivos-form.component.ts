import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, GutterDirective, RowComponent } from '@coreui/angular';
import {  ToastrService } from 'ngx-toastr';
import { TipoArquivoService } from '../../../services/tipo-arquivo.service';
import { ControlListErrorMessagesComponent } from "../../../components/control-list-error-messages/control-list-error-messages.component";

@Component({
  selector: 'app-tipo-arquivos-form',
  
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent,
    RowComponent, ColComponent,
    GutterDirective,
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CardGroupComponent,
    ReactiveFormsModule, FormsModule, FormDirective, FormFloatingDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonGroupComponent,
    ButtonDirective, ButtonDirective, NgStyle, ControlListErrorMessagesComponent],
  templateUrl: './tipo-arquivos-form.component.html',
  styleUrl: './tipo-arquivos-form.component.scss'
})
export class TipoArquivosFormComponent implements OnChanges {
  form!: FormGroup;
  submitted = false;
  errors: any;
  @Output() fechar: EventEmitter<any> = new EventEmitter();
  @Input() editar: any;

  constructor(
    private formBuilder: FormBuilder,
    private tipoArquivoService: TipoArquivoService,
    private toastr: ToastrService

  ) {


    this.createForm();

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['editar'] && this.editar != null) {
      this.form.patchValue(this.editar);
    }
  }
    get getForms() {
      return this.form.controls;
    }
    createForm() {
      this.form = this.formBuilder.group({
        id: [],
        nome: ['', [Validators.required]],
     //   version: [1],
        extension: ['', [Validators.required]],
        ativo: true
  
      }
      );
    }
  
  
    onValidate() {
      this.submitted = true;
      return this.form.status === "VALID";
    }
  
    onReset() {
      this.submitted = false;
      this.errors = null;
      this.form.reset();
      this.createForm();
      this.fechar.emit(true);
    }
    onSubmit() {
      if (this.onValidate()) {         
        const data = this.form.value;
        if (this.form.dirty) {
          data.ativo = data.ativo? 1 : 0;
          this.tipoArquivoService.save(data).subscribe((data: any) => {
            this.toastr.success('Salvo com sucesso!', 'Sucesso');
            this.onReset();
          }, (error: { error: any; }) => {
            this.errors = error.error.errors;
            
          });
        }
      } else {
        this.toastr.warning('Por favor verifique os campos obrigatórios!', 'Atenção');
      }
  
    }
  }
