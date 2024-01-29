import { Component, ElementRef, ViewChild } from '@angular/core';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { IBlog, IPublishStatus,ICareers } from "../../../shared/interface"
import { ApiService } from '../../../services/api.services'
import { ApiConstant } from '../../../shared/apiconstants';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import { DetailsInOutAnimation } from '../../../shared/components/animations/animations'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [DetailsInOutAnimation],
  host: {
    '(document:click)': '(onBodyClick($event))'
  }
})
export class EditComponent {
  selectElement: any;
  public form: FormGroup | any;
  private unsubscribe = new Subject<void>();
  public Editor = ClassicEditorBuild;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  isContentURLEditorOpen: boolean = false;
  addOnBlur = true;
  careerContent: String = '';
  retrieveddata: any;
  blogUrlText: any;
  blogUrlDisplay: any;
  tags: any[] = [];
  descriptionEditor: boolean = true;
  source: boolean = false;
  selectedOptions: string[] = [];
  categories: any[] = [];
  showOptions = false;
  selectedDomain:any;
  statusList: any = [{ name: "Draft", value: 0 }, { name: "Publish", value: 1 }];
  domainList: any = ["ZoftSolutions","Zx Digital","School Wizard"]
  selectedStatusType;
  statusDropDown:boolean;
  domainDropDown:boolean;
  isexpandTitle;
  latestCareers;
  selectedFile;
  selectedFilePreview;
  loader;
  publishingDate: any;
  careerDetails;
  id;
  animationState = 'in';
  @ViewChild('teams') teams!: ElementRef;
  @ViewChild('myEditor') myEditor: ElementRef;


