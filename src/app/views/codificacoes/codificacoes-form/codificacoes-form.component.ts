import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, GutterDirective, RowComponent } from '@coreui/angular';
import {  ToastrService } from 'ngx-toastr';
import { ControlListErrorMessagesComponent } from "../../../components/control-list-error-messages/control-list-error-messages.component";
import { CodificacaoService } from '../../../services/codificacao.service';

@Component({
  selector: 'app-codificacoes-form',
  
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
  templateUrl: './codificacoes-form.component.html',
  styleUrl: './codificacoes-form.component.scss'
})
export class CodificacoesFormComponent implements OnChanges {
  form!: FormGroup;
  submitted = false;
  errors: any;
  @Output() fechar: EventEmitter<any> = new EventEmitter();
  @Input() editar: any;

  constructor(
    private formBuilder: FormBuilder,
    private codificacaoService: CodificacaoService,
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
        codificacaoid: [0],
        nome: ['', [Validators.required]],
     //   version: [1],
     fatoratual: ['', [Validators.required]],
     pontobase: ['', [Validators.required]],
    pontoanalise1: 0,
    pontoanalise2: 0,
    pontoanalise3: 0,
    pontoanalise4: 0,
    pontoanalise5: 0,
    especial: 0
  
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
          this.codificacaoService.save(data).subscribe((data: any) => {
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
