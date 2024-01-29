import { ChangeDetectorRef, Component, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { TableService } from '../../../services/table.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiConstant } from 'src/app/shared/apiconstants';
import { ApiService } from 'src/app/services/api.services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-listing-service',
  templateUrl: './listing-service.component.html',
  styleUrls: ['./listing-service.component.scss']
})
// ,'publishingDate','subtitle'
export class ListingServiceComponent {
  dataSource: any;
  data:any;
  shownColumns:any = ['select','Title','subtitle','serviceBenefits','edit'];
  isFilterActive: any;
  filteredColumns: any = [];
  masterCheckbox: boolean = false;
  enabledLocationNameFilter: boolean = true;
  // enabledAddressLine1Filter: boolean = true;
  selection = new SelectionModel<any>(true, []);
  showServiceContent: Boolean = false;
  serviceContent: any;
  pageSizeperPage: any;
  pgIndex: any = 0;

  private unsubscribe = new Subject<void>();



  @ViewChild ('filterName') filterName: any;
  @ViewChild (MatSort) sort: MatSort | any;
  @ViewChild ('matpaginatr') paginator: MatPaginator | any;

  constructor(private router:Router,private tableService:TableService, private cdr: ChangeDetectorRef, private apiService: ApiService){}
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selection = this.tableService.getSelectionModel();
  }

  ngOnInit() {
    this.pageSizeperPage = 10;
    // this.data = [
    //   {'Title': 'Data Visualization using Power BI','Visibility': 'Public', 'Status': 'Published'},
    //   {'Title': 'hajja','Visibility': 'Public', 'Status': 'Published'},
    //   {'Title': 'zkmkmkmz','Visibility': 'Public', 'Status': 'Published'}
    // ]
    this.getService()

  }


  getPageData() {
    return this.dataSource._pageData(this.dataSource._orderData(this.dataSource.filteredData));
  }

  masterToggle(checkboxChange: MatCheckboxChange) {
    this.isEntirePageSelected() ?
      this.selection.deselect(...this.getPageData()) :
      this.selection.select(...this.getPageData());
  }

  isEntirePageSelected() {
    return this.getPageData().every((row: any) => this.selection.isSelected(row));
  }
  selectaRow(row: any, ev: any) {
    if (ev?.checked) this.tableService.select(row);
    else this.tableService.deselect(row);
  }
  previewService(serviceDetails:any){
    this.showServiceContent = true;
    this.serviceContent = `<div style="align-items:'center';justify-content:'center'"><h3 style="text-align:center;color:blue">${serviceDetails?.Title}</h3> <p>This is sample Service </p> </div>`
  }
  // gotToEditingPage(id:any,content:any){
  //   this.router.navigate(
  //     ['/create-service/edit'],
  //     { queryParams: { id: id, content: content} }
  //   );
  // }
  gotToEditingPage(id:any){
    this.router.navigate(
      ['/create-service/edit'],
      { queryParams: { id: id} }
    );
  }

  onChangedPage(event: any) {
    this.pageSizeperPage = event?.pageSize;
    this.masterCheckbox = false;
  }

  clearStatusFilters() {
    this.dataSource.filter = '';
  }

  filterByStatus(column: any, status: String) {
    this.selection.deselect(...this.getPageData());
    if (status == 'All') this.clearStatusFilters();
    else this.dataSource.filter = status;
    this.cdr.detectChanges();

  }
  createService() {
    this.router.navigate(['/create-service/create'])
  }

  clearAllFilters() {
    this.applyFilter('', '');
    this.enabledLocationNameFilter = true;
    if (this.filterName?.nativeElement) this.filterName.nativeElement.value = '';

    this.isFilterActive = false;
  }
  

  getService(){
    this.apiService.ExecuteGet(this.apiService.baseUrl + ApiConstant.getService)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
       this.dataSource=response
       ?.map((res:any)=>{
       return{
         "id":res?.serviceId,
         "Title":res?.title,
        //  "PublishingDate":res?.publishingDate?res?.publishingDate:'-',
        //  "Visibility":'public',
        //  "status":res?.status,
         
         "subtitle" : res?.subServices && res?.subServices.map(subService=>subService.subtitle),
         "serviceBenefits":res?.serviceBenefits
        //  res?.map(subservice => );
       }
      })
      }, (error) => {
      }
      )
  }

  applyFilter(filterValue: any, column: any) {
    this.selection.deselect(...this.getPageData())  // needs to clear the checked locations before filtering
    if (filterValue.target?.value == '') {
      this.isFilterActive = false;
      this.filteredColumns.map((item: any, idx: any) => {
        if (item == column) this.filteredColumns.splice(idx, 1)
      });
      this.clearAllFilters();
      this.tableService.clearSelectionModel();
    }
    else {
      this.isFilterActive = true;
      this.filteredColumns.push(column);
      this.dataSource.filterPredicate = function (data: any, filter: string): any {
        if (column == 'Title') return data?.Title?.toLowerCase().includes(filter);

      };
      if (filterValue?.target?.value) filterValue = filterValue.target?.value?.trim().toLowerCase();
      else filterValue = filterValue;
      this.dataSource.filter = filterValue;
      this.cdr.detectChanges();
    }
  }


}
