import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BadgeComponent, ButtonDirective, ButtonGroupComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormFloatingDirective, FormLabelDirective, FormSelectDirective, GutterDirective, RowComponent, TableDirective } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { ControlListErrorMessagesComponent } from "../../../components/control-list-error-messages/control-list-error-messages.component";
import { AreasReceptoraService } from '../../../services/areas-receptora.service';


@Component({
  selector: 'app-areas-receptoras-form',

  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent,
    RowComponent, ColComponent,
    GutterDirective,
    FormSelectDirective,
    CardHeaderComponent,
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CardGroupComponent,
    TableDirective,
    ReactiveFormsModule, FormsModule, FormDirective, FormFloatingDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonGroupComponent,
    ButtonDirective, ButtonDirective, NgStyle, ControlListErrorMessagesComponent],
  templateUrl: './areas-receptoras-form.component.html',
  styleUrl: './areas-receptoras-form.component.scss'
})
export class AreasReceptorasFormComponent implements OnChanges {
  form!: FormGroup;
  submitted = false;
  errors: any;
  @Output() fechar: EventEmitter<any> = new EventEmitter();
  @Input() editar: any;

  constructor(
    private formBuilder: FormBuilder,
    private areasReceptoraService: AreasReceptoraService,
    private toastr: ToastrService

  ) {


    this.createForm();

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['editar'] && this.editar != null) {
      this.editar.ativo = this.editar.ativo == 1 ;
      this.form.patchValue(this.editar);
      // this.areasReceptoraService.getId(this.editar.id).subscribe((data: any) => {
      //   this.remessas = data?.remessas || [];
      // })
    }
  }
  get getForms() {
    return this.form.controls;
  }
  createForm() {
    this.form = this.formBuilder.group({
      id: [0], // Campo não obrigatório
      nome: ['', [Validators.required]], // Campo obrigatório
      tipo: [0, [Validators.required]], // Campo obrigatório
      numerolicenca: ['', [Validators.required]], // Campo obrigatório
      regiao: ['', [Validators.required]], // Campo obrigatório
      endereco: [''], // Campo não obrigatório
      numero: [null], // Campo não obrigatório
      bairro: [''], // Campo não obrigatório
      telefone: [''], // Campo não obrigatório
      latitude: [{ value: "", disabled: true }], // Desabilitado
      longitude: [{ value: "", disabled: true }], // Desabilitado
      ativo: [true] // Campo não obrigatório
    });
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
        this.areasReceptoraService.save(data).subscribe((data: any) => {
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
