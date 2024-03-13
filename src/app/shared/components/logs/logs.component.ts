import { Component, Input, OnChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnChanges {
  @Input() id;
  logs;
  loader;

  constructor(private apiService:ApiService){}

  ngOnChanges(){
    this.fetchLogs(this.id);
  }

  fetchLogs(id){
    this.loader = true;
    this.apiService.ExecuteGet(environment?.apiUrl + 'logs' + `?eventId=${id}`).subscribe((data:any)=>{
      if(data?.data){
        this.logs = data?.data;
        console.log(this.logs); 
      }
      this.loader = false;
    },
    (error)=>{
      this.loader = false;
    }
    )
  }

}
