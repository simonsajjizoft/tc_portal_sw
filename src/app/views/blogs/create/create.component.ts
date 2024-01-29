import { Component, ElementRef, ViewChild } from '@angular/core';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { IBlog, IPublishStatus } from "../../../shared/interface"
import { ApiService } from '../../../services/api.services'
import { ApiConstant } from '../../../shared/apiconstants';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DetailsInOutAnimation } from '../../../shared/components/animations/animations'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  animations: [DetailsInOutAnimation],
  host: {
    '(document:click)': '(onBodyClick($event))'
  }
})
export class CreateComponent {
  selectElement: any;
  public form: FormGroup | any;
  private unsubscribe = new Subject<void>();
  public Editor = ClassicEditorBuild;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  isContentURLEditorOpen: boolean = false;
  addOnBlur = true;
  blogContent: String = '';
  retrieveddata: any;
  blogUrlText: any;
  blogUrlDisplay: any;
  tags: any[] = [];
  descriptionEditor: boolean = true;
  source: boolean = false;
  selectedOptions: string[] = [];
  categories: any[] = [];
  showOptions = false;
  selectedDomain: any;
  statusList: any = [{ name: "Draft", value: 0 }, { name: "Publish", value: 1 }];
  domainList: any = ["ZoftSolutions", "Zx Digital", "School Wizard"]
  selectedStatusType;
  statusDropDown: boolean;
  domainDropDown: boolean;
  isexpandTitle;
  latestBlogs;
  selectedFile;
  selectedFilePreview;
  animationState = 'in';
  @ViewChild('teams') teams!: ElementRef;
  @ViewChild('myEditor') myEditor: ElementRef;


  constructor(private apiService: ApiService, private formBuider: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.newForm()
  }

  ngOnInit() {
    this.blogUrlText = '';
    this.blogUrlDisplay = this.blogUrlText;
    this.getLatestBlogs();
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

  onOptionSelected(status, event) {
    this.selectedStatusType = status;
  }

  statusSelected(status, ev) {
    this.selectedStatusType = status;
  }

  onOptionSelectedCompany(domain) {
    this.selectedDomain = domain;
  }

  addBlog(blogValues: IBlog) {
    if (this.checkBasicDetailsFilled() && this.checkContentFilled() && this.checkPublishingInfoFilled()) {
      let currentDate = new Date();
      const data: IBlog = {
        title: blogValues?.title,
        category: blogValues?.category,
        tags: this.tags,
        blogUrl: blogValues?.blogUrl,
        content: blogValues?.content,
        publishingDate: blogValues?.publishingDate,
        status: this.selectedStatusType?.name,
        preview: this.getPreviewTextfromEditor() ? this.getPreviewTextfromEditor() : '',
        coverImage: blogValues?.coverImage,
        createdDate: blogValues?.createdDate,
        metaTitle: blogValues?.metaTitle,
        metaDescription: blogValues?.metaDescription,
        published: this.selectedStatusType?.value == 1 ? true : false,
        createdBy: "Zoftsolutions",
        updatedDate: blogValues?.updatedDate,
        active: true,
        company: this.selectedDomain,
        alternateImageName : blogValues?.alternateImageName
      }
      if (this.selectedFile?.size < 804667) {
        this.apiService.ExecutePost(this.apiService.baseUrl + ApiConstant.addBlog, data)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((response: any) => {
            this.toastr.success("", "The Blog has been created successfully", {
              titleClass: "tstr-title",
              messageClass: "tstr-message",
              timeOut: 3000, closeButton: true, easing: "ease-in-out"
            });
            this.form.reset();
            this.tags = [];
            this.newForm();
            this.router.navigate(['/blogs']);
            if (this.selectedFile) this.uploadBlogImage(response?.blogId)
          }, (error) => {
            this.toastr.error('Failed to create the blog', error?.error, {
              timeOut: 3000, closeButton: true, easing: "ease-in-out",
              titleClass: "tstr-title",
              messageClass: "tstr-message",
            });
          })
      }
      else this.toastr.warning("The image must be less than 800KB", "The size of the image has exceeded", {
        titleClass: "tstr-title",
        messageClass: "tstr-message",
        closeButton: true
      });
    }
    // else this.toastr.warning("Please do fill in the form with all details");
    else this.toastr.warning("There are some fields missing.", " Please do fill in Form!", {
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
    if (event.target.classList[0] !== 'no-close') {
      this.statusDropDown = false;
      this.domainDropDown = false;
    }
  }

  expandToggleTitle() {
    this.isexpandTitle = !this.isexpandTitle;
  }

  getLatestBlogs() {
    this.apiService.ExecuteGet(this.apiService.baseUrl + ApiConstant.recentBlogs)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.latestBlogs = data;
      }, error => {
      });
  }

  checkBasicDetailsFilled() {
    if (this.form?.value?.title &&
      // this.form?.value?.category &&
      this.tags.length > 0 &&
      this.form?.value?.metaTitle &&
      this.form?.value?.metaDescription &&
      this.form?.value?.blogUrl &&
      // this.form?.value?.preview &&
      // this.form?.value?.coverImage
      this.selectedFile
    ) return true;
    else return false;
  }

  checkContentFilled() {
    if (this.form?.value?.content) return true;
    else return false;
  }

  checkPublishingInfoFilled() {
    if (this.selectedStatusType?.name &&
      this.form?.value?.publishingDate) return true;
    else return false;
  }

  newForm() {
    this.selectedStatusType = this.statusList[0];
    this.selectedDomain = this.domainList[0];
    this.form = this.formBuider.group({
      title: [null, [Validators.required]],
      metaTitle: [null, [Validators.required]],
      metaDescription: [null, [Validators.required]],
      blogUrl: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      tags: [null, [Validators.required]],
      content: [null, [Validators.required]],
      category: [null, [Validators.required]],
      status: [null, [Validators.required]],
      publishingDate: [new Date(), Validators.required],
      preview: [null, Validators.required],
      coverImage: [null, Validators.required],
      createdDate: [new Date(), Validators.required],
      updatedDate: [new Date(), Validators.required],
      alternateImageName : ['',[Validators.required]]
    })
  }

  cancel() {
    this.router.navigate(['/blogs']);
  }

  public onFileChanged(event) {
    if (event?.target.files[0] && event?.target?.files[0]?.size < 4448576 ) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = ((event: any) => {
        this.selectedFilePreview = event?.target?.result;
      })
      this.form.value.coverImage = this.selectedFile?.name;
    }
    else this.toastr.warning("The image must be less than 6mb", "The size of the image has exceeded", {
      titleClass: "tstr-title",
      messageClass: "tstr-message",
      closeButton: true
    });

  }

