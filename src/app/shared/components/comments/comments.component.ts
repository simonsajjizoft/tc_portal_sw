import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.services';
import { GeneralService } from 'src/app/services/general.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges{
  @Input() id;
  isCommentActionsEnabled ;
  comments;
  content;
  loader;
  @ViewChild('commentarea') commentarea:ElementRef;

 constructor(private apiService:ApiService,private tostr:ToastrService,private general:GeneralService){}

 ngOnChanges(){
   this.fetchComments(this.id);
 }

 fetchComments(id){
  this.loader = true;
   this.apiService.ExecuteGet(environment?.apiUrl + 'comment' + `?eventId=${id}`).subscribe((data:any)=>{
     if(data?.data){
       this.comments = data?.data;
       console.log(this.comments); 
       this.loader = false;
     }
     this.loader = false;
   },
   (error)=>{
    this.loader = false;
   })
 }


  showCommentButtons(){
    this.isCommentActionsEnabled = true;
  }

  saveComment(comment){
    console.log(this.content)
    let payload = {
      "commentDocument": [
        {
          "comment": this.content,
          "commentUser": this.general.getUserName
        }
      ],
      "eventId": this.id
    };
    this.apiService.ExecutePost(environment?.apiUrl + 'comment',payload).subscribe((data:any)=>{
      if(data?.status == 200){
        console.log(data?.data); 
        this.tostr.success(data?.data);
        this.fetchComments(this.id);
        this.content = '';
      }
      else this.tostr.error(data?.data || data?.message)
    },(error)=>{
       this.tostr.error(error?.message || error?.error)
    })
  }

  editComment(comment){
    let payload = {
      "commentDocument": [
        comment
      ],
      editedComment:"New comment",
      "eventId": this.id
    };
    this.apiService.ExecutePost(environment?.apiUrl + 'comment',payload).subscribe((data:any)=>{
      if(data?.data){
        console.log(data?.data); 
        this.tostr.success(data?.message);
        this.fetchComments(this.id);
      }
      else this.tostr.error(data?.data || data?.message)
    },(error)=>{
       this.tostr.error(error?.message || error?.error)
    })

  }

}