  constructor(private route: ActivatedRoute,private apiService: ApiService, private formBuider: FormBuilder,private toastr:ToastrService,private router:Router) {
   
    this.newForm();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params?.get('id')) this.id = params?.get('id')
      else window.history.back();
    });
    this.getCareerDetail();
    this.getLatestCareers();
  }

  toggleSelectBox() {
    this.showOptions = !this.showOptions;
  }

  get blogUrl(): any { return this.form.get('blogUrl'); }

  changeBlogUrl(ev: any) {
    this.blogUrlText = ev;
  }

  saveURLEditor(url: string) {
    this.blogUrlDisplay = url;
    this.isContentURLEditorOpen = false;
  }

  closeURLEditor() {
    this.isContentURLEditorOpen = false;
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) this.tags.push(value);
    event.chipInput!.clear();
  }

  addCategory(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) this.categories.push(value);
    event.chipInput!.clear();
  }


  remove(val: any) {
    const index = this.tags.indexOf(val);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  removeCategory(val: any) {
    const index = this.categories.indexOf(val);
    if (index >= 0) this.categories.splice(index, 1);
  }

  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    const index = this.tags.indexOf(tag);
    if (index >= 0) this.tags[index].tag = value;
  }

  editCategory(category: any, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.removeCategory(category);
      return;
    }
    const index = this.categories.indexOf(category);
    if (index >= 0) this.categories[index].category = value;

  }

  onOptionSelected(status,event) {
    this.selectedStatusType = status;
  }

  statusSelected(status,ev){
    this.selectedStatusType = status;
  }

  onOptionSelectedCompany(domain) {
    this.selectedDomain = domain;
  }

  updateCareer(values: ICareers) {
      if(this.checkBasicDetailsFilled() && this.checkContentFilled() && this.checkPublishingInfoFilled()){
        let currentDate = new Date();
        const data: ICareers = {
          role: values?.role,
          content: values?.content,
          createdBy:"Zoftsolutions",
          createdDate: values?.createdDate,
          publishingDate: values?.publishingDate,
          status: this.selectedStatusType?.name,
          updatedDate : values?.updatedDate,
          published : this.selectedStatusType?.value == 1 ? true : false,
          active:true,
          company: this.selectedDomain,
          expectedDateToJoin: values?.expectedDateToJoin,
          experience: values?.experience,
          workLocation: values?.workLocation,
          workMode: values?.workMode,
          jobCode:values?.jobCode,
          preview: this.getPreviewTextfromEditor() ? this.getPreviewTextfromEditor() : '',                           
          
        }
          this.apiService.ExecutePut(this.apiService.baseUrl + ApiConstant.updateCareer, data, this.id)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((response: any) => {
            this.toastr.success("", "The Career has been updated successfully", {
              titleClass: "tstr-title",
              messageClass: "tstr-message",
              timeOut: 3000,closeButton:true,easing : "ease-in-out"
            });
            // this.form.reset();
            // this.tags = [];
            // this.newForm();
          }, (error) => { 
            this.toastr.error('Failed to update the career', error?.error, {
              timeOut: 3000,closeButton:true,easing : "ease-in-out",
              titleClass: "tstr-title",
              messageClass: "tstr-message",
            });
          })
      }
      // else this.toastr.warning("Please do fill in the form with all details");
      else  this.toastr.warning("There are some fields missing.", " Please do fill in Form!", {
        titleClass: "tstr-title",
        messageClass: "tstr-message",
        closeButton: true
      });
    
   
  }

  descriptionEditorStatus(status: string) {
    this.descriptionEditor = (status == 'true') ? true : false
    this.form.patchValue({
      content: ''
    });
  }

  get validUrl() {
    return this.form.controls;
  }

  sourceStatus() {
    this.source = !this.source
  }

  getPreviewText(originalText, maxLength) {
    if (originalText.length <= maxLength) {
      return originalText;
    } else {
      return originalText.substring(0, maxLength) + "...";
    }
  }

  onBodyClick(event): void {
    if (event.target.classList[0] !== 'no-close' ) {
      this.statusDropDown = false;
      this.domainDropDown = false;
    }
  }

  expandToggleTitle(){
    this.isexpandTitle = !this.isexpandTitle;
  }

  getLatestCareers() {
    // this.apiService.ExecuteGet(this.apiService.baseUrl + ApiConstant.recentBlogs)
    // .pipe(takeUntil(this.unsubscribe))
    // .subscribe(data => {
    //   this.latestCareers = data;
    // }, error => {
    // });
  }

  checkBasicDetailsFilled(){
    if(this.form?.value?.role && this.form?.value?.workLocation && 
      this.form?.value?.experience && this.form?.value?.workMode
      ) return true;
    else return false;
  }

  checkContentFilled(){
    if(this.form?.value?.content ) return true;
    else return false;
  }

  checkPublishingInfoFilled(){
    if(this.selectedStatusType?.name &&
      this.form?.value?.publishingDate ) return true;
      else return false;
  }

  newForm(){
    this.selectedStatusType = this.statusList[0];
    this.selectedDomain = this.domainList[0];
    this.form = this.formBuider.group({
      jobCode: [null, [Validators.required]],
      role: [null, [Validators.required]],
      workLocation: [null, [Validators.required]],
      experience : [null, [Validators.required]],
      expectedDateToJoin : [null, [Validators.required]],
      workMode: [null, [Validators.required]],
      content: [null, [Validators.required]],
      category: [null, [Validators.required]],
      status: [null, [Validators.required]],
      publishingDate: [new Date(), Validators.required],
      createdDate: [new Date(), Validators.required],
      updatedDate : [new Date(), Validators.required],
    })
  }

  cancel(){
    this.router.navigate(['/careers']);
  }

  public onFileChanged(event) {
    if(event?.target.files[0] && event?.target?.files[0]?.size < 804667){
      this.selectedFile = event.target.files[0];
      let reader= new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = ((event:any)=>{
        this.selectedFilePreview = event?.target?.result;
      })
      this.form.value.coverImage = this.selectedFile?.name;
    }
    else this.toastr.warning("The image must be less than 800KB", "The size of the image has exceeded", {
      titleClass: "tstr-title",
      messageClass: "tstr-message",
      closeButton: true
    });
   
  }

  fileDrop(event): void {
  }

  fileDrag(event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  deleteImage(event){
    event.preventDefault();
    event.stopPropagation();
    this.selectedFile = null;
    this.form.value.coverImage = ''
    this.selectedFilePreview = null;
  }
  
  getPreviewTextfromEditor(){
    let oParser = new DOMParser();
    let innerHtml = this.careerContent;
    let value = oParser.parseFromString(String(innerHtml), "text/html").body?.innerText;
    value = value.substring(0, 50); 
     return value;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  getCareerDetail() {
    this.loader = true;
    this.apiService.ExecuteGet(this.apiService.baseUrl + ApiConstant.addCareer, this.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.careerDetails = response;
        this.setData(response);
        this.loader = false;
      }, (error) => {
        this.loader = false;
      })
  }

  setData(data: any) {
    this.form.patchValue({
      jobCode:data?.jobCode,
      role: data?.role,
      category: data?.category,
      content: data?.content,
      publishingDate: data?.publishingDate,
      status: data?.status,
      createdDate: data?.createdDate,
      workLocation: data?.workLocation,
      workMode: data?.workMode,
      experience: data?.experience,
      expectedDateToJoin:data?.expectedDateToJoin,
      updatedDate: new Date(),
      published: data?.published,
      company : data?.company     
    })
    this.tags = data?.tags;
    this.selectedDomain = data?.company
    // this.statusType = data?.status
    if (data?.coverImageUrl) this.selectedFilePreview = data?.coverImageUrl;
    this.selectedStatusType = data?.status == 'Publish' && data?.published ? this.statusList[1] : this.statusList[0];
    this.publishingDate = data?.publishingDate ? data?.publishingDate : `-`;
    this.loader = false;
  }

  resetBasicDetails() {
    this.form?.get('jobCode')?.reset();
    this.form?.get('role')?.reset();
    this.form?.get('workLocation')?.reset();
    this.form?.get('experience')?.reset();
    this.form?.get('expectedDateToJoin')?.reset();
    this.form?.get('workMode')?.reset();
    this.form?.get('category')?.reset();
    this.selectedFile = null;
    this.form.value.coverImage = ''
    this.selectedFilePreview = null;
  }

  toggleBasicDetails() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

}
