import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from './validation.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-control-messages',
  standalone: true,
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css'],
  imports: [ReactiveFormsModule, FormsModule, NgIf],
})
export class ControlMessagesComponent {

  @Input() control: FormControl | undefined;

  constructor() {


  }

  get errorMessage() {
    if (this.control !== undefined) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || propertyName === "customService")) {
          return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        }
      }
    }

    return null;
  }

}
