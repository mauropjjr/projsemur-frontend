import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, GutterDirective, RowComponent, TableDirective } from '@coreui/angular';
import {  ToastrService } from 'ngx-toastr';
import { ControlListErrorMessagesComponent } from "../../../components/control-list-error-messages/control-list-error-messages.component";
import { AtividadeService } from '../../../services/atividade.service';


@Component({
  selector: 'app-atividades-form',
  
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent,
    RowComponent, ColComponent,
    GutterDirective,
    CardHeaderComponent,
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CardGroupComponent,
    TableDirective,
    ReactiveFormsModule, FormsModule, FormDirective, FormFloatingDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonGroupComponent,
    ButtonDirective, ButtonDirective, NgStyle, ControlListErrorMessagesComponent],
  templateUrl: './atividades-form.component.html',
  styleUrl: './atividades-form.component.scss'
})
export class AtividadesFormComponent implements OnChanges {
  form!: FormGroup;
  submitted = false;
  errors: any;
  remessas: any[] = [];
  @Output() fechar: EventEmitter<any> = new EventEmitter();
  @Input() editar: any;

  constructor(
    private formBuilder: FormBuilder,
    private atividadeService: AtividadeService,
    private toastr: ToastrService

  ) {


    this.createForm();

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['editar'] && this.editar != null) {
      this.form.patchValue(this.editar);
      this.atividadeService.getId(this.editar.id).subscribe((data: any) => {
        this.remessas = data?.remessas || [];
      })
    }
  }
    get getForms() {
      return this.form.controls;
    }
    createForm() {
      this.form = this.formBuilder.group({
        id: [0],
        nome: ['', [Validators.required]]
  
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
          this.atividadeService.save(data).subscribe((data: any) => {
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
