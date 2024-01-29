import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  formGroup : FormGroup
  openBannerSection = true;
  cards = [
    {
      name: 'Banners', bg: '#1c2b6966', type: 'chat_bubble_outline', value: 5, style: 'aliceblue', data: {
        labels: ['20', '50', '90', '130', '70', '53', '21', '84', '122', '54', '56', '89', '23', '543', '23', '53', '70'],
        datasets: [{
          fill: true,
          labels: "This will be hide",
          data: [30, 120, 80, 90, 130, 53, 21, 34, 122, 54, 56, 89, 23, 43, 23, 53, 70],
          backgroundColor: ["aliceblue", "#c5f0ce", "#f0dcc5", "#fca7a4"]
        }]
      }
    },
    {
      name: 'Company Logos', type: 'check_circle_outline', value: 1, style: '#c5f0ce', data: {
        labels: ['20', '50', '90', '130', '70', '53', '21', '84', '122', '54', '56', '89', '23', '543', '23', '53', '70'],
        datasets: [{
          fill: true,
          labels: "This will be hide",
          data: [30, 120, 80, 90, 130, 53, 21, 34, 122, 54, 56, 89, 23, 43, 23, 53, 70],
          backgroundColor: ["#c5f0ce", "#c5f0ce", "#c5f0ce", "#c5f0ce"]
        }]
      }
    },
    {
      name: 'About Us', type: 'unpublished', value: 2, style: '#f0dcc5', data: {
        labels: ['20', '50', '90', '130', '70', '53', '21', '84', '122', '54', '56', '89', '23', '543', '23', '53', '70'],
        datasets: [{
          fill: true,
          labels: "This will be hide",
          data: [30, 120, 80, 90, 130, 53, 21, 34, 122, 54, 56, 89, 23, 43, 23, 53, 70],
          backgroundColor: ["#f0dcc5", "#f0dcc5", "#f0dcc5", "#f0dcc5"]
        }]
      }
    },
    {
      name: 'Customer Feedback', type: 'delete_outline', value: 3, style: '#fca7a4', data: {
        labels: ['20', '50', '90', '130', '70', '53', '21', '84', '122', '54', '56', '89', '23', '543', '23', '53', '70'],
        datasets: [{
          fill: true,
          labels: "This will be hide",
          data: [4, 5, 6, 5, 5, 5, 1, 3, 3, 3, 4, 8, 6, 16, 6, 3, 10],
          backgroundColor: ["#fca7a4", "#fca7a4", "#fca7a4", "#fca7a4"]
        }]
      }
    }
  ];
  searchValue;
  homeElementList = [{value:'Active',name:'Banners'},{value:'Brands',name:'Brands'},{value:'AboutUs',name:'About Us'},{
    value:'Customer feedbacks',name :'Customer Feedbacks'
  }];
  latestBanners = [
    {title:'How to become successfull and rich guide:wqrojqwrfo',preview:'Thisa oinqwoirfq qowuihjrfoqwjoqwrhoqwhruowqrhoqwuirhoqwrouh',createdDate:'12-24-2023',coverImageUrl:'https://cdn.pixabay.com/photo/2013/02/01/18/14/url-77169_1280.jpg'},
    {title:'From Robot wars to Invasions',preview:'Transform your Presence',createdDate:'12-24-2023',coverImageUrl:'https://cdn.pixabay.com/photo/2018/01/08/02/34/technology-3068617_1280.jpg'}
  ];
  selectedElement = this.homeElementList[0];

  constructor(private formBuilder:FormBuilder){
    this.formGroup =this.formBuilder.group({
      status: [null, [Validators.required]],
      publishingDate: [null,Validators.required],
      banners: this.formBuilder.array([
        this.formBuilder.group({
          title: [null, [Validators.required]],
          subtitle: [null, [Validators.required]],
          image: [null, [Validators.required]],
          bannerUrl: [null, [Validators.required]],

        })
        ]),
    })
  }
  get banners(): FormArray {
    return this.formGroup.get('banners') as FormArray;
  }

  addBanner(): void {
    this.banners.push(this.formBuilder.group({
      title: [null, [Validators.required]],
      subtitle: [null, [Validators.required]],
      image: [null, [Validators.required]],
      bannerUrl: [null, [Validators.required]],

     
    }));
  }
  onOptionSelected(event: any) {
  }

  onOptionSelectedCompany(event: any) {
  }

  removeBanner(index: number): void {
    this.banners.removeAt(index);
  }

  isOpenBannerSection() {
    this.openBannerSection = !this.openBannerSection
    return this.openBannerSection
  }

  contentTypeFilterChange(type){
    this.selectedElement = type;
  }

}
