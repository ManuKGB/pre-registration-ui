import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrl="https://captcha-web-service.onrender.com/api/captcha"

  constructor(private http : HttpClient) {
    
   }
   getCaptchaImage() {
    return this.http.get(this.baseUrl + '/create');
  }

  validateCaptcha(captchaId:any,userInput:any){
    return this.http.get(this.baseUrl+"/validate/"+captchaId+"?captchaAnswer="+userInput);
  }

}
