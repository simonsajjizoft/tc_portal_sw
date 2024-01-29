import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from "html2canvas"
import { ActivatedRoute, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { ApiConstant } from 'src/app/shared/apiconstants';
import { IBlog } from 'src/app/shared/interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { DetailsInOutAnimation } from '../../../shared/components/animations/animations'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [DetailsInOutAnimation]
})
export class EditComponent implements OnInit, OnChanges {
  private unsubscribe = new Subject<void>();
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  descriptionEditor: boolean = true
  source: boolean = false
  addOnBlur = true;
  statusType: any;
  tags: any[] = []
  publishingDate: any
  public Editor = ClassicEditorBuild;
  editForm: FormGroup
  blogContent: String = '';
  id: any;
  content: any;
  blogUrlText: String = 'https://www.zoftsolutions.com/How-to-detect-ML';
  isContentURLEditorOpen: boolean = false;
  blogUrlDisplay: any;
  selectedDomain: any;
  statusList: any = [{ name: "Draft", value: 0 }, { name: "Publish", value: 1 }];
  domainList: any = ["ZoftSolutions","Zx Digital","School Wizard"]
  selectedStatusType;
  statusDropDown: boolean;
  domainDropDown: boolean;
  isexpandTitle;
  latestBlogs;
  loader;
  blogDetails;
  selectedFile;
  selectedFilePreview;
  animationState = 'in';
  @ViewChild('screen') screen: ElementRef | any;
  @ViewChild('canvas') canvas: ElementRef | any;
  @ViewChild('downloadLink') downloadLink: ElementRef | any;
  @ViewChild("myEditor", { static: false }) myEditor: any;
  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private formBuider: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.editForm = this.formBuider.group({
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
      alternateImageName: ['',Validators.required]
    })
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if (params?.get('id')) this.id = params?.get('id')
      else window.history.back();
    });
    this.getBlogDetail();
    this.getLatestBlogs();
  }

  ngOnChanges() { }

  viewContent() {
  }

  saveURLEditor() {
    this.blogUrlDisplay = this.blogUrlText;
    this.isContentURLEditorOpen = false;
  }

  closeURLEditor() {
    this.isContentURLEditorOpen = false;
  }

  changeBlogUrl(ev: any) {
    this.blogUrlText = ev;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(val: any) {
    const index = this.tags.indexOf(val);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].tag = value;
    }
  }

  getBlogDetail() {
    this.loader = true;
    this.apiService.ExecuteGet(this.apiService.baseUrl + ApiConstant.getBlogDetails, this.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.blogDetails = response;
        this.setData(response);
        this.loader = false;
      }, (error) => {
        this.loader = false;
      })
  }

  setData(data: any) {
    this.editForm.patchValue({
      title: data?.title,
      category: data?.category,
      tags: data.tags,
      blogUrl: data?.blogUrl,
      content: data?.content,
      publishingDate: data?.publishingDate,
      status: data?.status,
      preview: this.getPreviewTextfromEditor() ? this.getPreviewTextfromEditor() : '',
      coverImage: data?.coverImage,
      createdDate: data?.createdDate,
      metaTitle: data?.metaTitle,
      metaDescription: data?.metaDescription,
      updatedDate: new Date(),
      published: data?.published,
      company : data?.company,
      coverImageUrl : data?.coverImageUrl,
      alternateImageName: data?.alternateImageName
    })
    this.tags = data?.tags;
    this.selectedDomain = data?.company
    // this.statusType = data?.status
    if (data?.coverImageUrl) this.selectedFilePreview = data?.coverImageUrl;
    this.selectedStatusType = data?.status == 'Publish' && data?.published ? this.statusList[1] : this.statusList[0];
    this.publishingDate = data?.publishingDate ? data?.publishingDate : `-`;
    this.loader = false;
  }

  updateBlog(data: IBlog) {
    if (this.checkBasicDetailsFilled() && this.checkContentFilled() && this.checkPublishingInfoFilled()) {
      const blogDetails: IBlog = {
        title: data?.title,
        category: data?.category,
        tags: this.tags,
        blogUrl: data?.blogUrl,
        content: data?.content,
        publishingDate: data?.publishingDate,
        status: this.selectedStatusType?.name,
        preview: this.getPreviewTextfromEditor() ? this.getPreviewTextfromEditor()  : '',
        coverImage: data?.coverImage,
        createdDate: data?.createdDate,
        metaTitle: data?.metaTitle,
        metaDescription: data?.metaDescription,
        published: this.selectedStatusType?.value == 1 ? true : false,
        updatedDate: data?.updatedDate,
        createdBy: "Zoftsolutions",
        active: true,
        company: this.selectedDomain,
        alternateImageName : data?.alternateImageName
      }
      if(this.selectedFile?.size < 804667 || this.selectedFilePreview){
        this.apiService.ExecutePut(this.apiService.baseUrl + ApiConstant.updateBlog, blogDetails, this.id)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((response: any) => {
          this.toastr.success("", "The Blog has been updated successfully", {
            titleClass: "tstr-title",
            messageClass: "tstr-message",
            timeOut: 3000, closeButton: true, easing: "ease-in-out"
          });
         if(this.selectedFile) this.uploadBlogImage(response?.blogId);
        }, (error) => {
          this.toastr.error('Failed to update the blog', error?.error, {
            timeOut: 3000, closeButton: true, easing: "ease-in-out",
            titleClass: "tstr-title",
            messageClass: "tstr-message",
          });
        }
        )

      }
      else this.toastr.warning("The image must be less than 800KB", "The size of the image has exceeded", {
        titleClass: "tstr-title",
        messageClass: "tstr-message",
        closeButton: true
      });
      
    }
    // else this.toastr.warning("Please do fill in all the Details to Update the Blog.")
    else this.toastr.warning("There are some fields missing.", " Please do fill in all the Details to Update the Blog!", {
      titleClass: "tstr-title",
      messageClass: "tstr-message",
      closeButton: true
    });

  }


  onOptionSelected(status) {
    this.selectedStatusType = status;
  }

  onOptionSelectedCompany(domain) {
    this.selectedDomain = domain;
  }

  descriptionEditorStatus(status: string) {
    this.descriptionEditor = (status == 'true') ? true : false
    this.editForm.patchValue({
      content: ''
    });
  }

  sourceStatus() {
    this.source = !this.source
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
    if (this.editForm?.value?.title && 
      // this.editForm?.value?.category &&
      this.tags.length > 0 &&
      this.editForm?.value?.metaTitle &&
      this.editForm?.value?.metaDescription &&
      this.editForm?.value?.blogUrl &&
      // this.editForm?.value?.preview 
      // && this.editForm?.value?.coverImage
      (this.selectedFilePreview)
    ) return true;
    else return false;
  }

  checkContentFilled() {
    if (this.editForm?.value?.content) return true;
    else return false;
  }

  checkPublishingInfoFilled() {
    if (this.selectedStatusType?.name &&
      this.editForm?.value?.publishingDate) return true;
    else return false;
  }

  cancel() {
    this.router.navigate(['/blogs']);
  }

  public onFileChanged(event) {
    if(event?.target.files[0] && event?.target?.files[0]?.size < 4448576){
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = ((event: any) => {
        this.selectedFilePreview = event?.target?.result;
      })
      this.editForm.value.coverImage = this.selectedFile?.name;
    }
    else this.toastr.warning("The image must be less than 5mb", "The size of the image has exceeded", {
      titleClass: "tstr-title",
      messageClass: "tstr-message",
      closeButton: true
    });
  }

  uploadBlogImage(id) {
    const uploadImageData = new FormData();
    uploadImageData.append('File', this.selectedFile);
    this.apiService.ExecutePost(this.apiService.baseUrl + ApiConstant.uploadBlogImage + '?blogId=' + id , uploadImageData)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.toastr.success("", "The Image has been uploaded sucessfully", {
          titleClass: "tstr-title",
          messageClass: "tstr-message",
          timeOut: 3000, closeButton: true, easing: "ease-in-out"
        });
      }, (error) => {
        if (error?.status == 200) {
          this.selectedFile = null;
          this.editForm.value.coverImage = ''
          this.selectedFilePreview = null;
          this.getBlogDetail();
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
    this.editForm.value.coverImage = ''
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
  this.editForm?.get('title')?.reset();
  this.editForm?.get('category')?.reset();
  this.editForm?.get('metaTitle')?.reset();
  this.editForm?.get('metaDescription')?.reset();
  this.editForm?.get('blogUrl')?.reset();
  this.editForm?.get('alternateImageName')?.reset();
  this.selectedFile = null;
  this.editForm.value.coverImage = ''
  this.selectedFilePreview = null;
}

toggleBasicDetails() {
  this.animationState = this.animationState === 'out' ? 'in' : 'out';
}
}
