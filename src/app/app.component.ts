import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
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
  captchaId: any;

  constructor(private service: ServicesService) {
    this.captchaForm = new FormGroup({
      language: new FormControl('français', Validators.required),
      authentication: new FormControl('email', Validators.required),
      verifId: new FormControl(''),
      captcha: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.service.getCaptchaImage().subscribe((response: any) => {
      this.captchaId = response.captchaId;
      this.base64Image = `data:image/png;base64,${response.captchaImg}`;
    });
  }

  onSubmit() {
    
    if (this.captchaForm.valid) {
      this.service
      .validateCaptcha(this.captchaId, this.captchaForm.value.captcha)
      .subscribe((response: any) => {
        if (response.challenge == 'success') {
          console.log("email to send to "+this.captchaForm.value.verifId);
          Swal.fire({
            position: 'top-end',
            title: 'Good job!',
            text: 'Captcha validé!',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
          });
        } else if (response.challenge == 'fail') {
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
    }else{
      Swal.fire({
        position: 'top-end',
        title: 'Error!',
        text: 'Verifier les champs !',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false,
      });
    }
   
  }
}
