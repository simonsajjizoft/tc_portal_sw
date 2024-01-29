import { Component, ViewChild, SimpleChanges, OnInit, OnChanges, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { TableService } from '../../services/table.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.services';
import { ApiConstant } from 'src/app/shared/apiconstants';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmboxComponent } from 'src/app/shared/components/confirmbox/confirmbox.component';
import { TableViewComponent } from 'src/app/shared/components/table-view/table-view.component';
import { cilChartPie, cilArrowRight } from '@coreui/icons';
import { SlideInOutAnimation, SlideInRightAnimation } from '../../shared/components/animations/animations'

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  animations: [SlideInOutAnimation, SlideInRightAnimation]
})
export class CareersComponent implements OnInit, OnChanges, AfterViewInit,OnDestroy{
  private unsubscribe = new Subject<void>();
  selection = new SelectionModel<any>(true, []);
  dataSource: any;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[4]);
  pageSizeperPage: any;
  data: any;
  shownColumns: any = ['Role', 'CreatedBy', 'PublishedDate', 'WorkLocation', 'status', 'edit', 'delete'];
  isFilterActive: any;
  filteredColumns: any = [];
  enabledAddressFilter: boolean = true;
  enabledLocationNameFilter: boolean = true;
  enabledAddressLine1Filter: boolean = true;
  enabledRouteFilter: boolean = true;
  enabledOnRouteFilter: boolean = true;
  orderedColumns: any;
  masterCheckbox: boolean = false;
  pgIndex: any = 0;
  showBlogContent: Boolean = false;
  blogContent: any;
  additionalDetails = { totalCount: 0, publishedCount: 0, unPublishedCount: 0 };
  loader: boolean;
  taskFilterQuery = {
    limit: 10
  };
  skipNumber: number = 1;
  columnsList: any = { Role: 'Role', CreatedBy: 'Created By',workLocation:'Work Location' ,workMode:'Work Mode',experience:'Experience', PublishedDate: 'Published Date', status: 'Status', actions: 'Actions', goto: '' };
  statusFilter: any;
  tasks: any;
  clearStatusFilter: any;
  icons = { cilChartPie, cilArrowRight };
  animationState = 'out';
  buttonAnimationState = 'out';
  latestBlogs;
  cards = [
    {
      name: 'All your active blog posts', bg: '#1c2b6966', type: 'chat_bubble_outline', value: this.additionalDetails?.totalCount, style: 'aliceblue', data: {
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
      name: 'Published and updated blogs', type: 'check_circle_outline', value: this.additionalDetails?.publishedCount, style: '#c5f0ce', data: {
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
      name: 'Draft and ready to be published', type: 'unpublished', value: this.additionalDetails?.unPublishedCount, style: '#f0dcc5', data: {
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
      name: 'Inactive / deleted blogs', type: 'delete_outline', value: 3, style: '#fca7a4', data: {
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
  careerTypeList = [{value:'Active',name:'All Careers'}]
  selectedCareerType = this.careerTypeList[0];
  selectedRow;
  initialLoader;
  @ViewChild('filterName') filterName: any;
  @ViewChild('matpaginatr') paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;


  constructor(private tableService: TableService,
    private cdr: ChangeDetectorRef, private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageSizeperPage = 10;
    // this.getBlogs();
    this.getInitialCareers();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selection = this.tableService.getSelectionModel();
  }

  getPageData() {
    return this.dataSource._pageData(this.dataSource._orderData(this.dataSource.filteredData));
  }

  isEntirePageSelected() {
    return this.getPageData().every((row: any) => this.selection.isSelected(row));
  }

  masterToggle(checkboxChange: MatCheckboxChange) {
    this.isEntirePageSelected() ?
      this.selection.deselect(...this.getPageData()) :
      this.selection.select(...this.getPageData());
  }

  selectaRow(row: any, ev: any) {
    if (ev?.checked) this.tableService.select(row);
    else this.tableService.deselect(row);
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

  filterByStatus(column: any, status: String) {
    this.selection.deselect(...this.getPageData());
    if (status == 'All') this.clearStatusFilters();
    else this.dataSource.filter = status;
    this.cdr.detectChanges();
  }

  clearStatusFilters() {
    this.dataSource.filter = '';
  }


  onChangedPage(event: any) {
    this.pageSizeperPage = event?.pageSize;
    this.masterCheckbox = false;
  }

  previewBlog(blogDetails: any) {
    this.showBlogContent = true;
  }

  getBlogContent() {
    return this.blogContent;
  }

  openContentInNewWindow(content: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/custompage/${content.id}`])
    );
    window.open(url, '_blank');
  }

  gotToEditingPage(id: any) {
    this.initialLoader = true;
    this.router.navigate(
      ['/careers/edit'],
      { queryParams: { id: id } }
    );
  }

  getInitialCareers() {
    this.loader = true;
    let payload = { "active":true }
    // let api = this.apiService.baseUrl + ApiConstant.addCareer;
    let  api = this.apiService.baseUrl + ApiConstant.addCareer + '/search';
    this.apiService.ExecutePost(api,payload)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.dataSource.data = response
          ?.map((res: any) => {
            return {
              "id": res?.id,
              "Role": res?.role,
              "workLocation":res?.workLocation,
              "workMode" : res?.workMode,
              "CreatedBy": res?.createdBy ? res?.createdBy : '-',
              "PublishedDate": res?.publishingDate ? res?.publishingDate : '-',
              "experience" : res?.experience,
              "Visibility": 'public',
              "company" : res?.company,
              "jobCode" : res?.jobCode,
              "status": res?.status,
              "active": res?.active,
              "preview":res?.preview,
            }
          })
        this.tasks = this.dataSource?.data;
        this.tasks = [...this.tasks];
        this.skipNumber = 1;
        this.getCountPublishedContent(response);
        this.animationState = 'in';
        setTimeout(() => {
          this.loader = false;
        }, 500)

      }, (error) => {
        this.loader = false;
      }
    )
  }

  getCareers() {
    this.loader = true;
    let payload = {
      "searchKey":this.searchValue?.trim(),
      "active":true,
      "status":this.statusFilter
    }
    if(!payload?.searchKey) delete payload?.searchKey;
    if(!payload?.active) delete payload?.active;
    if(!payload?.status) delete payload?.status;
    let  api = this.apiService.baseUrl + ApiConstant.addCareer + '/search';
    this.apiService.ExecutePost(api,payload)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.dataSource.data = response
          ?.map((res: any) => {
            return {
              "id": res?.id,
              "Role": res?.role,
              "workLocation":res?.workLocation,
              "CreatedBy": res?.createdBy ? res?.createdBy : '-',
              "PublishedDate": res?.publishingDate ? res?.publishingDate : '-',
              "experience" : res?.experience,
              "Visibility": 'public',
              "status": res?.status,
              "active": res?.active,
              "company": res?.company,
              "preview":res?.preview,
              "workMode" : res?.workMode,
              "jobCode" : res?.jobCode,
            }
          })
        this.tasks = this.dataSource?.data;
        // if(this.selectedBlogType?.value == 'Active') this.tasks = this.tasks?.filter((item) => item?.active == true);
        // else if(this.selectedBlogType?.value == 'InActive') this.tasks = this.tasks?.filter((item) => item?.active == false);
        this.tasks = [...this.tasks];
        this.skipNumber = 1;
        setTimeout(() => {
          this.loader = false;
        }, 500)

      }, (error) => {
        this.loader = false;
      }
    )
  }

  createCareer() {
    this.initialLoader = true;
    this.router.navigate(['/careers/create'])
  }

  deleteItem(element) {
    const dialogRef = this.dialog.open(ConfirmboxComponent, {
      data: {
        message: 'Are you sure want to Delete the Blog' + element?.Title + '?',
        title: 'Are you sure want to Delete the Blog',
        name: element?.Role,
        publishedDate: element?.PublishedDate?.length > 2 ? element?.PublishedDate : null,
        action: 'Delete',
        content:'Career',
        workLocation:element?.workLocation,
        workMode:element?.workMode,
        experience:element?.experience
      },
      width: '20vw',
      panelClass: 'dialog-ctn'
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.apiService.ExecutePost(this.apiService.baseUrl + ApiConstant.deleteCareer + element?.id, element?.id)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((response: any) => {
            this.toastr.success('The Career Post has been successfully deleted', '', {
              timeOut: 3000, closeButton: true, easing: "ease-in-out"
            });
            this.dataSource.data = [];
            // this.getInitialCareers();
            this.clearAllFilters();
            this.selectedRow = null;
          }, (error) => {
            this.toastr.error('Error occured while deleting the career', '', {
              timeOut: 3000, closeButton: true, easing: "ease-in-out"
            });
          })
      }
    })
  }

  getCountPublishedContent(response) {
    // this.additionalDetails.totalCount = response?.length;
    let publishedItems = response.map((item) => {
      return item?.status == 'Publish' && item?.active;
    }).filter((item) => item == true);
    let unPublishedItems = response.map((item) => {
      return item?.status == 'Draft' && item?.active;
    }).filter((item) => item == true);
    this.additionalDetails.publishedCount = publishedItems?.length;
    this.additionalDetails.unPublishedCount = unPublishedItems?.length;
    this.additionalDetails.totalCount = publishedItems?.length + unPublishedItems?.length;
    this.cards[0].value = this.additionalDetails.totalCount;
    this.cards[1].value = this.additionalDetails.publishedCount;
    this.cards[2].value = this.additionalDetails.unPublishedCount;
    this.cards[3].value = response?.length - this.additionalDetails.totalCount;

  }

  pageChange(event): void {
    // this.loader = true;
    let skip = parseInt(event, 10);
    this.skipNumber = skip;
    // this.getTableList(true)
  }

  perPageChange(event): void {
    // this.loader = true;
    let value =  (event?.target?.value) ? event.target.value : event;
    let limit = parseInt(value, 10);
    this.taskFilterQuery.limit = limit;
    this.skipNumber = 1;
    // this.getTableList(true)
  }

  filterTable_(filtervalue) {
    this.clearStatusFilter = filtervalue;
    this.statusFilter = filtervalue;
    this.getCareers();
  }

  clearFilters() {
    this.clearStatusFilter = 'All';
  }

  toggleShowRecentBlogs() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  toggleButtonVisibility(toggle) {
    this.buttonAnimationState = toggle;
  }

  getLatestBlogs() {
    this.loader = true;
    this.apiService.ExecuteGet(this.apiService.baseUrl + ApiConstant.recentBlogs)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.latestBlogs = data;
        // if(!environment?.production) this.latestBlogs = this.latestBlogs.filter((item)=>item.published === true && item?.active == true);
        this.loader = false
      }, error => {
        this.loader = false;
      });
  }

  searchBlogs(searchValue) {
    if(searchValue) this.searchValue = searchValue.trim();
    this.getCareers();
  }

  blogTypeFilterChange(type){
    this.selectedCareerType = type;
    this.getCareers()
  }

  clearAllFilters(){
    this.statusFilter = null;
    this.searchValue = '';
    this.clearStatusFilter = null;
    this.getCareers();
    this.skipNumber = 1;
  }

  showDetails(item){
    this.selectedRow = item;
  }

  ngOnDestroy(){
    this.initialLoader = false;
  }


}
