import { Component, OnInit, Input } from '@angular/core';
import { faSearch,faCircle } from '@fortawesome/free-solid-svg-icons';
import * as moment  from 'moment';


@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  
  messageCtx ={$implicit:null};
  _typeMessage: string;

  fa_search = faSearch;
  fa_circle=faCircle;
  _user: string;
  
  _date:string;
  constructor() { }

  ngOnInit(): void {
    this._date = moment().format('LLL');
  }

  @Input()
  set message(val:string){
    this.messageCtx.$implicit = val;
  }

  @Input()
  set user(val:string){
    this._user = val;
  }

  get user(){
    return this._user;
  }

  get date(){
    return this._date;
  }

  @Input()
  set typeMessage(val: string){
    this._typeMessage = val;
  }

  get typeMessage(){
    return this._typeMessage
  }

}
