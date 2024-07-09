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
    FooterComponentComponent
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
      email: new FormControl('', [Validators.required, Validators.email]),
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
    this.service
      .validateCaptcha(this.captchaId, this.captchaForm.value.captcha)
      .subscribe((response: any) => {
        if (response.challenge == 'success') {
          Swal.fire({
            title: 'Good job!',
            text: 'Captcha validé!',
            icon: 'success',
          });
        } else if (response.challenge == 'fail') {
          Swal.fire({
            title: 'Error!',
            text: 'Captcha incorrect!',
            icon: 'error',
          });
        }
      });
  }


}
