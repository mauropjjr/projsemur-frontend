import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, GutterDirective, RowComponent } from '@coreui/angular';
import {  ToastrService } from 'ngx-toastr';
import { ExigenciaService } from 'src/app/services/exigencia.service';
import { ControlListErrorMessagesComponent } from "../../../components/control-list-error-messages/control-list-error-messages.component";

@Component({
  selector: 'app-projetos-form',
  
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
  templateUrl: './projetos-form.component.html',
  styleUrl: './projetos-form.component.scss'
})
export class ProjetosFormComponent implements OnChanges {
  form!: FormGroup;
  submitted = false;
  errors: any;
  @Output() fechar: EventEmitter<any> = new EventEmitter();
  @Input() editar: any;

  constructor(
    private formBuilder: FormBuilder,
    private exogenciaService: ExigenciaService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {



    
    //this.toastr.success('Hello world!', 'Toastr fun!');
    this.createForm();
      //  if (this.route.snapshot.params['id'] != null) {

      // this.produtoService.getId(this.route.snapshot.params['id']).subscribe((data: any) => {
      //   if (data) {
      //     this.form.patchValue(data);
      //   }
      // });

    //}
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
        ordem: [], // ['', [Validators.required]]
  
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
          this.exogenciaService.save(data).subscribe((data: any) => {
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