  uploadBlogImage(id) {
    let data = { "blogId": id };
    const uploadImageData = new FormData();
    uploadImageData.append('File', this.selectedFile);
    this.apiService.ExecutePost(this.apiService.baseUrl + ApiConstant.uploadBlogImage + '?blogId=' + id, uploadImageData)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.toastr.success("", "The Image has been uploaded sucessfully", {
          titleClass: "tstr-title",
          messageClass: "tstr-message",
          timeOut: 3000, closeButton: true, easing: "ease-in-out"
        });
        this.deleteImage('noevent');
      }, (error) => {
        if (error?.status == 200) {
          this.selectedFile = null;
          this.form.value.coverImage = ''
          this.selectedFilePreview = null;
          this.toastr.success("", "The Image has been uploaded sucessfully", {
            titleClass: "tstr-title",
            messageClass: "tstr-message",
            timeOut: 3000, closeButton: true, easing: "ease-in-out"
          });
        }
        else this.toastr.error(error?.error?.error, 'Failed to Upload image for the blog', {
          timeOut: 3000, closeButton: true, easing: "ease-in-out",
          titleClass: "tstr-title",
          messageClass: "tstr-message",
        });
      })
  }

  fileDrop(event): void {
    // event.preventDefault();
    // event.stopPropagation();
    // this.onFileChanged(event?.dataTransfer?.file);
  }

  fileDrag(event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  deleteImage(event) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedFile = null;
    this.form.value.coverImage = ''
    this.selectedFilePreview = null;
  }

  getPreviewTextfromEditor() {
    let oParser = new DOMParser();
    let innerHtml = this.blogContent;
    let value = oParser.parseFromString(String(innerHtml), "text/html").body?.innerText;
    value = value.split(".")[0];
    return value;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  resetBasicDetails() {
    this.tags = [];
    this.form?.get('title')?.reset();
    this.form?.get('category')?.reset();
    this.form?.get('metaTitle')?.reset();
    this.form?.get('metaDescription')?.reset();
    this.form?.get('blogUrl')?.reset();
    this.selectedFile = null;
    this.form.value.coverImage = ''
    this.selectedFilePreview = null;
  }

  toggleBasicDetails() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }
}
