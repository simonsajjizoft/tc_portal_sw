import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {
  @Input() config;
  @Input() idx;
  @Input() checkedField;
  @ViewChild('field2') field: ElementRef;
  @Output() selectFieldEvent = new EventEmitter();
  @Output() checkItemEvent = new EventEmitter();
  @Output() fieldValueChange = new EventEmitter();
  @Output() swapElement = new EventEmitter();
  showProperties;
  @HostBinding('style.width') public width: string ;
  constructor(private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2) { 
      this.renderer.listen('window', 'click',(e:Event)=>{
        if(e.target != this.field.nativeElement && !this.field.nativeElement.contains(e.target)){
          this.showProperties = false;
          this.selectFieldEvent.emit({item :this.config,id: this.idx,selected:false});
          this.changeDetectorRef.detectChanges();
        }
    
     });
  }
  

  ngOnInit(): void {
    if(this.config?.col == 12) this.width = '100%';
    else if(this.config?.col == 6) this.width = '50%';
    else this.width = '25%'; 
  }

  displayOptions(focus){
     if(this.config?.selected != focus){
      if(focus){
        this.showProperties = focus;
        this.selectFieldEvent.emit({item :this.config,id: this.config?.id,selected:true});
       }
      //  else{
      //   this.showProperties = focus;
      //   this.selectFieldEvent.emit({item :this.config,id: this.config?.id,selected:false});
      //  } 
     }
   }

   checkItem(item){
    // item.selected = !item?.selected;
    this.checkItemEvent.emit({item :item,id: this.idx,checked:item?.checked});
   }

   labelChange(label){
    console.log(label)
    this.config.label = label;
    this.fieldValueChange.emit({item :this.config,id: this.config?.id});
   }

   swap(){
    this.swapElement.emit({item :this.config,id: this.config?.id});
   }


}
