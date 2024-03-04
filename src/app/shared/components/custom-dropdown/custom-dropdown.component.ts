import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent {
  @Input() values;
  @Input() checkboxes;
  @Input() displayName;
  @Output() changeStatusListModel = new EventEmitter();
  @Output() selectEvent = new EventEmitter();

  constructor(){
  }

  toggleCheck(event,item){
    item.checked = event.checked;
    this.changeStatusListModel.emit(item)
  }

  selectOption(option){
    this.selectEvent.emit(option);
  }


}
