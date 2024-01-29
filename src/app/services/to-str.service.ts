import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrServices {

  constructor(private toastr: ToastrService) { }

  success(message) {
    this.toastr.success(message);
  }

  warning(message){
    this.toastr.warning(message);
  }

  info(message){
    this.toastr.info(message);
  }

  error(message){
    this.toastr.error(message);
  }
}
