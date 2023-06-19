import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input()
  name : string | null = "" ;
  
  @Input()
  isAdmin : boolean = false;

  @Output()
  logoutEvent : EventEmitter<string> = new EventEmitter();

  


  ngOnInit(): void {
  }


  logoutClick(){
    this.logoutEvent.emit();
  }

}
