import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, ValidationErrors } from '@angular/forms';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { ApiConstant } from 'src/app/shared/apiconstants';
import { ApiService } from 'src/app/services/api.services';
import { IService } from 'src/app/shared/interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent {
  formGroup: FormGroup
  descriptionEditor: boolean = true
  description: String = '';
  descriptionSource: boolean = false;

  benefitsEditor: boolean = true
  benefits: String = '';
  benefitsSource: boolean = false;




  ckconfig: any
  public Editor = ClassicEditorBuild;
  openSubserviceSection = false
  descriptionSubserviceEditor: boolean = true
  descriptionSubservice: String = '';
  descriptionSubserviceSource: boolean = false;
  // companies: any[];
  companies: any[] = [
    {
      name: "ZoftSolutions"
    },
    {
      name: "ZX Digital"
    },
    {
      name: "School Wizard"
    }
  ];
  selectedCompany: string = "ZoftSolutions";

  selectedCompanyControl = new FormControl(this.selectedCompany);






  private unsubscribe = new Subject<void>();

  constructor(private formbuilder: FormBuilder, private apiService: ApiService) {
    this.formGroup = this.formbuilder.group(
      {
        title: [null, [Validators.required]],
        serviceDescription: [null, [Validators.required]],
        img: [null, []],

        serviceBenefits: [null, [Validators.required]],
        sideImage: [null, []],

        status: [null, []],
        publishingDate: [],

        subServices: this.formbuilder.array([
          this.formbuilder.group({
            subtitle: [null, [Validators.required]],
            subimage: [null, []],
            subserviceDescription: [null, [Validators.required]],
            // selectedCountry: string = "Great Britain";   
          })
        ]),



      }
    )
  }
  ngOnInit() {
  }

  descriptionSubserviceSourceStatus() {
    this.descriptionSubserviceSource = !this.descriptionSubserviceSource
  }
  descriptionSubserviceEditorStatus(status: string) {
    this.descriptionSubserviceEditor = (status == 'true') ? true : false
    this.formGroup.patchValue({
      subserviceDescription: ''
    });
  }

  benefitsSourceStatus() {
    this.benefitsSource = !this.benefitsSource
  }
  benefitsEditorStatus(status: string) {
    this.benefitsEditor = (status == 'true') ? true : false
    this.formGroup.patchValue({
      serviceBenefits: ''
    });
  }



  descriptionSourceStatus() {
    this.descriptionSource = !this.descriptionSource
  }
  descriptionEditorStatus(status: string) {
    this.descriptionEditor = (status == 'true') ? true : false
    this.formGroup.patchValue({
      descriptionContent: ''
    });
  }

  isOpenSubserviceSection() {
    this.openSubserviceSection = !this.openSubserviceSection
    return this.openSubserviceSection
  }
  // ddSolutions(): void {
  //   this.solutions.push(this.formBuilder.group({
  //     title: [null, [Validators.required]],
  //     image: [null, [Validators.required]],
  //     descriptionContent: [null, [Validators.required]],
  //   }));
  // }
  addSubservice(): void {
    this.subservice.push(this.formbuilder.group({
      subtitle: [null, [Validators.required]],
      subimage: [null, []],
      subserviceDescription: [null, [Validators.required]],
    }));
  }

  removeSubservice(index: number): void {
    this.subservice.removeAt(index);
  }
  get subservice(): FormArray {
    return this.formGroup.get('subServices') as FormArray;
  }


  onOptionSelected(event: any) {

  }
  onOptionSelectedCompany(event: any) {


  }
  

  public findInvalidControls() {
    const invalid = [];
    const controls = this.formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;

  }
  // below function is used for finding the error in its each field validation
  getFormValidationErrors() {
    Object.keys(this.formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.formGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }
  
// api call , when created
  addService(newService: IService) {
    const data: IService = {
      title: newService?.title,
      serviceDescription: newService?.serviceDescription,
      serviceBenefits: newService?.serviceBenefits,
      subServices: newService?.subServices
          
      // subserviceDescription: this.subserviceDescription

     }
      // return- for not calling apis
    //  debugger
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.apiService.ExecutePost(this.apiService.baseUrl + ApiConstant.addService, data)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((response: any) => {
          alert('success')
        }, (error) => {
          // alert('error')
        }
        )
    }
    else{
      this.getFormValidationErrors()
    }
  }


}
