import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent implements OnChanges {
  @Input() comment;
  @Input() id;
  editMode;
  content;
  @Output() getCommentsEvent  = new EventEmitter();

  constructor(private apiService:ApiService,private tostr:ToastrService){}
  
  ngOnChanges(){
    this.content = this.comment?.comment;
  }

  editComment(comment,newComment){
    let payload = {
      "commentDocument": [
        comment
      ],
      editedComment:newComment,
      "eventId": this.id
    };
    this.apiService.ExecutePut(environment?.apiUrl + 'comment',payload).subscribe((data:any)=>{
      if(data?.status == 200){
        console.log(data?.data); 
        this.tostr.success(data?.data);
        // this.fetchComments(this.id);
        this.getCommentsEvent.emit();
        this.editMode = false;
      }
      else{
        this.tostr.error(data?.data || data?.message);
        this.content = this.comment?.comment;
        this.editMode = false;
      } 
    },(error)=>{
       this.tostr.error(error?.message || error?.error);
       this.content = this.comment?.comment;
       this.editMode = false;
    })
  }

  deleteComment(comment){
    let payload = {
      "commentDocument": [
        comment
      ],
      "eventId": this.id
    };
    this.apiService.ExecuteDelete(environment?.apiUrl + 'comment',payload).subscribe((data:any)=>{
      if(data?.status == 200){
        console.log(data?.data); 
        this.tostr.success(data?.data);
        // this.fetchComments(this.id);
        this.getCommentsEvent.emit();
        this.editMode = false;
      }
      else{
        this.tostr.error(data?.data || data?.message);
        this.content = this.comment?.comment;
        this.editMode = false;
      } 
    },(error)=>{
       this.tostr.error(error?.message || error?.error);
       this.content = this.comment?.comment;
       this.editMode = false;
    })
  }

}
