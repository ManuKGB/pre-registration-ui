import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrl="http://localhost:8080/api"

  constructor(private http : HttpClient) {
    
   }
   getCaptchaImage() {
    return this.http.get(this.baseUrl + '/getCaptcha');
  }

  validateCaptcha(captchaId:any,userInput:any){
    return this.http.get(this.baseUrl+"/validateCaptcha/"+captchaId+"?captchaAnswer="+userInput);
  }

}
