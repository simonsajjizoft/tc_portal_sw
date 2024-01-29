import { Component } from '@angular/core';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from 'src/app/services/api.services';
import { Subject, takeUntil } from 'rxjs';
import { ApiConstant } from 'src/app/shared/apiconstants';
import { IContactUs } from 'src/app/shared/interface';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  private unsubscribe = new Subject<void>();
  formGroup: FormGroup
  public Editor = ClassicEditorBuild;
  ckconfig:any
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  constructor(private formBuider: FormBuilder,
    private apiService:ApiService){
      this.formGroup = this.formBuider.group({
        status: [null, [Validators.required]],
        publishingDate: [null,Validators.required],
        
        address: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        email: [null, [Validators.required]],
      })
  }


  onOptionSelected(event: any) {
    
  }
  onOptionSelectedCompany(event: any) {
    
  }

  contactUsSubmit(data:IContactUs){
    this.apiService.ExecutePost(this.apiService.baseUrl + ApiConstant.addContactUs,data)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((response: any) => {
    }, (error) => {
    }
    )
  }
}
