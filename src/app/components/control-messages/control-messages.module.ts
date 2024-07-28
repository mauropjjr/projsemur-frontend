import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages.component';
import { CustomServiceValidateService } from './custom-service-validate.service';
import { ValidationService } from './validation.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ControlMessagesComponent],
  exports: [ControlMessagesComponent],
  providers: [ValidationService, CustomServiceValidateService]
})
export class ControlMessagesModule { }
