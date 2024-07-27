import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, GutterDirective, RowComponent } from '@coreui/angular';
import {  ToastrService } from 'ngx-toastr';

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
    ReactiveFormsModule, FormsModule, FormDirective,FormFloatingDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonGroupComponent, 
    ButtonDirective,ButtonDirective, NgStyle],
  templateUrl: './projetos-form.component.html',
  styleUrl: './projetos-form.component.scss'
})
export class ProjetosFormComponent {
  form!: FormGroup;
  submitted = false;
  errors: any;
  @Output() fechar: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {



    
    //this.toastr.success('Hello world!', 'Toastr fun!');
    this.createForm();
        if (this.route.snapshot.params['id'] != null) {

      // this.produtoService.getId(this.route.snapshot.params['id']).subscribe((data: any) => {
      //   if (data) {
      //     this.form.patchValue(data);
      //   }
      // });

    }
  }
    get getForms() {
      return this.form.controls;
    }
    createForm() {
      this.form = this.formBuilder.group({
        id: [],
        nome: ['', [Validators.required]],
        ativo: [true],
  
      }
      );
    }
  
  
    onValidate() {
      this.submitted = true;
      return this.form.status === "VALID";
    }
  
    onReset() {
      this.submitted = false;
      this.form.reset();
    }
    onSubmit() {
      if (this.onValidate()) {         
        const data = this.form.value;
        if (this.form.dirty) {
          // this.produtoService.save(data).subscribe((data: any) => {
          //   this.toastr.success('Salvo com sucesso!', 'Sucesso');
          //   this.fechar.emit(true);
          // }, (error: { error: any; }) => {
          //   this.errors = error.error;
            
          // });
        }
      } else {
        this.toastr.warning('Por favor verifique os campos obrigatórios!', 'Atenção');
      }
  
    }
  }