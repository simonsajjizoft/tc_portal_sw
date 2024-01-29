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
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss'],
  animations: [SlideInOutAnimation, SlideInRightAnimation]
})
export class CaseStudyComponent {
  private unsubscribe = new Subject<void>();
  selection = new SelectionModel<any>(true, []);
  dataSource: any;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[4]);
  pageSizeperPage: any;
  data: any;
  shownColumns: any = ['Title', 'CreatedBy','category', 'PublishedDate','clients', 'Tags', 'status', 'edit', 'delete'];
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
  showCaseStudiesContent: Boolean = false;
  caseStudyContent: any;
  additionalDetails = { totalCount: 0, publishedCount: 0, unPublishedCount: 0 };
  loader: boolean;
  taskFilterQuery = {
    limit: 10
  };
  skipNumber: number = 1;
  columnsList: any = { Title: 'Title', CreatedBy: 'Created By',category: 'Category', PublishedDate: 'Published Date',clients:'Clients',  status: 'Status', actions: 'Actions', goto: '' };
  statusFilter: any;
  tasks: any;
  clearStatusFilter: any;
  icons = { cilChartPie, cilArrowRight };
  animationState = 'out';
  buttonAnimationState = 'out';
  latestCaseStudies;
  cards = [
    {
      name: 'All your active Case Studies', bg: '#1c2b6966', type: 'chat_bubble_outline', value: this.additionalDetails?.totalCount, style: 'aliceblue', data: {
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
      name: 'Published and updated CaseStudies', type: 'check_circle_outline', value: this.additionalDetails?.publishedCount, style: '#c5f0ce', data: {
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
    // {
    //   name: 'Inactive / deleted CaseStudies', type: 'delete_outline', value: 3, style: '#fca7a4', data: {
    //     labels: ['20', '50', '90', '130', '70', '53', '21', '84', '122', '54', '56', '89', '23', '543', '23', '53', '70'],
    //     datasets: [{
    //       fill: true,
    //       labels: "This will be hide",
    //       data: [4, 5, 6, 5, 5, 5, 1, 3, 3, 3, 4, 8, 6, 16, 6, 3, 10],
    //       backgroundColor: ["#fca7a4", "#fca7a4", "#fca7a4", "#fca7a4"]
    //     }]
    //   }
    // }
  ];
  searchValue;
  caseStudyTypeList = [{value:'Active',name:'All Active CaseStudies'}]
  selectedCaseStudyType = this.caseStudyTypeList[0];
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
    // this.getCaseStudies();
    this.getInitialCaseStudies();
    this.getLatestCaseStudies();
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

  previewCaseStudy(details: any) {
    this.showCaseStudiesContent = true;
  }

  getCaseStudyContent() {
    return this.caseStudyContent;
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
      ['/casestudies/edit'],
      { queryParams: { id: id } }
    );
  }

  getInitialCaseStudies() {
    this.loader = true;
    let payload = { "active":true}
    let  api = this.apiService.baseUrl + ApiConstant.getCaseStudy + '/search';
    this.apiService.ExecutePost(api,payload)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.dataSource.data = response
          ?.map((res: any) => {
            return {
              "id": res?.caseId,
              "Title": res?.caseTitle,
              "CreatedBy": res?.createdBy ? res?.createdBy : '-',
              "PublishedDate": res?.publishingDate ? res?.publishingDate : '-',
              "Tags": res?.tags,
              "Visibility": 'public',
              "status": res?.status,
              "active": res?.active,
              "category": res?.category,
              "clients": res?.clients,
              "preview": res?.preview,
              "coverImageUrl" : res?.coverImageUrl
            }
          })
        this.tasks = this.dataSource?.data;
        this.tasks = [...this.tasks];
        this.skipNumber = 1;
        this.getCountPublishedContent(response);
        setTimeout(() => {
          this.loader = false;
        }, 500)

      }, (error) => {
        this.loader = false;
      }
    )
  }

  getCaseStudies() {
    this.loader = true;
    let payload = {
      "searchKey":this.searchValue?.trim(),
      "active":true,
      "status":this.statusFilter
    }
    if(!payload?.searchKey) delete payload?.searchKey;
    if(!payload?.active) delete payload?.active;
    if(!payload?.status) delete payload?.status;
    let  api = this.apiService.baseUrl + ApiConstant.getCaseStudy + '/search';
    this.apiService.ExecutePost(api,payload)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        this.dataSource.data = response
          ?.map((res: any) => {
            return {
              "id": res?.caseId,
              "Title": res?.caseTitle,
              "CreatedBy": res?.createdBy ? res?.createdBy : '-',
              "PublishedDate": res?.publishingDate ? res?.publishingDate : '-',
              "Tags": res?.tags,
              "Visibility": 'public',
              "status": res?.status,
              "active": res?.active,
              "category": res?.category,
              "clients":res?.clients,
              "preview":res?.preview,
              "coverImageUrl" : res?.coverImageUrl
            }
          })
        this.tasks = this.dataSource?.data;
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

  createCaseStudy() {
    this.initialLoader = true;
    this.router.navigate(['/casestudies/create'])
  }

  deleteItem(element) {
    const dialogRef = this.dialog.open(ConfirmboxComponent, {
      data: {
        message: 'Are you sure want to Delete the Case Study' + element?.Title + '?',
        title: 'Are you sure want to Delete the Case Study',
        name: element?.Title,
        preview : element?.preview,
        publishedDate: element?.PublishedDate?.length > 2 ? element?.PublishedDate : null,
        action: 'Delete',
        tags:element?.Tags,
        createdBy:element?.CreatedBy,
        image:element?.coverImageUrl,
        content:'Case Study'
      },
      width: '20vw',
      panelClass: 'dialog-ctn'


    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.apiService.ExecutePost(this.apiService.baseUrl + ApiConstant.deleteCaseStudy + element?.id, element?.id)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((response: any) => {
            this.toastr.success('The Case Study has been successfully deleted', '', {
              timeOut: 3000, closeButton: true, easing: "ease-in-out"
            });
            this.dataSource.data = [];
            // this.getInitialCaseStudies();
            this.clearAllFilters();
            this.selectedRow = null;
          }, (error) => {
            this.toastr.error('Error occured while deleting the Case Study', '', {
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
    // this.cards[3].value = response?.length - this.additionalDetails.totalCount;
    setTimeout(()=>{
      this.animationState = 'in'     
    },200)

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
    this.getCaseStudies();
  }

  clearFilters() {
    this.clearStatusFilter = 'All';
  }

  toggleShowRecentCaseStudies() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  toggleButtonVisibility(toggle) {
    this.buttonAnimationState = toggle;
  }

  getLatestCaseStudies() {
    // this.latestCaseStudies = this.tasks?.splice(0,7);
   
  }

  searchCaseStudies(searchValue) {
    if(searchValue) this.searchValue = searchValue.trim();
    this.getCaseStudies();
  }

  caseStudyTypeFilterChange(type){
    this.selectedCaseStudyType = type;
    this.getCaseStudies()
  }

  clearAllFilters(){
    this.statusFilter = null;
    this.searchValue = '';
    this.clearStatusFilter = null;
    this.getCaseStudies();
    this.skipNumber = 1;
  }

  showDetails(item){
    this.selectedRow = item;
  }

  ngOnDestroy(){
    this.initialLoader = false;
  }




}
