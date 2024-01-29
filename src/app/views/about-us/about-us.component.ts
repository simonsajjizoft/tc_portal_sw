import { Component } from '@angular/core';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  selectElement: any
  formGroup: FormGroup
  public Editor = ClassicEditorBuild;
  ckconfig:any
  testEditor:any
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  isURLOpen:boolean = false;


  aboutUsSummaryEditor: boolean = true
  aboutUsSummary: String = '';
  aboutUsSource: boolean = false
  successfulProjects: number = 0;
  problemSolved: number = 0;
  missionDescriptionEditor: boolean = true
  missionDescription: String = '';
  missionSource: boolean = false
  visionDescriptionEditor: boolean = true
  visionDescription: String = '';
  visionSource: boolean = false
  descriptionEditor: boolean = true
  description: String = '';
  descriptionSource:boolean = false;
  // expertLinkedinUrlText: any
  // expertLinkedinUrlDisplay:any
  openSolutionSection = false
  openExpertSection = false
  openNewsSection = false

  constructor(private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      tagLine :[null, [Validators.required]],
      aboutUsTitle: [null, [Validators.required]],
      sideCoverImage: [null, [Validators.required]],
      aboutUsContent: [null, [Validators.required]],
      percentage1: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      percentage2: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      missionTitle: [null, [Validators.required]],
      visionTitle: [null, [Validators.required]],
      missionContent: [null, [Validators.required]],
      visionContent: [null, [Validators.required]],
      customerName: [null,[Validators.required]],
      customerDesignation: [null,[Validators.required]],
      customerCompany: [null,[Validators.required]],



      solutions: this.formBuilder.array([
        this.formBuilder.group({
          title: [null, [Validators.required]],
          image: [null, [Validators.required]],
          descriptionContent: [null, [Validators.required]],
      
        })
      ]),
      
      experts: this.formBuilder.array([
        this.formBuilder.group({
          name: [null, [Validators.required]],
          image: [null, [Validators.required]],
          designation: [null, [Validators.required]],
          linkedinUrl: [null, [Validators.required]],
          facebookUrl: [null, [Validators.required]],
          instagramUrl: [null, [Validators.required]],
        })
      ]),
      news: this.formBuilder.array([
        this.formBuilder.group({
          image: [null, [Validators.required]],
          linkUrl: [null, [Validators.required]]
        })
      ])

    })
  }
  ngOnInit() { }
  //   customAdapterPlugin() {
  //     this.testEditor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
  //       return new Adapter(loader, this.testEditor.config);
  //     };
  //   }
  // ngOnInit(){
  //   this.expertLinkedinUrlText = '';
  //   this.expertLinkedinUrlText = this.expertLinkedinUrlText;
  // }

  // changeUrl(ev:any){
  //   this.expertLinkedinUrlText = ev;

  // }
  // saveURL(url:string){
  //   this.expertLinkedinUrlDisplay = url;
  //   this.isURLOpen = false;
  // }
  // closeURL(){
  //   this.isURLOpen = false;
  // }
  get solutions(): FormArray{
    return this.formGroup.get('solutions') as FormArray;
  }

  addSolutions(): void {    
    this.solutions.push(this.formBuilder.group({
      title: [null, [Validators.required]],
      image: [null, [Validators.required]],
      descriptionContent: [null, [Validators.required]],
    }));
  }

  removeSolutions(index: number): void {
    this.solutions.removeAt(index);
  }


  get experts(): FormArray {
    return this.formGroup.get('experts') as FormArray;
  }

  addExpert(): void {
    this.experts.push(this.formBuilder.group({
      name: [null, [Validators.required]],
      image: [null, [Validators.required]],
      designation: [null, [Validators.required]],
      linkedinUrl: [null, [Validators.required]],
      facebookUrl: [null, [Validators.required]],
      instagramUrl: [null, [Validators.required]],
    }));
  }

  removeExpert(index: number): void {
    this.experts.removeAt(index);
  }

  get news(): FormArray{
    return this.formGroup.get('news') as FormArray;
  }
  
  addNews(): void {
    this.news.push(this.formBuilder.group({
      image: [null, [Validators.required]],
      linkUrl: [null, [Validators.required]]
    }));
  }

  removeNews(index: number): void {
    this.news.removeAt(index);
  }
  aboutUsSourceStatus() {
    this.aboutUsSource = !this.aboutUsSource
  }

  missionSourceStatus() {
    this.missionSource = !this.missionSource
  }

  visionSourceStatus() {
    this.visionSource = !this.visionSource
  }

  descriptionSourceStatus() {
    this.descriptionSource = !this.descriptionSource
  }


  onSubmit() {
    if (this.formGroup.valid) {
      const percentage1 = this.formGroup.get('percentage1')?.value;
      const percentage2 = this.formGroup.get('percentage2')?.value;
      const successfulProjects = Math.round((percentage1 / 100) * 1000);
      const problemSolved = Math.round((percentage2 / 100) * 500);
    }
  }

  aboutUsSummaryEditorStatus(status: string) {
    this.aboutUsSummaryEditor = (status == 'true') ? true : false
    this.formGroup.patchValue({
      aboutUsContent: ''
    });
  }
  missionDescriptionEditorStatus(status: string) {
    this.missionDescriptionEditor = (status == 'true') ? true : false
    this.formGroup.patchValue({
      missionContent: ''
    });
  }
  visionDescriptionEditorStatus(status: string) {
    this.visionDescriptionEditor = (status == 'true') ? true : false
    this.formGroup.patchValue({
      visionContent: ''
    });
  }
  descriptionEditorStatus(status: string) {
    this.descriptionEditor = (status == 'true') ? true : false
    this.formGroup.patchValue({
      descriptionContent: ''
    });
  }
  isOpenSolutionSection() {
    this.openSolutionSection = !this.openSolutionSection
    return this.openSolutionSection
  }
  isOpenExpertSection() {
    this.openExpertSection = !this.openExpertSection
    return this.openExpertSection
  }
  isOpenNewsSection() {
    this.openNewsSection = !this.openNewsSection
    return this.openNewsSection
  }
}

