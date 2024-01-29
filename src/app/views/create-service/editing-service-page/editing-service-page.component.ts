import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators, FormArray } from '@angular/forms';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { ApiConstant } from 'src/app/shared/apiconstants';
import { ApiService } from 'src/app/services/api.services';
import { IService } from 'src/app/shared/interface';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SubTitle } from 'chart.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';



@Component({
  selector: 'app-editing-service-page',
  templateUrl: './editing-service-page.component.html',
  styleUrls: ['./editing-service-page.component.scss']
})
export class EditingServicePageComponent {
  public Editor = ClassicEditorBuild;
  editForm: FormGroup
  id: any;
  statusType: any;
  publishingDate: any

  descriptionEditor: boolean = true
  description: String = '';
  descriptionSource: boolean = false;

  benefitsEditor: boolean = true
  benefits: String = '';
  benefitsSource: boolean = false;


  ckconfig: any

  openSubserviceSection = false
  descriptionSubserviceEditor: boolean = true
  descriptionSubservice: String = '';
  descriptionSubserviceSource: boolean = false;

  private unsubscribe = new Subject<void>();
  // companies: any[] = [
  //   {
  //     name: "ZoftSolutions"
  //   },
  //   {
  //     name: "ZX Digital"
  //   },
  //   {
  //     name: "School Wizard"
  //   }
  // ];
  // selectedCompany: string = "ZoftSolutions";

  // selectedCompanyControl = new FormControl(this.selectedCompany);


  constructor(private route: ActivatedRoute, private formbuilder: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar) {
    this.editForm = this.formbuilder.group(
      {
        title: [null, [Validators.required]],
        serviceDescription: [null, [Validators.required]],
        img: [null, []],

        serviceBenefits: [null, [Validators.required]],
        sideImage: [null, []],

        status: [null, [Validators.required]],
        publishingDate: [null, Validators.required],

        subServices: this.formbuilder.array([
        

        
        ])

      }
    )
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params?.get('id')) {
        this.id = params?.get('id')
      }
      else {
        window.history.back()
      }
    });
    this.getServiceDetail()

  }

  descriptionSubserviceSourceStatus() {
    this.descriptionSubserviceSource = !this.descriptionSubserviceSource
  }
  descriptionSubserviceEditorStatus(status: string) {
    this.descriptionSubserviceEditor = (status == 'true') ? true : false
    this.editForm.patchValue({
      subserviceDescription: ''
    });
  }

  onOptionSelectedCompany(event: any) {

  }

  benefitsSourceStatus() {
    this.benefitsSource = !this.benefitsSource
  }
  benefitsEditorStatus(status: string) {
    this.benefitsEditor = (status == 'true') ? true : false
    this.editForm.patchValue({
      serviceBenefits: ''
    });
  }

  descriptionSourceStatus() {
    this.descriptionSource = !this.descriptionSource
  }
  descriptionEditorStatus(status: string) {
    this.descriptionEditor = (status == 'true') ? true : false
    this.editForm.patchValue({
      descriptionContent: ''
    });
  }

  isOpenSubserviceSection() {
    this.openSubserviceSection = !this.openSubserviceSection
    return this.openSubserviceSection
  }

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
    return this.editForm.get('subServices') as FormArray;
  }


  onOptionSelected(event: any) {

  }


  getServiceDetail() {

    this.apiService.ExecuteGet(this.apiService.baseUrl + ApiConstant.updateService, this.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.setData(response)
      }, (error) => {
        alert('error')
      }
      )
  }
  setData(data: any) {
    this.editForm.patchValue({
      title: data?.title,
      serviceDescription: data?.serviceDescription,
      serviceBenefits: data?.serviceBenefits,
    })
    // debugger
    if (data?.subServices && data.subServices.length > 0) {
      const subserviceArray = this.editForm.get('subServices') as FormArray;

      // Iterate over each subservice element
      for (const subserviceItem of data.subServices) {
        // Create a form group for each subservice element
        const subserviceGroup = this.formbuilder.group({
          subtitle: subserviceItem?.subtitle,
          subimage: [subserviceItem?.subimage, []],
          subserviceDescription: subserviceItem?.subserviceDescription,
        });

        // Push the subservice form group to the subserviceArray
        subserviceArray.push(subserviceGroup);
      }

    }
  }

  updateService(formData : IService) {
    const serviceDetails: IService = {
      title: formData?.title,
      serviceDescription: formData?.serviceDescription,
      serviceBenefits: formData?.serviceBenefits,
      subServices: this.subservice.value

    }
    this.apiService.ExecutePut(this.apiService.baseUrl + ApiConstant.updateService, serviceDetails, this.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.snackBar.open('Blog Successfully Updated!!!!!', 'OK', {
          duration: 5000,
          panelClass: 'green-snackbar',
        });
      }, (error) => {
        this.snackBar.open('Updation Failed!!!!!', 'OK', {
          duration: 5000,
          panelClass: 'red-snackbar',
        });
      }
      )
  }


}