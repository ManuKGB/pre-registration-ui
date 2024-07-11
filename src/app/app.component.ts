import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ServicesService } from '../services.service';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';

import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CountdownModule,
    ReactiveFormsModule,
    HeaderComponentComponent,
    FooterComponentComponent,
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pre-registration-ui';
  base64Image: string | undefined;
  captchaForm: FormGroup;
  otpForm : FormGroup
  captchaId: any;
  form2 = false;

  constructor(private service: ServicesService) {
    this.captchaForm = new FormGroup({
      language: new FormControl('français', Validators.required),
      authentication: new FormControl('email', Validators.required),
      verifId: new FormControl(''),
      captcha: new FormControl('', Validators.required),
    });
    this.otpForm = new FormGroup({
      otp : new FormControl('',Validators.required)
    })
  }

  ngOnInit() {
    this.service.getCaptchaImage().subscribe((response: any) => {
      this.captchaId = response.captchaId;
      this.base64Image = `data:image/png;base64,${response.captchaImg}`;
    });
  }

  onSubmitCaptcha() {
    this.service
      .validateCaptcha(this.captchaId, this.captchaForm.value.captcha)
      .subscribe((response: any) => {
        if (response.challenge == 'success') {
          this.form2 = true;
          
          Swal.fire({
            position: 'top-end',
            title: 'Good job!',
            text: 'Captcha validé!',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
          });
        } else if (response.challenge == 'fail') {
          this.ngOnInit();
          this.captchaForm.get('captcha')?.setValue('');
          Swal.fire({
            position: 'top-end',
            title: 'Error!',
            text: 'Captcha incorrect!',
            icon: 'error',
            timer: 1000,
            showConfirmButton: false,
          });
        }
      });
  }

  onSubmitOTP() {
    alert()
  }
}
