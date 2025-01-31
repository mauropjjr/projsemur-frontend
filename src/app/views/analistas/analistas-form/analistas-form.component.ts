import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, GutterDirective, RowComponent, TableDirective } from '@coreui/angular';
import {  ToastrService } from 'ngx-toastr';
import { ControlListErrorMessagesComponent } from "../../../components/control-list-error-messages/control-list-error-messages.component";
import { AnalistaService } from '../../../services/analista.service';

@Component({
  selector: 'app-analistas-form',
  
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
  templateUrl: './analistas-form.component.html',
  styleUrl: './analistas-form.component.scss'
})
export class AnalistasFormComponent implements OnChanges {
  form!: FormGroup;
  submitted = false;
  errors: any;
  remessas: any[] = [];
  @Output() fechar: EventEmitter<any> = new EventEmitter();
  @Input() editar: any;

  constructor(
    private formBuilder: FormBuilder,
    private analistaService: AnalistaService,
    private toastr: ToastrService

  ) {


    this.createForm();

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['editar'] && this.editar != null) {
      this.form.patchValue(this.editar);
      this.analistaService.getId(this.editar.id).subscribe((data: any) => {
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
        nome: ['', [Validators.required]],
     //   version: [1],
     legenda: ['', [Validators.required]],
     flagativo: true
  
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
          data.flagativo = data.flagativo? 1 : 0;
          this.analistaService.save(data).subscribe((data: any) => {
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
